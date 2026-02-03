// Hàm lấy đường dẫn chính xác (Không dùng dấu huyền để tránh lỗi dán code)
const getPath = (url) => {
    const isSubPage = window.location.pathname.includes('/pages/');
    return isSubPage ? '../' + url : url;
};

// Lấy ngôn ngữ hiện tại
let currentLang = localStorage.getItem('ls_lang') || 'en';

async function initLaSanWorld() {
    try {
        // Nạp Header và Dịch thuật
        const hRes = await fetch(getPath('components/header.html'));
        const tRes = await fetch(getPath('data/translations.json'));
        
        if (hRes.ok && tRes.ok) {
            const headerHtml = await hRes.text();
            const translations = await tRes.json();
            
            // Đổ Header vào khung trống
            document.getElementById('header-component').innerHTML = headerHtml;
            
            // Vẽ lá cờ hiện tại
            const currentFlagEl = document.getElementById('current-flag');
            if (currentFlagEl) {
                currentFlagEl.innerText = translations[currentLang].flag;
            }
            
            // Vẽ danh sách ngôn ngữ vào dropdown
            const dropdown = document.getElementById('lang-dropdown');
            if (dropdown) {
                let menuHtml = '';
                Object.keys(translations).forEach(lang => {
                    menuHtml += '<button onclick="changeLanguage(\'' + lang + '\')" style="width:100%; display:flex; align-items:center; gap:12px; padding:10px 16px; border:none; background:none; cursor:pointer; text-align:left; font-family:sans-serif; font-size:14px;">';
                    menuHtml += '<span>' + translations[lang].flag + '</span>';
                    menuHtml += '<span>' + translations[lang].label + '</span>';
                    menuHtml += '</button>';
                });
                dropdown.innerHTML = menuHtml;
            }

            // Thực hiện dịch nội dung
            applyTranslations(translations[currentLang]);
        }
    } catch (e) {
        console.error("Lỗi khởi tạo:", e);
    }
}

function applyTranslations(t) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.innerText = t[key];
    });
}

function toggleLangMenu() {
    const menu = document.getElementById('lang-dropdown');
    if (menu) menu.classList.toggle('hidden');
}

function changeLanguage(lang) {
    localStorage.setItem('ls_lang', lang);
    location.reload();
}

// Đóng menu khi bấm ra ngoài
window.onclick = function(event) {
    if (!event.target.closest('#lang-switcher')) {
        const menu = document.getElementById('lang-dropdown');
        if (menu && !menu.classList.contains('hidden')) {
            menu.classList.add('hidden');
        }
    }
}

window.addEventListener('DOMContentLoaded', initLaSanWorld);
