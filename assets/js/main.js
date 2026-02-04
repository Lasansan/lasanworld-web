const getPath = (url) => {
    const isSubPage = window.location.pathname.includes('/pages/');
    // Thêm ?v=... để ép trình duyệt không dùng bản cũ
    return (isSubPage ? '../' : '') + url + '?v=' + new Date().getTime();
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
            
            // ÉP HIỆN LÁ CỜ NGAY LẬP TỨC
            const flagBtn = document.getElementById('current-flag');
            if (flagBtn && translations[currentLang]) {
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
        <button onclick="changeLanguage('${lang}')" style="width:100%; display:flex; align-items:center; gap:12px; padding:10px 16px; border:none; background:none; cursor:pointer; text-align:left;">
            <span style="font-size:1.2rem">${translations[lang].flag}</span>
            <span style="font-size:0.9rem; font-weight:500">${translations[lang].label}</span>
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
