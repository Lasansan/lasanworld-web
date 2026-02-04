const getPath = (url) => window.location.pathname.includes('/pages/') ? '../' + url : url;

// Lấy ngôn ngữ đã lưu hoặc mặc định là Tiếng Việt cho gần gũi nhé Tiểu Ngưu
let currentLang = localStorage.getItem('ls_lang') || 'vi';

async function initLaSanWorld() {
    try {
        const [hRes, tRes] = await Promise.all([
            fetch(getPath('components/header.html')),
            fetch(getPath('data/translations.json'))
        ]);

        if (hRes.ok && tRes.ok) {
            const headerHtml = await hRes.text();
            const translations = await tRes.json();
            
            // 1. Dán Header vào trang
            document.getElementById('header-component').innerHTML = headerHtml;
            
            // 2. ÉP hiện lá cờ ra cái nút bên ngoài ngay lập tức
            const flagElement = document.getElementById('current-flag');
            if (flagElement && translations[currentLang]) {
                flagElement.innerText = translations[currentLang].flag;
            }
            
            // 3. Chuẩn bị danh sách Cờ + Tên bên trong menu
            renderLangMenu(translations);

            // 4. Dịch các chữ khác trên trang
            applyTranslations(translations[currentLang]);
        }
    } catch (e) { console.error("Lỗi rồi Tiểu Ngưu ơi:", e); }
}

function renderLangMenu(translations) {
    const dropdown = document.getElementById('lang-dropdown');
    if (!dropdown) return;

    dropdown.innerHTML = Object.keys(translations).map(lang => `
        <button onclick="changeLanguage('${lang}')" class="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors text-left border-b border-slate-50 last:border-0">
            <span class="text-lg">${translations[lang].flag}</span>
            <span class="text-sm font-medium text-slate-700">${translations[lang].label}</span>
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

// Đóng menu khi bấm trượt ra ngoài
window.onclick = function(event) {
    if (!event.target.closest('#lang-switcher')) {
        const menu = document.getElementById('lang-dropdown');
        if (menu && !menu.classList.contains('hidden')) menu.classList.add('hidden');
    }
}

window.addEventListener('DOMContentLoaded', initLaSanWorld);
