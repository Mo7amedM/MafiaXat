// audio.js

let isPlaying = false;

document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById('siteRadio');
    const btn = document.getElementById('playBtn');

    if (audio && btn) {
        audio.addEventListener('play', () => {
            btn.innerHTML = '<i class="fas fa-pause"></i> إيقاف';
            btn.classList.add('active');
            btn.style.background = '#00ff88';
            btn.style.color = '#000';
            isPlaying = true;
        });

        audio.addEventListener('pause', () => {
            btn.innerHTML = '<i class="fas fa-play"></i> تشغيل';
            btn.classList.remove('active');
            btn.style.background = '#e94560';
            btn.style.color = 'white';
            isPlaying = false;
        });

        audio.addEventListener('ended', () => {
            isPlaying = false;
        });

        audio.addEventListener('error', (e) => {
            console.warn("Audio error or file not found.");
            btn.innerHTML = '<i class="fas fa-exclamation-circle"></i> غير متاح';
            btn.style.background = '#888';
            btn.disabled = true;
        });
    }
});

function toggleRadio() {
    const audio = document.getElementById('siteRadio');

    if (!audio) return;

    if (isPlaying) {
        audio.pause();
    } else {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.warn("Autoplay prevented or file not found: ", error);
                const btn = document.getElementById('playBtn');
                if (btn) {
                    btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> خطأ';
                    btn.style.background = '#ffcc00';
                    btn.style.color = '#000';
                }
            });
        }
    }
}
