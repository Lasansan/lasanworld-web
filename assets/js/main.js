const getPath = (url) => window.location.pathname.includes('/pages/') ? ../${url} : url;

// 1. Khởi tạo ngôn ngữ (Tự động nhận diện hoặc lấy từ bộ nhớ)
let currentLang = localStorage.getItem('ls_lang') || 
                  (navigator.language.startsWith('vi') ? 'vi' : 'en');

async function initLaSanWorld() {
    try {
        const [hRes, fRes, tRes] = await Promise.all([
            fetch(getPath('components/header.html')),
            fetch(getPath('components/footer.html')),
            fetch(getPath('data/translations.json'))
        ]);

        const translations = await tRes.json();
        
        if (hRes.ok) document.getElementById('header-component').innerHTML = await hRes.text();
        if (fRes.ok) document.getElementById('footer-component').innerHTML = await fRes.text();

        // Nạp danh sách ngôn ngữ vào menu và dịch trang ngay lập tức
        renderLangMenu(translations);
        applyTranslations(translations[currentLang]);

    } catch (error) {
        console.error("Lỗi:", error);
    }
}

// 2. Hàm tự động tạo menu ngôn ngữ có lá cờ
function renderLangMenu(translations) {
    const dropdown = document.getElementById('lang-dropdown');
    const currentFlagEl = document.getElementById('current-flag');
    
    // Nếu chưa có các thẻ này trong header thì bỏ qua
    if (!dropdown || !currentFlagEl) return;

    currentFlagEl.innerText = translations[currentLang].flag;

    dropdown.innerHTML = Object.keys(translations).map(lang => `
        <button onclick="changeLanguage('${lang}')" class="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-100 text-sm transition-colors">
            <span>${translations[lang].flag}</span>
            <span>${translations[lang].label}</span>
        </button>
    `).join('');
}

// 3. Hàm thực hiện dịch các nội dung có thuộc tính [data-i18n]
function applyTranslations(t) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.innerText = t[key];
    });
}

// 4. Hàm đổi ngôn ngữ và ghi nhớ vào máy
function changeLanguage(lang) {
    localStorage.setItem('ls_lang', lang);
    location.reload();
}

// 5. Hàm đóng/mở menu (Tiểu Ngưu sẽ dùng ở Header)
function toggleLangMenu() {
    const menu = document.getElementById('lang-dropdown');
    if (menu) menu.classList.toggle('hidden');
}

// 6. Đóng menu khi bấm ra ngoài
window.onclick = function(event) {
    if (!event.target.closest('#lang-switcher')) {
        const menu = document.getElementById('lang-dropdown');
        if (menu && !menu.classList.contains('hidden')) {
            menu.classList.add('hidden');
        }
    }
}

window.addEventListener('DOMContentLoaded', initLaSanWorld);
