import os, shutil, warnings, urllib.parse, requests, re, time, hashlib
from mutagen import File
warnings.filterwarnings("ignore", category=UserWarning)

def get_clean_query(filename):
    name_only, _ = os.path.splitext(filename)
    name_clean = re.sub(r'\(.*?(remix|edit|bootleg|mix|club).*?\)', '', name_only, flags=re.IGNORECASE)
    name_clean = re.sub(r'\[.*?(remix|edit|bootleg|mix|club).*?\]', '', name_clean, flags=re.IGNORECASE)
    name_clean = re.sub(r'\(.*?\)|\[.*?\]', '', name_clean)
    for w in ['extended', 'mix', 'remix', 'edit', 'club', 'original', 'copy']:
        name_clean = re.sub(rf'\b{w}\b', '', name_clean, flags=re.IGNORECASE)
    return " ".join(re.sub(r'[_\-+—–]', ' ', name_clean).split())

def calculate_md5(file_path):
    hasher = hashlib.md5()
    try:
        with open(file_path, 'rb') as f: hasher.update(f.read(65536))
        return hasher.hexdigest()
    except: return None

def build_dynamic_database(tracks):
    db = {}
    for f_path, _ in tracks:
        f_name = os.path.splitext(os.path.basename(f_path))[0]
        parts = re.split(r'[-—–Xx]|\bvs\b', f_name, maxsplit=1, flags=re.IGNORECASE)
        if len(parts) == 2:
            p0, p1 = parts[0].strip(), parts[1].strip()
            if p0 and p1: db[re.sub(r'[^a-zA-Z0-9א-ת]', '', p1).lower()] = p0
    return db

def find_existing_normalized_dir(base_path, artist_name):
    if not os.path.exists(base_path): return artist_name
    norm_target = re.sub(r'[^a-zA-Z0-9א-ת]', '', artist_name).lower()
    for d in os.listdir(base_path):
        if re.sub(r'[^a-zA-Z0-9א-ת]', '', d).lower() == norm_target: return d
    return artist_name

def query_apple_api(search_text):
    """ פנייה נקייה ל-API של Apple ומשיכת נתונים """
    try:
        url = f"https://apple.com{urllib.parse.quote(search_text)}&media=music&country=IL&limit=1"
        res = requests.get(url, timeout=5).json()
        if res.get('resultCount', 0) > 0:
            track = res['results'][0]
            return track.get('artistName', "Unknown Artist"), track.get('trackBpm')
    except: pass
    return None, None

def get_song_details(file_path, dynamic_db, rel_dir):
    f_name = os.path.basename(file_path)
    name_only, _ = os.path.splitext(f_name)
    artist, bpm = "Unknown Artist", None
    
    parts = re.split(r'[-—–Xx]|\bvs\b', name_only, maxsplit=1, flags=re.IGNORECASE)
    song_key = re.sub(r'[^a-zA-Z0-9א-ת]', '', name_only).lower()
    
    if len(parts) == 2 and "unknown" not in parts[0].lower(): artist = parts[0].strip()
    elif song_key in dynamic_db: artist = dynamic_db[song_key]

    try:
        audio = File(file_path)
        if audio:
            for t in ['artist', '©ART', 'TPE1']:
                if t in audio: artist = str(audio[t][0] if isinstance(audio[t], list) else audio[t]); break
            for t in ['bpm', 'tbpm', 'TBP']:
                if t in audio:
                    b_str = str(audio[t][0] if isinstance(audio[t], list) else audio[t])
                    b_clean = ''.join(c for c in b_str.split('.') if c.isdigit())
                    if b_clean: bpm = int(b_clean); break
    except: pass

    query = get_clean_query(f_name)
    if artist == "Unknown Artist" or bpm is None:
        # ניסיון חיפוש ראשון: שם מלא
        a_art, a_bpm = query_apple_api(query)
        # ניסיון חיפוש שני (חסין כשל): אם נכשל, נחפש רק לפי 3 המילים הראשונות של השיר
        if not a_art and len(query.split()) > 3:
            short_query = " ".join(query.split()[:3])
            a_art, a_bpm = query_apple_api(short_query)
            
        if a_art and artist == "Unknown Artist": artist = a_art
        if a_bpm and bpm is None: bpm = int(a_bpm)

    if bpm is None:
        try:
            import librosa
            y, sr = librosa.load(file_path, sr=22050, duration=45, mono=True)
            if len(y) > 0:
                t, _ = librosa.beat.beat_track(y=y, sr=sr)
                bpm = float(t[0] if hasattr(t, '__len__') else t)
        except: pass

    if isinstance(bpm, (int, float)) and bpm > 0:
        is_electronic = any(k in rel_dir.lower() or k in name_only.lower() or k in artist.lower() for k in ['house', 'dance', 'club', 'mix', 'nissim'])
        if is_electronic and bpm < 90: bpm = bpm * 2
        elif bpm > 150 and not any(k in name_only.lower() for k in ['drum', 'bass', 'dnb', 'hardstyle']): bpm = bpm / 2
        bpm = int(round(bpm))

    if not bpm or bpm <= 0: bpm = "Unknown"
    return bpm, artist.strip()

