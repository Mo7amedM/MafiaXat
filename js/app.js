// app.js

function initGlobalAudio() {
    if (typeof MEDIA_ASSETS === 'undefined' || !MEDIA_ASSETS.audio || MEDIA_ASSETS.audio.length === 0) return;
    
    const isPagesFolder = window.location.pathname.includes('/pages/');
    const basePath = isPagesFolder ? '../assets/' : 'assets/';
    const audioUrl = `${basePath}audio/${MEDIA_ASSETS.audio[0].file}`;

    // Check if an audio player already exists
    let audio = document.getElementById('siteRadio');
    if (!audio) {
        audio = document.createElement('audio');
        audio.id = 'siteRadio';
        audio.loop = true;
        document.body.appendChild(audio);
    }
    
    // Set source if needed
    if (!audio.src.includes(audioUrl)) {
        audio.src = audioUrl;
    }

    // Restore saved playback state and time
    const savedTime = sessionStorage.getItem('siteAudioTime');
    const wasPlaying = sessionStorage.getItem('siteAudioPlaying');
    
    if (savedTime) {
        audio.currentTime = parseFloat(savedTime);
    }

    // Attempt autoplay
    const attemptPlay = () => {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                // Autoplay blocked, wait for first interaction
                console.warn("Autoplay blocked. Will play on first interaction.");
                const playOnInteract = () => {
                    audio.play().catch(e => console.warn(e));
                    sessionStorage.setItem('siteAudioPlaying', 'true');
                    document.body.removeEventListener('click', playOnInteract);
                };
                document.body.addEventListener('click', playOnInteract, { once: true });
            });
        } else {
            sessionStorage.setItem('siteAudioPlaying', 'true');
        }
    };

    // If music was playing previously, or it's the very first visit (null)
    if (wasPlaying === 'true' || wasPlaying === null) {
        attemptPlay();
    }

    // Save state before leaving the page
    window.addEventListener('beforeunload', () => {
        if (audio) {
            sessionStorage.setItem('siteAudioTime', audio.currentTime);
            sessionStorage.setItem('siteAudioPlaying', !audio.paused ? 'true' : 'false');
        }
    });
    
    // Periodically save state for mobile reliability
    setInterval(() => {
        if (audio && !audio.paused) {
            sessionStorage.setItem('siteAudioTime', audio.currentTime);
            sessionStorage.setItem('siteAudioPlaying', 'true');
        }
    }, 1000);
}

function toggleHeader() {
    const header = document.getElementById('mainHeader');
    const toggleBtn = document.getElementById('toggleHeaderBtn');
    if (header && toggleBtn) {
        header.classList.remove('auto-hide');
        toggleBtn.classList.remove('show');
    }
}

function initHeaderTimer() {
    const header = document.getElementById('mainHeader');
    const toggleBtn = document.getElementById('toggleHeaderBtn');
    if (header && toggleBtn) {
        setTimeout(() => {
            header.classList.add('auto-hide');
            toggleBtn.classList.add('show');
        }, 7000);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    initDynamicSystem();
    initGlobalAudio();
    initHeaderTimer();
});

