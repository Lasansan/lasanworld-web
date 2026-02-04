const getPath = (url) => {
    const isSubPage = window.location.pathname.includes('/pages/');
    return (isSubPage ? '../' : '') + url + '?v=' + new Date().getTime();
};

// Từ điển lá cờ dự phòng để hiện ngay lập tức
const flagMap = {
    'vi': '🇻🇳', 'en': '🇺🇸', 'en-AU': '🇦🇺', 'ja': '🇯🇵', 
    'zh': '🇨🇳', 'fr': '🇫🇷', 'de': '🇩🇪', 'ko': '🇰🇷', 'es': '🇪🇸'
};

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
            
            document.getElementById('header-component').innerHTML = headerHtml;
            
            // HIỆN LÁ CỜ: Ưu tiên JSON, nếu lỗi thì dùng dự phòng
            const flagBtn = document.getElementById('current-flag');
            if (flagBtn) {
                flagBtn.innerText = translations[currentLang]?.flag || flagMap[currentLang];
            }
            
            renderLangMenu(translations);
        }
    } catch (e) { console.error("Lỗi: ", e); }
}

function renderLangMenu(translations) {
    const dropdown = document.getElementById('lang-dropdown');
    if (!dropdown) return;

    dropdown.innerHTML = Object.keys(translations).map(lang => `
        <button onclick="changeLanguage('${lang}')" class="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors text-left border-b border-slate-50 last:border-0">
            <span class="text-xl">${translations[lang].flag}</span>
            <span class="text-sm font-semibold text-slate-700">${translations[lang].label}</span>
        </button>
    `).join('');
}

function changeLanguage(lang) {
    localStorage.setItem('ls_lang', lang);
    location.reload();
}

function toggleLangMenu() {
    const menu = document.getElementById('lang-dropdown');
    if (menu) menu.classList.toggle('hidden');
}

window.addEventListener('DOMContentLoaded', initLaSanWorld);
