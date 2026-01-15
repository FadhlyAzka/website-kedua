// --- CLOCK FUNCTIONALITY ---
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const strTime = hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + ampm;
    
    document.getElementById('clock').textContent = strTime;
}
setInterval(updateClock, 1000);
updateClock();

// --- MENU TOGGLE ---
function toggleMenu() {
    const menu = document.getElementById('start-menu');
    menu.classList.toggle('open');
}

// Close menu if clicking outside
document.addEventListener('click', function(event) {
    const menu = document.getElementById('start-menu');
    const startBtn = document.getElementById('start-btn');
    
    if (!menu.contains(event.target) && !startBtn.contains(event.target)) {
        menu.classList.remove('open');
    }
});

// --- WINDOW SYSTEM ---
function closeWindow(id) {
    document.getElementById(id).classList.remove('active');
}

async function loadExternalContent(url, title, iconClass = 'fa-file') {
    const windowEl = document.getElementById('dynamic-window');
    const contentEl = document.getElementById('dynamic-content');
    const titleEl = document.getElementById('window-title');
    const menu = document.getElementById('start-menu');

    // 1. Close the menu
    menu.classList.remove('open');

    try {
        // 2. Fetch the external file
        const response = await fetch(url);
        if (!response.ok) throw new Error('File not found');
        const html = await response.text();

        // 3. Inject the content and update title
        contentEl.innerHTML = html;
        titleEl.innerHTML = `<i class="fas ${iconClass}"></i> ${title}`;

        // 4. Show the window
        windowEl.classList.add('active');

        // 5. If loading the music fragment, dynamically load the widget initializer
        if (url.endsWith('window_music.html')) {
            // remove existing widget script if present
            const existing = document.querySelector('script[data-music-widget]');
            if (existing) existing.remove();
            const s = document.createElement('script');
            s.src = 'music-widget.js';
            s.setAttribute('data-music-widget', '1');
            s.onload = () => {
                try { window.initMusicWidget(); } catch(e){ console.error(e); }
            };
            document.body.appendChild(s);
        }

    } catch (error) {
        console.error("Error loading page:", error);
        contentEl.innerHTML = `<p style="color:red">Error: Could not load ${url}. Make sure the file exists!</p>`;
        windowEl.classList.add('active');
    }
}

// Function to switch tabs within the loaded window
function switchTab(sectionId) {
    console.log("Switching to tab:", sectionId); // Debugging line

    const container = document.getElementById('dynamic-content');
    if (!container) return;

    // 1. Hide all tab content within this container only
    const sections = container.querySelectorAll('.tab-content');
    sections.forEach(s => {
        s.classList.remove('active');
        s.style.display = 'none'; // Forced safety
    });

    // 2. Deactivate all buttons within this container only
    const buttons = container.querySelectorAll('.tab-btn');
    buttons.forEach(b => b.classList.remove('active'));

    // 3. Show the target section
    const targetSection = container.querySelector(`#${sectionId}`);
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.style.display = 'block'; // Forced safety
    }

    // 4. Highlight the clicked button
    // We find the button that has the specific onclick string
    const clickedBtn = container.querySelector(`[onclick*="${sectionId}"]`);
    if (clickedBtn) {
        clickedBtn.classList.add('active');
    }
}

// Draggable Windows Logic (Simple)
const windows = document.querySelectorAll('.window');
let isDragging = false;
let currentWindow = null;
let offset = [0,0];

windows.forEach(win => {
    const header = win.querySelector('.window-header');
    
    header.addEventListener('mousedown', (e) => {
        isDragging = true;
        currentWindow = win;
        offset = [
            win.offsetLeft - e.clientX,
            win.offsetTop - e.clientY
        ];
    });
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    currentWindow = null;
});

document.addEventListener('mousemove', (e) => {
    if (isDragging && currentWindow) {
        e.preventDefault();
        currentWindow.style.left = (e.clientX + offset[0]) + 'px';
        currentWindow.style.top = (e.clientY + offset[1]) + 'px';
    }
});

// --- NEWS ARTICLE ---
async function openNewsDetail(element, filePath, type) {
    // 1. Find the parent tab that contains the button we clicked
    const tabParent = element.closest('.tab-content');
    
    const listView = tabParent.querySelector('.list-view');
    const detailView = tabParent.querySelector('.detail-view');
    const placeholder = tabParent.querySelector('.article-placeholder');
    
    // 2. Switch visibility within THIS tab only
    listView.style.display = 'none';
    detailView.style.display = 'block';
    placeholder.innerHTML = "Loading...";

    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error('File not found');
        const content = await response.text();

        if (type === 'text') {
            placeholder.innerHTML = `<pre style="white-space: pre-wrap; font-family: inherit;">${content}</pre>`;
        } else {
            placeholder.innerHTML = content;
        }
    } catch (error) {
        placeholder.innerHTML = `<p style="color:red">Error: ${error.message}</p>`;
    }
}

