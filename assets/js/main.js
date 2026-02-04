async function includeHTML() {
    const elements = document.querySelectorAll('[data-include]');
    const isSubPage = window.location.pathname.includes('/pages/');
    for (const el of elements) {
        let file = el.getAttribute('data-include');
        let finalPath = isSubPage ? '..' + file : file.substring(1);
        try {
            const response = await fetch(finalPath + '?v=' + new Date().getTime());
            if (response.ok) {
                el.innerHTML = await response.text();
                if (file.includes('header.html')) {
                    const savedFlag = localStorage.getItem('ls_flag') || 'https://flagcdn.com/w40/vn.png';
                    const flagImg = document.getElementById('current-flag-img');
                    if (flagImg) flagImg.src = savedFlag;
                }
            }
        } catch (err) { console.error("Lỗi:", err); }
    }
}

function toggleLangMenu() {
    const dropdown = document.getElementById('lang-dropdown');
    if (dropdown) dropdown.classList.toggle('hidden');
}

function changeLang(lang, flagUrl) {
    localStorage.setItem('ls_lang', lang);
    localStorage.setItem('ls_flag', flagUrl);
    location.reload();
}

document.addEventListener('DOMContentLoaded', includeHTML);
// Đóng menu khi bấm ra ngoài
window.onclick = function(e) {
    if (!e.target.closest('#lang-switcher')) {
        const d = document.getElementById('lang-dropdown');
        if (d) d.classList.add('hidden');
    }
}
