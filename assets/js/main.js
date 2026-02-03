const getPath = (url) => window.location.pathname.includes('/pages/') ? '../' + url : url;

let currentLang = localStorage.getItem('ls_lang') || 'en';

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
            
            // ÉP HIỆN LÁ CỜ TRÊN MÁY TÍNH
            const flagBtn = document.getElementById('current-flag');
            if (flagBtn) {
                flagBtn.innerText = translations[currentLang].flag;
            }
            
            renderLangMenu(translations);
        }
    } catch (e) { console.error(e); }
}

function renderLangMenu(translations) {
    const dropdown = document.getElementById('lang-dropdown');
    if (!dropdown) return;

    dropdown.innerHTML = Object.keys(translations).map(lang => `
        <button onclick="changeLanguage('${lang}')" class="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-100 transition-colors text-left border-b border-slate-50 last:border-0">
            <span class="text-base">${translations[lang].flag}</span>
            <span class="text-sm font-medium text-slate-700">${translations[lang].label}</span>
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
