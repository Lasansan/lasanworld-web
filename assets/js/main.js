// Hàm kiểm tra xem đang ở trang chủ hay trang con để lấy đúng đường dẫn
const getPath = (url) => {
    const isSubPage = window.location.pathname.includes('/pages/');
    return isSubPage ? ../${url} : url;
};

let currentLang = localStorage.getItem('ls_lang') || (navigator.language.startsWith('vi') ? 'vi' : 'en');

async function initLaSanWorld() {
    try {
        // Nạp dữ liệu từ các đường dẫn đã được sửa
        const [hRes, fRes, tRes] = await Promise.all([
            fetch(getPath('components/header.html')),
            fetch(getPath('components/footer.html')),
            fetch(getPath('data/translations.json'))
        ]);

        if (!tRes.ok) throw new Error("Không tìm thấy file translations.json");
        const translations = await tRes.json();
        
        // Nạp Header
        if (hRes.ok) {
            const headerHtml = await hRes.text();
            document.getElementById('header-component').innerHTML = headerHtml;
            // Gọi hàm vẽ menu ngay sau khi nạp HTML
            renderLangMenu(translations);
        }

        // Nạp Footer
        if (fRes.ok) {
            document.getElementById('footer-component').innerHTML = await fRes.text();
        }

        // Dịch nội dung trang
        applyTranslations(translations[currentLang]);

    } catch (error) {
        console.error("Hệ thống La San gặp lỗi:", error);
    }
}

function renderLangMenu(translations) {
    const dropdown = document.getElementById('lang-dropdown');
    const currentFlagEl = document.getElementById('current-flag');
    
    if (!dropdown || !currentFlagEl) return;

    // Hiển thị lá cờ hiện tại
    currentFlagEl.innerText = translations[currentLang].flag;

    // Vẽ danh sách ngôn ngữ
    dropdown.innerHTML = Object.keys(translations).map(lang => `
        <button onclick="changeLanguage('${lang}')" class="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-sm transition-all text-left border-b border-gray-50 last:border-0">
            <span class="text-base">${translations[lang].flag}</span>
            <span class="font-medium text-gray-700">${translations[lang].label}</span>
        </button>
    `).join('');
}

function applyTranslations(t) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.innerText = t[key];
    });
}

function changeLanguage(lang) {
    localStorage.setItem('ls_lang', lang);
    location.reload();
}

function toggleLangMenu() {
    const menu = document.getElementById('lang-dropdown');
    if (menu) menu.classList.toggle('hidden');
}

// Đóng menu khi bấm ra ngoài
window.onclick = function(event) {
    if (!event.target.closest('#lang-switcher')) {
        const menu = document.getElementById('lang-dropdown');
        if (menu && !menu.classList.contains('hidden')) menu.classList.add('hidden');
    }
}

window.addEventListener('DOMContentLoaded', initLaSanWorld);
