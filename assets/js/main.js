/**
 * LASANWORLD - SMART PATH CONTROL
 * Tự động sửa lỗi đường dẫn trên GitHub Pages
 */

async function includeHTML() {
    const elements = document.querySelectorAll('[data-include]');
    
    // Kiểm tra xem đang ở trang chủ hay trang con trong /pages/
    const isSubPage = window.location.pathname.includes('/pages/');
    
    for (const el of elements) {
        let file = el.getAttribute('data-include');
        
        // BIẾN ĐỔI ĐƯỜNG DẪN: 
        // Nếu ở trong /pages/, thêm ../ để ra ngoài thư mục gốc tìm components
        let finalPath = file;
        if (isSubPage) {
            finalPath = '..' + file;
        }

        try {
            const response = await fetch(finalPath + '?v=' + new Date().getTime());
            if (response.ok) {
                el.innerHTML = await response.text();
                if (file.includes('header.html')) {
                    initHeaderLogic();
                }
            } else {
                console.error("Không tìm thấy file tại:", finalPath);
            }
        } catch (err) {
            console.error("Lỗi kết nối tệp:", err);
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

// Chạy lệnh nạp
document.addEventListener('DOMContentLoaded', includeHTML);
