// gallery.js
// Handles dynamic rendering of the gallery grid using explicit data from MEDIA_ASSETS.

document.addEventListener("DOMContentLoaded", function() {
    initDynamicGallery();
});

function initDynamicGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (galleryGrid) {
        renderGalleryElement(galleryGrid);
    }

    const galleries = document.querySelectorAll('.dynamic-gallery');
    galleries.forEach(gallery => {
        if (gallery.id !== 'galleryGrid') {
            renderGalleryElement(gallery);
        }
    });
}

function renderGalleryElement(galleryElement) {
    const category = galleryElement.getAttribute('data-category');
    if (!category || !MEDIA_ASSETS[category]) return;

    const isPagesFolder = window.location.pathname.includes('/pages/');
    const basePath = isPagesFolder ? '../assets/' : 'assets/';

    const items = MEDIA_ASSETS[category];
    let htmlContent = '';

    items.forEach((item) => {
        const fullPath = item.file.startsWith('http') ? item.file : `${basePath}${category}/${item.file}`;
        const isVideo = item.file.match(/\.(mp4|webm|ogg|avi)$/i);
        
        let mediaHtml = '';
        if (isVideo) {
            mediaHtml = `<video src="${fullPath}" autoplay loop muted playsinline style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;"></video>`;
        } else {
            mediaHtml = `<img src="${fullPath}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;">`;
        }

        if (category === 'html') {
            htmlContent += `
                <div class="design-card html-card" data-url="${item.url}">
                    <div class="card-image" style="height: 200px; width: 100%; overflow: hidden; border-radius: 10px 10px 0 0; margin-bottom: 15px;">
                        ${mediaHtml}
                    </div>
                    <div class="card-info" style="padding: 0 15px 15px 15px;">
                        <h4 class="design-name" style="color: white; margin-bottom: 10px;">${item.title}</h4>
                        <div class="design-details" style="display:flex; justify-content:space-between; margin-bottom: 10px; color:#888;">
                            <span class="model"><i class="fas fa-tag"></i> Model: ${item.model}</span>
                            <span class="price"><i class="fas fa-dollar-sign"></i> ${item.price}</span>
                        </div>
                        <div class="designer-info" style="display:flex; justify-content:space-between; margin-bottom: 15px; color:#888; font-size:14px;">
                            <span><i class="fas fa-user"></i> المصمم: ${item.designer}</span>
                            <span><i class="fas fa-user-tie"></i> المالك: ${item.owner}</span>
                        </div>
                        <button class="btn-view-html" style="width: 100%; padding: 10px; background: #e94560; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">
                            <i class="fas fa-eye"></i> ${item.viewBtn}
                        </button>
                    </div>
                </div>
            `;
        } else {
            // All items use the uniform design-card format, making it totally flexible
            htmlContent += `
                <div class="design-card">
                    <div class="card-image" style="height: 200px; width: 100%; overflow: hidden; border-radius: 10px 10px 0 0; margin-bottom: 15px;">
                        ${mediaHtml}
                    </div>
                    <div class="card-info" style="padding: 0 15px 15px 15px;">
                        <h4 class="design-name" style="color: white; margin-bottom: 10px;">${item.title}</h4>
                        <div class="design-details" style="display:flex; justify-content:space-between; margin-bottom: 10px; color:#888;">
                            <span class="model"><i class="fas fa-tag"></i> Model: ${item.model}</span>
                            <span class="price"><i class="fas fa-dollar-sign"></i> ${item.price}</span>
                        </div>
                        <div class="designer-info" style="display:flex; justify-content:space-between; margin-bottom: 15px; color:#888; font-size:14px;">
                            <span><i class="fas fa-user"></i> المصمم: ${item.designer}</span>
                            <span><i class="fas fa-user-tie"></i> المالك: ${item.owner}</span>
                        </div>
                        <div class="card-actions" style="display:flex; gap:10px;">
                            <button class="btn-view" style="width:100%; padding:10px; background:#e94560; color:white; border:none; border-radius:5px; cursor:pointer; font-size: 16px;">
                                <i class="fas fa-eye"></i> ${item.viewBtn}
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }
    });

    galleryElement.innerHTML = htmlContent;

    if (typeof processMediaElements === 'function') {
        processMediaElements();
    }
}
