// data.js
// Fully Centralized & Editable Data System

const SITE_CONFIG = {
    "profileImage": "https://xatimg.com/image/xM4IWO0TsgJl.png",
    "bannerImage": "https://xatimg.com/image/Q8wGCSxFWxx8.jpg"
};

const htmlItems = [
    "Asabi",
    "MrsTanya1",
    "NoBody",
    "Kime"
];

const NAVIGATION = [
    { title: "الرئيسية", icon: "fas fa-home", link: "index.html", isHome: true },
    { title: "HTML", icon: "fas fa-code", link: "pages/html.html" },
    { title: "Banner", icon: "fas fa-image", link: "pages/banner.html" },
    { title: "PC Back", icon: "fas fa-desktop", link: "pages/pcback.html" },
    { title: "Movie", icon: "fas fa-film", link: "pages/movie.html" },
    { title: "Chat", icon: "fas fa-comments", link: "pages/chat.html" },
    { title: "XatSpace", icon: "fas fa-user-astronaut", link: "pages/xatspace.html" },
    { title: "Avatar", icon: "fas fa-robot", link: "pages/avatar.html" },
    { title: "عني", icon: "fas fa-info-circle", link: "pages/about.html" }
];

const SECTIONS = [
    { id: "html", title: "HTML Designs", subtitle: "تصاميم HTML من روابط خارجية", icon: "fas fa-code", link: "pages/html.html", category: "html" },
    { id: "banner", title: "Banner", subtitle: "معرض البانرات الرائعة", icon: "fas fa-image", link: "pages/banner.html", category: "banners" },
    { id: "pcback", title: "PC Back", subtitle: "خلفيات غير متحركة للحاسوب", icon: "fas fa-desktop", link: "pages/pcback.html", category: "pcback" },
    { id: "movie", title: "PC Back Movie", subtitle: "خلفيات متحركة رائعة", icon: "fas fa-film", link: "pages/movie.html", category: "movies" },
    { id: "chat", title: "Chat Background", subtitle: "خلفيات شات غير متحركة", icon: "fas fa-comments", link: "pages/chat.html", category: "chat" },
    { id: "xatspace", title: "XatSpace Profile", subtitle: "بروفايل متحرك 1200×1920", icon: "fas fa-user-astronaut", link: "pages/xatspace.html", category: "xatspace" },
    { id: "avatar", title: "Avatar 4D/3D", subtitle: "أفاتار متحرك 80×80 - 60 فريم", icon: "fas fa-robot", link: "pages/avatar.html", category: "avatars" },
    { id: "about", title: "معلومات عني", subtitle: "راديو - دردشة - واتساب", icon: "fas fa-info-circle", link: "pages/about.html", category: "none" }
];

// Helper to generate explicit object array for a category
function genData(prefix, modelPrefix, price, files) {
    return files.map((file, i) => ({
        file: file,
        title: `${prefix} ${i + 1} 🎇`,
        model: `#${modelPrefix}-00${i + 1}`,
        price: price + " Xats",
        designer: "Mafia",
        owner: "Mafia1",
        viewBtn: "عرض"
    }));
}

const MEDIA_ASSETS = {
    audio: [{ file: "1.mp3" }],
    html: htmlItems.map((name, i) => ({
        file: `${name}.png`,
        url: `https://mo7amedm.github.io/${name}/`,
        title: name,
        model: `#HTM-00${i + 1}`,
        price: "4500 Xats",
        designer: "Mafia",
        owner: "Mafia1",
        viewBtn: "عرض"
    })),
    avatars: genData("أفاتار", "AVA", "450", [
        "anigif (2).gif", "CM.avi", "NEW10.gif", "NEW11.gif", "NEW12.gif",
        "NEW13.gif", "NEW14.gif", "NEW15.gif", "NEW16.gif"
    ]),
    banners: genData("بانر", "BAN", "500", [
        "1.jpg", "1.png", "2.jpg", "2.png", "2020.png", "3.jpg",
        "4.jpg", "5.jpg", "6.jpg", "88.png", "fitness-gym-youtube-channel-art-banner-psd-free (2).jpg"
    ]),
    chat: genData("شات", "CHA", "2500", [
        "1.jpg", "10.png", "11.png", "12.png", "2.jpg", "3.png",
        "4.png", "5.png", "6.png", "7.png", "8.png", "9.png"
    ]),
    movies: genData("متحرك", "MOV", "2000", [
        "1.jpg", "1.png", "10.png", "11.jpg", "12.png", "13.png", "14.png", "15.jpg",
        "16.jpg", "17.jpg", "18.png", "19.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg",
        "6.jpg", "7.jpg", "8.png", "9.png"
    ]),
    pcback: genData("تصميم", "PCB", "1500", [
        "1.jpg", "1.png", "10.png", "11.jpg", "12.png", "13.png", "14.png", "15.jpg",
        "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.png", "9.png"
    ]),
    profile: genData("بروفايل", "PRO", "2000", [
        "1.jpg", "1.png", "10.png", "11.jpg", "12.png", "13.png", "14.png", "15.jpg",
        "16.jpg", "17.jpg", "18.png", "19.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg",
        "6.jpg", "7.jpg", "8.png", "9.png"
    ]),
    xatspace: genData("سبيس", "XAT", "2000", [
        "1.png", "222.png", "4253884.png", "77.png", "Back.png", "file1555.png",
        "file2015.png", "file2319.png", "file2320.png", "file2369.jpg", "KEWIN.gif",
        "xatspace-classic.png"
    ])
};

// Expose globally
window.SITE_CONFIG = SITE_CONFIG;
window.NAVIGATION = NAVIGATION;
window.SECTIONS = SECTIONS;
window.MEDIA_ASSETS = MEDIA_ASSETS;
