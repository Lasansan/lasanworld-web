// Cấu hình ngôn ngữ ban đầu
const languages = {
    'en': { flag: '🇺🇸', name: 'English' },
    'vi': { flag: '狂', name: 'Tiếng Việt' },
    'zh': { flag: '🇨🇳', name: '中文' },
    'es': { flag: '🇪🇸', name: 'Español' },
    'fr': { flag: '🇫🇷', name: 'Français' },
    'ja': { flag: '🇯🇵', name: '日本語' }
};

// Khởi tạo hệ thống i18n
function initI18n() {
    // 1. Kiểm tra lựa chọn cũ trong máy người dùng
    let savedLang = localStorage.getItem('lasanworld_lang');
    
    // 2. Nếu chưa có, tự nhận diện từ trình duyệt
    if (!savedLang) {
        const browserLang = navigator.language.split('-')[0];
        savedLang = languages[browserLang] ? browserLang : 'en';
    }

    setLanguage(savedLang);
}

function setLanguage(langCode) {
    localStorage.setItem('lasanworld_lang', langCode);
    document.documentElement.lang = langCode;
    // Sau này sẽ bổ sung hàm load nội dung từ file JSON tại đây
    console.log("Ngôn ngữ hiện tại:", langCode);
}

// Chạy khởi tạo khi trang web load xong
window.addEventListener('DOMContentLoaded', initI18n);
