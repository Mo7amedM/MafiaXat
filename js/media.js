// media.js

// دالة لمعالجة الوسائط تلقائياً وتحويل مسارات الفيديو إلى <video> والتعامل مع أخطاء التحميل
document.addEventListener("DOMContentLoaded", function() {
    processMediaElements();
});

// We can also run it immediately in case some elements are already there
processMediaElements();

function processMediaElements() {
    const images = document.querySelectorAll('img');
    const fallbackImage = 'https://via.placeholder.com/300x200?text=Media+Not+Found';

    images.forEach(img => {
        // إذا تمت معالجة الصورة مسبقاً
        if (img.dataset.mediaProcessed) return;
        img.dataset.mediaProcessed = 'true';

        const src = img.getAttribute('src');
        if (!src) return;

        const isVideo = src.match(/\.(mp4|webm|ogg|avi)$/i);

        if (isVideo) {
            // تحويل <img> إلى <video>
            const video = document.createElement('video');
            video.src = src;
            video.autoplay = true;
            video.loop = true;
            video.muted = true; // يجب أن يكون صامتاً ليعمل التشغيل التلقائي في المتصفحات
            video.playsInline = true;
            video.className = img.className;
            video.style.cssText = img.style.cssText;
            if (img.alt) video.title = img.alt;
            
            // نقل الـ attributes الهامة
            Array.from(img.attributes).forEach(attr => {
                if (attr.name !== 'src' && attr.name !== 'class' && attr.name !== 'style' && attr.name !== 'alt') {
                    video.setAttribute(attr.name, attr.value);
                }
            });

            // معالجة الخطأ
            video.onerror = function() {
                console.warn('Failed to load video:', src);
                // إعادة الصورة الافتراضية
                const fallbackImg = document.createElement('img');
                fallbackImg.src = fallbackImage;
                fallbackImg.className = video.className;
                video.parentNode.replaceChild(fallbackImg, video);
            };

            img.parentNode.replaceChild(video, img);
        } else {
            // معالجة خطأ تحميل الصور العادية
            img.onerror = function() {
                console.warn('Failed to load image:', src);
                if (this.src !== fallbackImage) {
                    this.src = fallbackImage;
                }
            };
        }
    });
}

// دالة مساعدة لتحديث الوسائط إذا تمت إضافة عناصر ديناميكياً
window.updateDynamicMedia = function() {
    processMediaElements();
};