function showNewsList(element) {
    // Find the parent tab that contains the back button
    const tabParent = element.closest('.tab-content');
    
    tabParent.querySelector('.list-view').style.display = 'block';
    tabParent.querySelector('.detail-view').style.display = 'none';
}

function openGallery(imgSrc, caption) {
    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('modal-img');
    const modalCap = document.getElementById('modal-caption');

    modalImg.src = imgSrc;
    modalCap.innerHTML = caption;
    modal.style.display = 'flex';
}

function closeGallery() {
    document.getElementById('gallery-modal').style.display = 'none';
}

function setTheme(themeName) {
    if (themeName === 'yellow') {
        document.documentElement.setAttribute('data-theme', 'yellow');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('metaverse-theme', themeName);
    syncSettingsUI(); // Update button highlights
}

function updateVolume(val) {
    const label = document.getElementById('volume-label');
    if(label) label.innerText = val + '%';
    localStorage.setItem('metaverse-volume', val);
    
    // Update the actual audio volume in real-time
    if (window.globalMusicState && window.globalMusicState.music) {
        window.globalMusicState.music.volume = val / 100; // Convert percentage to 0-1 range
    }
}

// --- SYNC UI WITH MEMORY ---
// This runs every time the settings window is loaded
function syncSettingsUI() {
    const currentTheme = localStorage.getItem('metaverse-theme') || 'pink';
    const currentVol = localStorage.getItem('metaverse-volume') || 70;

    // 1. Highlight the correct theme button
    const pinkBtn = document.getElementById('theme-pink-btn');
    const yellowBtn = document.getElementById('theme-yellow-btn');
    
    if (pinkBtn && yellowBtn) {
        pinkBtn.classList.toggle('active', currentTheme === 'pink');
        yellowBtn.classList.toggle('active', currentTheme === 'yellow');
    }

    // 2. Set the slider and label
    const slider = document.getElementById('volume-slider');
    const label = document.getElementById('volume-label');
    if (slider) slider.value = currentVol;
    if (label) label.innerText = currentVol + '%';
}

// --- STORY PATH LOADING ---
function loadStoryPath(storyName) {
    const screenFrame = document.querySelector('.screen-frame');
    if (screenFrame && screenFrame.contentWindow) {
        screenFrame.contentWindow.postMessage({
            type: 'loadStory',
            storyName: storyName
        }, '*');
    }
}

// --- UPDATE QUIT MESSAGE BASED ON UNLOCK STATUS ---
function updateQuitMessage() {
    const quitMessage = document.getElementById('quit-message');
    if (quitMessage) {
        const isUnlocked = localStorage.getItem('unlock_raspy_gramophone') === 'true';
        if (isUnlocked) {
            quitMessage.textContent = 'ヾ(^_^) Despite my pathetic attitude, see you soon friend';
        } else {
            quitMessage.textContent = '¯\\_(ツ)_/¯ Well... I hope not';
        }
    }
}

// --- INITIAL LOAD (When first opening the site) ---
function initApp() {
    const savedTheme = localStorage.getItem('metaverse-theme') || 'pink';
    setTheme(savedTheme);
    updateQuitMessage();
}
window.addEventListener('DOMContentLoaded', initApp);

// --- SHUTDOWN SEQUENCE ---
function initiateShutdown() {
    // Stop all background music/audio to allow clean shutdown
    if (window.globalMusicState && window.globalMusicState.music) {
        window.globalMusicState.music.pause();
        window.globalMusicState.music.currentTime = 0;
        window.globalMusicState.music.src = ''; // Clear audio source
        window.globalMusicState.isPlaying = false;
    }
    
    // Update quit message before showing (in case unlock happened during session)
    updateQuitMessage();
    
    document.getElementById('start-menu').classList.remove('open');
    
    const quitWin = document.getElementById('window-quit');
    quitWin.classList.add('active');
    const timerBar = document.getElementById('quit-timer-bar');
    
    // Small timeout to ensure the browser registers the starting 100% width before changing to 0
    setTimeout(() => {
        timerBar.style.width = '0%';
    }, 100);

    setTimeout(() => {
        window.close();
        
        // Fallback: If window.close() is blocked by browser security
        // we redirect them to a "shutdown" state or a blank page.
        document.body.innerHTML = `
            <div style="background:#000; color:#e91e63; height:100vh; display:flex; align-items:center; justify-content:center; font-family:monospace;">
                <h1>[ SESSION TERMINATED ]</h1>
            </div>`;
    }, 2100);
}