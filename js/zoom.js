// zoom.js

function openZoom(button) {
    const card = button.closest('.design-card') || button.closest('.avatar-card');
    if (!card) return;
    
    const mediaElement = card.querySelector('img') || card.querySelector('video');
    if (!mediaElement) return;

    const modal = document.getElementById('zoomModal');
    if (!modal) return;
    
    const modalContent = modal.querySelector('.modal-content');
    if (!modalContent) return;

    // Clear previous media (except the close button if it's inside modal-content, 
    // but in our HTML, .close-modal is usually a sibling to .modal-content, wait.
    // Let's check HTML: <span class="close-modal" ...>&times;</span> <div class="modal-content"> <img ...> </div>
    // So we can safely empty modalContent.
    modalContent.innerHTML = '';
    
    // Reset any inline styles that might have been applied by other modal functions
    modalContent.removeAttribute('style');

    const isVideo = mediaElement.tagName.toLowerCase() === 'video';
    
    if (isVideo) {
        const video = document.createElement('video');
        video.src = mediaElement.currentSrc || mediaElement.src;
        video.autoplay = true;
        video.loop = true;
        video.controls = true;
        video.muted = true; // Mute video so it doesn't pause global background music
        video.style.maxWidth = '90vw';
        video.style.maxHeight = '90vh';
        video.style.borderRadius = '10px';
        video.style.boxShadow = '0 0 50px rgba(233,69,96,0.5)';
        video.id = 'zoomMedia';
        modalContent.appendChild(video);
    } else {
        const img = document.createElement('img');
        img.src = mediaElement.src;
        img.style.maxWidth = '90vw';
        img.style.maxHeight = '90vh';
        img.style.borderRadius = '10px';
        img.style.boxShadow = '0 0 50px rgba(233,69,96,0.5)';
        img.id = 'zoomMedia';
        // Preserve avatar specific styling if it was an avatar
        if (card.classList.contains('avatar-card')) {
            img.style.maxWidth = '200px';
            img.style.borderRadius = '50%';
            img.style.border = '5px solid #e94560';
        }
        modalContent.appendChild(img);
    }
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent page scroll
}

function closeZoom() {
    const modal = document.getElementById('zoomModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore page scroll
        const media = document.getElementById('zoomMedia');
        if (media && media.tagName.toLowerCase() === 'video') {
            media.pause();
        }
    }
}

// إغلاق النافذة عند النقر خارج الصورة
window.addEventListener('click', function(event) {
    const modal = document.getElementById('zoomModal');
    if (event.target === modal) {
        closeZoom();
    }
});

function openIframeModal(url) {
    const modal = document.getElementById('zoomModal');
    if (!modal) return;
    
    const modalContent = modal.querySelector('.modal-content');
    if (!modalContent) return;

    modalContent.innerHTML = '';
    
    // Set fixed max width for the modal content specifically for the iframe
    modalContent.style.width = '100%';
    modalContent.style.maxWidth = '1280px';
    
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.style.width = '100%';
    iframe.style.aspectRatio = '16 / 9'; // Keeps exactly 16:9 ratio
    iframe.style.maxHeight = '90vh'; // Ensures it doesn't overflow screen height
    iframe.style.border = 'none';
    iframe.style.borderRadius = '15px';
    iframe.style.boxShadow = '0 20px 60px rgba(0,0,0,0.8)';
    iframe.id = 'zoomMedia';
    
    modalContent.appendChild(iframe);
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent page scroll
}

document.addEventListener("DOMContentLoaded", function() {
    document.body.addEventListener("click", function(e) {
        const viewBtn = e.target.closest('.btn-view');
        if (viewBtn) {
            openZoom(viewBtn);
        }

        const viewHtmlBtn = e.target.closest('.btn-view-html');
        if (viewHtmlBtn) {
            const card = viewHtmlBtn.closest('.html-card');
            if (card) {
                const url = card.getAttribute('data-url');
                openIframeModal(url);
            }
        }
    });
});
