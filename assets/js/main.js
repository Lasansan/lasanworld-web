const getPath = (url) => window.location.pathname.includes('/pages/') ? ../${url} : url;

let currentLang = localStorage.getItem('ls_lang') || (navigator.language.startsWith('vi') ? 'vi' : 'en');

async function initLaSanWorld() {
    try {
        const [hRes, fRes, tRes] = await Promise.all([
            fetch(getPath('components/header.html')),
            fetch(getPath('components/footer.html')),
            fetch(getPath('data/translations.json'))
        ]);

        const translations = await tRes.json();
        
        if (hRes.ok) {
            document.getElementById('header-component').innerHTML = await hRes.text();
            // Đợi 1 chút để Header kịp hiện ra rồi mới vẽ cờ
            setTimeout(() => renderLangMenu(translations), 100);
        }
        if (fRes.ok) document.getElementById('footer-component').innerHTML = await fRes.text();

        applyTranslations(translations[currentLang]);

    } catch (error) {
        console.error("Lỗi:", error);
    }
}

function renderLangMenu(translations) {
    const dropdown = document.getElementById('lang-dropdown');
    const currentFlagEl = document.getElementById('current-flag');
    
    if (!currentFlagEl || !dropdown) return;

    // Ép hiển thị lá cờ từ file JSON
    currentFlagEl.innerText = translations[currentLang].flag;

    dropdown.innerHTML = Object.keys(translations).map(lang => `
        <button onclick="changeLanguage('${lang}')" class="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-100 text-sm transition-colors text-left">
            <span>${translations[lang].flag}</span>
            <span class="text-slate-700">${translations[lang].label || translations[lang].name || lang}</span>
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

window.onclick = function(event) {
    if (!event.target.closest('#lang-switcher')) {
        const menu = document.getElementById('lang-dropdown');
        if (menu && !menu.classList.contains('hidden')) menu.classList.add('hidden');
    }
}

window.addEventListener('DOMContentLoaded', initLaSanWorld);
