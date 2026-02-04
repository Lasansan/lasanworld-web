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
                    initHeaderLogic();
                }
            }
        } catch (err) { console.error("Lỗi:", err); }
    }
}

function initHeaderLogic() {
    const savedFlag = localStorage.getItem('ls_flag') || 'https://flagcdn.com/w40/vn.png';
    const flagImg = document.getElementById('current-flag-img');
    if (flagImg) flagImg.src = savedFlag;
}

// HÀM QUAN TRỌNG ĐỂ MỞ DANH SÁCH QUỐC GIA
function toggleLangMenu() {
    const dropdown = document.getElementById('lang-dropdown');
    if (dropdown) {
        dropdown.classList.toggle('hidden');
    }
}

function changeLang(lang, flagUrl) {
    localStorage.setItem('ls_lang', lang);
    localStorage.setItem('ls_flag', flagUrl);
    location.reload();
}

window.addEventListener('click', function(e) {
    const switcher = document.getElementById('lang-switcher');
    if (switcher && !switcher.contains(e.target)) {
        const dropdown = document.getElementById('lang-dropdown');
        if (dropdown) dropdown.classList.add('hidden');
    }
});

document.addEventListener('DOMContentLoaded', includeHTML);