function initDynamicSystem() {
    const isPagesFolder = window.location.pathname.includes('/pages/');

    // 1. Render Navigation
    const navContainer = document.getElementById('dynamic-nav-container');
    if (navContainer && typeof NAVIGATION !== 'undefined') {
        let navHtml = '';
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';

        NAVIGATION.forEach(item => {
            // Adjust links depending on where we are
            let link = item.link;
            if (isPagesFolder) {
                if (item.isHome) link = '../' + item.link;
                else link = item.link.replace('pages/', '');
            } else {
                if (item.isHome) link = 'index.html';
            }

            // Determine if active
            const isActive = link.includes(currentPath) ? 'active' : '';
            
            navHtml += `<a href="${link}" class="nav-btn fire-btn ${isActive}">
                <i class="${item.icon}"></i> ${item.title}
            </a>`;
        });
        navContainer.innerHTML = navHtml;
    }

    // 2. Render Homepage Sections Grid
    const sectionsGrid = document.getElementById('dynamic-sections-grid');
    if (sectionsGrid && typeof SECTIONS !== 'undefined') {
        let gridHtml = '';
        SECTIONS.forEach(section => {
            if (section.category === 'none') {
                 gridHtml += `
                    <div class="gallery-card" onclick="location.href='${section.link}'" style="background: linear-gradient(145deg, #1a1a2e, #16213e); border-radius: 20px; overflow: hidden; cursor: pointer; transition: transform 0.3s, box-shadow 0.3s; border: 1px solid rgba(233,69,96,0.3);" onmouseover="this.style.transform='translateY(-10px)'; this.style.boxShadow='0 20px 40px rgba(233,69,96,0.3)'" onmouseout="this.style.transform=''; this.style.boxShadow=''">
                        <div style="height: 200px; background: linear-gradient(135deg, #e94560, #0f0c29);"></div>
                        <div style="padding: 20px; text-align: center;">
                            <i class="${section.icon}" style="font-size: 40px; color: #e94560;"></i>
                            <h3 style="color: white; margin: 10px 0;">${section.title}</h3>
                            <p style="color: #888;">${section.subtitle}</p>
                        </div>
                    </div>
                `;
            } else {
                gridHtml += `
                    <div class="gallery-card" onclick="location.href='${section.link}'" style="background: linear-gradient(145deg, #1a1a2e, #16213e); border-radius: 20px; overflow: hidden; cursor: pointer; transition: transform 0.3s, box-shadow 0.3s; border: 1px solid rgba(233,69,96,0.3);" onmouseover="this.style.transform='translateY(-10px)'; this.style.boxShadow='0 20px 40px rgba(233,69,96,0.3)'" onmouseout="this.style.transform=''; this.style.boxShadow=''">
                        <div id="preview-${section.id}" style="height: 200px; background-position: center; background-size: cover; background-repeat: no-repeat;">
                        </div>
                        <div style="padding: 20px; text-align: center;">
                            <i class="${section.icon}" style="font-size: 40px; color: #e94560;"></i>
                            <h3 style="color: white; margin: 10px 0;">${section.title}</h3>
                            <p style="color: #888;">${section.subtitle}</p>
                        </div>
                    </div>
                `;
            }
        });
        sectionsGrid.innerHTML = gridHtml;

        // Apply background previews dynamically using MEDIA_ASSETS
        SECTIONS.forEach(section => {
            if (section.category !== 'none' && MEDIA_ASSETS[section.category] && MEDIA_ASSETS[section.category].length > 0) {
                const el = document.getElementById(`preview-${section.id}`);
                if (el) {
                    let firstItem = MEDIA_ASSETS[section.category][0];
                    let imgItem = MEDIA_ASSETS[section.category].find(item => !item.file.match(/\.(mp4|webm|ogg|avi)$/i));
                    if (imgItem) firstItem = imgItem;
                    
                    const basePath = isPagesFolder ? '../assets/' : 'assets/';
                    const bgUrl = firstItem.file.startsWith('http') ? firstItem.file : `${basePath}${section.category}/${firstItem.file}`;
                    el.style.backgroundImage = `url('${bgUrl}')`;
                }
            }
        });
    }

    // 3. Apply Global Configurations
    if (typeof SITE_CONFIG !== 'undefined') {
        const basePath = isPagesFolder ? '../' : '';
        const profile = document.getElementById('dynamic-profile');
        const banner = document.getElementById('dynamic-banner');

        if (profile && SITE_CONFIG.profileImage) {
            const isUrl = SITE_CONFIG.profileImage.startsWith('http');
            profile.style.backgroundImage = isUrl ? `url('${SITE_CONFIG.profileImage}')` : `url('${basePath}assets/profile/${SITE_CONFIG.profileImage}')`;
        }
        if (banner && SITE_CONFIG.bannerImage) {
            const isUrl = SITE_CONFIG.bannerImage.startsWith('http');
            banner.style.backgroundImage = isUrl ? `url('${SITE_CONFIG.bannerImage}')` : `url('${basePath}assets/banners/${SITE_CONFIG.bannerImage}')`;
        }
    }
}
