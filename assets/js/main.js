const getPath = (url) => window.location.pathname.includes('/pages/') ? ../${url} : url;

// 1. Khởi tạo ngôn ngữ (Tự động nhận diện hoặc lấy từ bộ nhớ)
let currentLang = localStorage.getItem('ls_lang') || 
                  (navigator.language.startsWith('vi') ? 'vi' : 'en');

async function initLaSanWorld() {
    try {
        // Nạp Header/Footer và Dữ liệu dịch thuật cùng lúc
        const [hRes, fRes, tRes] = await Promise.all([
            fetch(getPath('components/header.html')),
            fetch(getPath('components/footer.html')),
            fetch(getPath('data/translations.json'))
        ]);

        const translations = await tRes.json();
        
        // Hiển thị giao diện chung
        if (hRes.ok) document.getElementById('header-component').innerHTML = await hRes.text();
        if (fRes.ok) document.getElementById('footer-component').innerHTML = await fRes.text();

        // 2. Thực hiện dịch thuật các nội dung tĩnh trên trang
        applyTranslations(translations[currentLang]);

    } catch (error) {
        console.error("Lỗi hệ thống:", error);
    }
}

function applyTranslations(t) {
    // Tìm các phần tử có thuộc tính data-i18n để dịch
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.innerText = t[key];
    });
}

// Hàm đổi ngôn ngữ (Tiểu Ngưu sẽ dùng ở nút bấm sau này)
function changeLanguage(lang) {
    localStorage.setItem('ls_lang', lang);
    location.reload();
}

window.addEventListener('DOMContentLoaded', initLaSanWorld);