def sort_songs():
    src = input("📂 Enter your source music folder path: ").strip().strip('"').strip("'")
    if not src or not os.path.exists(src): print("❌ Path does not exist."); return

    dst = os.path.join(os.path.dirname(src), f"{os.path.basename(src)}_copied")
    exts = ('.mp3', '.wav', '.flac', '.ogg', '.m4a')
    src_counts, cpy_counts, tracks = {}, {}, []

    for root, _, files in os.walk(src):
        if "_copied" in root: continue
        rel = os.path.relpath(root, src)
        for f in files:
            if f.lower().endswith(exts):
                tracks.append((os.path.join(root, f), rel))
                src_counts[rel] = src_counts.get(rel, 0) + 1

    total = len(tracks)
    print(f"\n🧠 Building database. Processing {total} tracks with Fuzzy Logic & Multi-Query protect...\n" + "="*50)
    dynamic_db = build_dynamic_database(tracks)
    copied_file_hashes = set()

    for idx, (f_path, rel_dir) in enumerate(tracks, start=1):
        f_name = os.path.basename(f_path)
        name_only, ext = os.path.splitext(f_name)
        print(f" [{idx}/{total}] Resolving: {f_name}")
        
        file_hash = calculate_md5(f_path)
        if file_hash and file_hash in copied_file_hashes:
            print(f"    ⚠️ SKIPPED: Duplicate content."); cpy_counts[rel_dir] = cpy_counts.get(rel_dir, 0) + 1
            print("-" * 40); continue

        bpm, artist = get_song_details(f_path, dynamic_db, rel_dir)
        safe_artist = "".join(x for x in artist if x.isalnum() or x in " -_()&.")
        clean_folder_tag = "Root" if rel_dir == "." else rel_dir.replace('\\', '-').replace('/', '-')
        clean_name_only = re.sub(rf'\b{re.escape(safe_artist)}\b', '', name_only, flags=re.IGNORECASE).strip(' -_')
        if not clean_name_only: clean_name_only = name_only

        if bpm == "Unknown" or safe_artist == "Unknown Artist":
            final_dir = os.path.join(dst, "Unknown_BPM")
            bpm_tag = bpm if bpm != "Unknown" else "Unknown"
            new_name = f"[{clean_folder_tag}-{bpm_tag}]-{safe_artist}-{clean_name_only}{ext}"
        else:
            target_bpm_dir = f"{bpm}_BPM"
            bpm_folder_path = os.path.join(dst, rel_dir, target_bpm_dir)
            safe_artist = find_existing_normalized_dir(bpm_folder_path, safe_artist)
            final_dir = os.path.join(bpm_folder_path, safe_artist)
            new_name = clean_name_only if clean_name_only.lower().startswith(safe_artist.lower()) else f"{safe_artist} - {clean_name_only}{ext}"
            
        os.makedirs(final_dir, exist_ok=True)
        final_destination_file = os.path.join(final_dir, new_name)

        if os.path.exists(final_destination_file):
            print(f"    ⚠️ SKIPPED: File name exists."); cpy_counts[rel_dir] = cpy_counts.get(rel_dir, 0) + 1
            if file_hash: copied_file_hashes.add(file_hash)
            print("-" * 40); continue

        try:
            shutil.copy2(f_path, final_destination_file)
            if file_hash: copied_file_hashes.add(file_hash)
            print(f"    ➡️ Saved to ...\\{'Unknown_BPM' if bpm == 'Unknown' or safe_artist == 'Unknown Artist' else target_bpm_dir}\\{safe_artist}")
            cpy_counts[rel_dir] = cpy_counts.get(rel_dir, 0) + 1
        except Exception as e: print(f"    ❌ FAIL: {e}")
        
        print("-" * 40)
        time.sleep(3.5)

    print("\n📊 FOLDER MIGRATE SUMMARY & VERIFICATION REPORT:\n" + "="*60)
    for folder, count in src_counts.items():
        cpy = cpy_counts.get(folder, 0)
        print(f"📁 Folder: {'Base Root' if folder == '.' else f'\\{folder}'}\n   - Original: {count} | Sorted: {cpy}  ({'✅ MATCH' if count == cpy else '❌ MISMATCH'})")

if __name__ == "__main__":
    sort_songs()
    input("\nPress Enter to exit...")
