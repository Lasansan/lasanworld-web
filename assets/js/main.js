/**
 * LASANWORLD - GITHUB PAGES COMPATIBLE SYSTEM
 * Tự động nhận diện thư mục gốc để nạp Header/Footer chính xác
 */

async function includeHTML() {
    const elements = document.querySelectorAll('[data-include]');
    
    // Tự động tìm đường dẫn gốc (Ví dụ: /lasanworld-web/)
    const pathArray = window.location.pathname.split('/');
    const repoName = pathArray[1] ? '/' + pathArray[1] : '';
    const isLocal = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost';
    
    // Nếu chạy trên GitHub thì dùng repoName, nếu chạy máy nhà thì để trống
    const base = isLocal ? '' : repoName;

    for (const el of elements) {
        let file = el.getAttribute('data-include');
        
        // Kết hợp lại thành đường dẫn đầy đủ: /lasanworld-web/components/header.html
        const finalPath = base + file + '?v=' + new Date().getTime();

        try {
            const response = await fetch(finalPath);
            if (response.ok) {
                el.innerHTML = await response.text();
                if (file.includes('header.html')) {
                    initHeaderLogic();
                }
            } else {
                console.error("404 - Không tìm thấy file tại:", finalPath);
            }
        } catch (err) {
            console.error("Lỗi kết nối hệ thống:", err);
        }
    }
}

function initHeaderLogic() {
    const savedFlag = localStorage.getItem('ls_flag') || 'https://flagcdn.com/w40/vn.png';
    const flagImg = document.getElementById('current-flag-img');
    if (flagImg) flagImg.src = savedFlag;
}

function changeLang(lang, flagUrl) {
    localStorage.setItem('ls_lang', lang);
    localStorage.setItem('ls_flag', flagUrl);
    location.reload();
}

document.addEventListener('DOMContentLoaded', includeHTML);
