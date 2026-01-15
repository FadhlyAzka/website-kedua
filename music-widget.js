// music-widget.js
// Exposes initMusicWidget(root) to initialize the music player inside the injected container.
// Uses a global persistent Audio instance to avoid duplicate playback.

// Global music state to persist across widget reinitializations
window.globalMusicState = window.globalMusicState || {
    music: new Audio(),
    songs: [],
    musicIndex: 0,
    isPlaying: false,
    currentTime: 0
};

function initMusicWidget(root) {
    if (!root) root = document.getElementById('dynamic-content').querySelector('.container');
    if (!root) return console.error('Music widget root not found');

    const state = window.globalMusicState;
    const image = root.querySelector('#cover'),
        title = root.querySelector('#music-title'),
        artist = root.querySelector('#music-artist'),
        currentTimeEl = root.querySelector('#current-time'),
        durationEl = root.querySelector('#duration'),
        progress = root.querySelector('#progress'),
        playerProgress = root.querySelector('#player-progress'),
        prevBtn = root.querySelector('#prev'),
        nextBtn = root.querySelector('#next'),
        playBtn = root.querySelector('#play');

    const music = state.music;
    let songs = state.songs;
    let musicIndex = state.musicIndex;
    let isPlaying = state.isPlaying;
    
    // Initialize volume from localStorage (default 70%)
    const savedVolume = localStorage.getItem('metaverse-volume') || 70;
    music.volume = savedVolume / 100; // Convert percentage to 0-1 range

    function updateState() { state.musicIndex = musicIndex; state.isPlaying = isPlaying; state.currentTime = music.currentTime; }
    function togglePlay() { if (isPlaying) pauseMusic(); else playMusic(); }
    function playMusic() { isPlaying = true; state.isPlaying = true; playBtn.classList.replace('fa-play', 'fa-pause'); playBtn.setAttribute('title','Pause'); music.play(); }
    function pauseMusic(){ isPlaying = false; state.isPlaying = false; playBtn.classList.replace('fa-pause','fa-play'); playBtn.setAttribute('title','Play'); music.pause(); }

    function loadMusic(song){
        if (!song) return;
        // Only change src if different to avoid interrupting current playback
        if (!music.src || !music.src.endsWith(song.path)) {
            music.src = song.path;
        }
        title.textContent = song.displayName || '';
        artist.textContent = song.artist || '';
        image.src = song.cover || '';
    }

    function changeMusic(direction){
        musicIndex = (musicIndex + direction + songs.length) % songs.length;
        updateState();
        loadMusic(songs[musicIndex]);
        playMusic();
        updatePlaylistUI();
    }

    function updateProgressBar(){
        const { duration, currentTime } = music;
        if (!duration) return;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        const fmt = t => `${Math.floor(t/60)}:${String(Math.floor(t%60)).padStart(2,'0')}`;
        durationEl.textContent = isNaN(duration) ? '0:00' : fmt(duration);
        currentTimeEl.textContent = fmt(currentTime || 0);
        state.currentTime = currentTime;
    }

    function setProgressBar(e){
        const width = playerProgress.clientWidth;
        const clickX = e.offsetX;
        music.currentTime = (clickX/width) * music.duration;
    }

    function loadPlaylist(){
        const playlistEl = root.querySelector('#playlist');
        playlistEl.innerHTML = '';
        songs.forEach((song, index) => {
            const li = document.createElement('li');
            li.textContent = `${song.displayName || 'Unknown'} — ${song.artist || ''}`;
            if (index === musicIndex) li.classList.add('active');
            li.addEventListener('click', () => { musicIndex = index; updateState(); loadMusic(songs[musicIndex]); playMusic(); updatePlaylistUI(); });
            playlistEl.appendChild(li);
        });
    }

    function updatePlaylistUI(){
        const items = root.querySelectorAll('.playlist li');
        items.forEach((item, index) => item.classList.toggle('active', index === musicIndex));
    }

    playBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', () => changeMusic(-1));
    nextBtn.addEventListener('click', () => changeMusic(1));
    music.addEventListener('ended', () => changeMusic(1));
    music.addEventListener('timeupdate', updateProgressBar);
    playerProgress.addEventListener('click', setProgressBar);

    // Update playBtn UI state to match current isPlaying
    if (isPlaying && music.src) {
        playBtn.classList.replace('fa-play', 'fa-pause');
        playBtn.setAttribute('title', 'Pause');
    } else {
        playBtn.classList.replace('fa-pause', 'fa-play');
        playBtn.setAttribute('title', 'Play');
    }

    // Fetch songs.json and initialize (only fetch if not already loaded)
    if (state.songs.length === 0) {
        fetch('songs.json').then(r=>{ if(!r.ok) throw new Error('HTTP '+r.status); return r.json(); })
        .then(data => { 
            state.songs = data; 
            songs = data;
            musicIndex = state.musicIndex;
            if (songs.length){ 
                loadMusic(songs[musicIndex]); 
                loadPlaylist(); 
                updatePlaylistUI();
                // Restore playback position if saved
                if (state.currentTime > 0) {
                    const setTime = () => {
                        try { music.currentTime = state.currentTime; } catch(e){}
                        music.removeEventListener('loadedmetadata', setTime);
                    };
                    if (music.readyState >= 1) {
                        try { music.currentTime = state.currentTime; } catch(e){}
                    } else {
                        music.addEventListener('loadedmetadata', setTime);
                    }
                }
                // If the previous state indicated playing, try to resume playback.
                if (state.isPlaying) {
                    music.play().then(() => {
                        isPlaying = true;
                        playBtn.classList.replace('fa-play','fa-pause');
                    }).catch(() => {
                        // Autoplay prevented — ensure UI shows paused
                        isPlaying = false;
                        state.isPlaying = false;
                        playBtn.classList.replace('fa-pause','fa-play');
                    });
                }
            } 
        })
        .catch(err => {
            console.error('Failed to load songs.json for music widget:', err);
            const playlistEl = root.querySelector('#playlist');
            playlistEl.innerHTML = '<li style="color:#999;padding:8px">Failed to load songs.json</li>';
        });
    } else {
        // Songs already loaded, just update UI and restore state
        songs = state.songs;
        musicIndex = state.musicIndex;
        isPlaying = state.isPlaying;
        if (songs.length) {
            loadMusic(songs[musicIndex]);
            loadPlaylist();
            updatePlaylistUI();
            // Restore playback position if was playing
            if (state.currentTime > 0) {
                const setTime = () => {
                    try { music.currentTime = state.currentTime; } catch(e){}
                    music.removeEventListener('loadedmetadata', setTime);
                };
                if (music.readyState >= 1) {
                    try { music.currentTime = state.currentTime; } catch(e){}
                } else {
                    music.addEventListener('loadedmetadata', setTime);
                }
            }
            if (state.isPlaying) {
                music.play().then(() => {
                    isPlaying = true;
                    playBtn.classList.replace('fa-play','fa-pause');
                }).catch(() => {
                    isPlaying = false;
                    state.isPlaying = false;
                    playBtn.classList.replace('fa-pause','fa-play');
                });
            }
        }
    }
}

// Expose globally so loadExternalContent can call it after injection
window.initMusicWidget = initMusicWidget;