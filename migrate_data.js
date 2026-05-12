const fs = require('fs');
const path = require('path');

const dataJsPath = path.join(__dirname, 'js', 'data.js');
const fileContent = fs.readFileSync(dataJsPath, 'utf8');

// Mock window object
global.window = {};
eval(fileContent);

const oldAssets = global.MEDIA_ASSETS;
const oldConfig = global.SITE_CONFIG;

const newAssets = {};

for (const [category, files] of Object.entries(oldAssets)) {
    if (category === 'audio') {
        newAssets[category] = files.map(file => ({ file }));
        continue;
    }

    newAssets[category] = files.map((file, index) => {
        const title = `تصميم ${index + 1} 🎇`;
        const model = `#${category.toUpperCase().substring(0, 3)}-00${index + 1}`;
        const price = "50$";
        const designer = "أحمد";
        const owner = "محمد";
        const viewBtn = "عرض";
        const buyBtn = "شراء";

        if (category === 'avatars') {
            return {
                file,
                title: `أفاتار ${index + 1}`,
                model,
                price,
                designer,
                owner,
                viewBtn: "معاينة",
                buyBtn: "شراء"
            };
        } else if (category === 'banners') {
            return {
                file,
                title: `بانر ${index + 1} 🎇`,
                model,
                price,
                designer,
                owner,
                viewBtn: "عرض",
                buyBtn: "شراء"
            };
        } else {
            return {
                file,
                title,
                model,
                price,
                designer,
                owner,
                viewBtn,
                buyBtn
            };
        }
    });
}

const sections = [
    { id: "banner", title: "Banner", subtitle: "معرض البانرات الرائعة", icon: "fas fa-image", link: "pages/banner.html", category: "banners" },
    { id: "pcback", title: "PC Back", subtitle: "خلفيات غير متحركة للحاسوب", icon: "fas fa-desktop", link: "pages/pcback.html", category: "pcback" },
    { id: "movie", title: "PC Back Movie", subtitle: "خلفيات متحركة رائعة", icon: "fas fa-film", link: "pages/movie.html", category: "movies" },
    { id: "chat", title: "Chat Background", subtitle: "خلفيات شات غير متحركة", icon: "fas fa-comments", link: "pages/chat.html", category: "chat" },
    { id: "xatspace", title: "XatSpace Profile", subtitle: "بروفايل متحرك 1200×1920", icon: "fas fa-user-astronaut", link: "pages/xatspace.html", category: "xatspace" },
    { id: "avatar", title: "Avatar 4D/3D", subtitle: "أفاتار متحرك 80×80 - 60 فريم", icon: "fas fa-robot", link: "pages/avatar.html", category: "avatars" },
    { id: "about", title: "معلومات عني", subtitle: "راديو - دردشة - واتساب", icon: "fas fa-info-circle", link: "pages/about.html", category: "none" }
];

const navigation = [
    { title: "الرئيسية", icon: "fas fa-home", link: "index.html", isHome: true },
    { title: "Banner", icon: "fas fa-image", link: "pages/banner.html" },
    { title: "PC Back", icon: "fas fa-desktop", link: "pages/pcback.html" },
    { title: "Movie", icon: "fas fa-film", link: "pages/movie.html" },
    { title: "Chat", icon: "fas fa-comments", link: "pages/chat.html" },
    { title: "XatSpace", icon: "fas fa-user-astronaut", link: "pages/xatspace.html" },
    { title: "Avatar", icon: "fas fa-robot", link: "pages/avatar.html" },
    { title: "عني", icon: "fas fa-info-circle", link: "pages/about.html" }
];

const newConfig = {
    ...oldConfig,
    searchPlaceholder: "🔍 ابحث عن خلفية أو تصميم...",
    searchButtonText: "بحث",
    footerText: "© 2026 معرض الخلفيات | جميع الحقوق محفوظة",
    whatsappLink: "https://wa.me/201234567890",
    messengerLink: "https://m.me/username"
};

const output = `// data.js
// Fully Centralized & Editable Data System

const SITE_CONFIG = ${JSON.stringify(newConfig, null, 4)};

const NAVIGATION = ${JSON.stringify(navigation, null, 4)};

const SECTIONS = ${JSON.stringify(sections, null, 4)};

const MEDIA_ASSETS = ${JSON.stringify(newAssets, null, 4)};

// Expose globally
window.SITE_CONFIG = SITE_CONFIG;
window.NAVIGATION = NAVIGATION;
window.SECTIONS = SECTIONS;
window.MEDIA_ASSETS = MEDIA_ASSETS;
`;

fs.writeFileSync(dataJsPath, output, 'utf8');
console.log('Successfully migrated data.js');
