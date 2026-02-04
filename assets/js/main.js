async function includeHTML() {
    const elements = document.querySelectorAll('[data-include]');
    
    // Kiểm tra xem trang hiện tại có nằm trong thư mục /pages/ không
    const isSubPage = window.location.pathname.includes('/pages/');

    for (const el of elements) {
        let file = el.getAttribute('data-include');
        
        // NẾU Ở TRANG CON: Biến /components/ thành ../components/ để tìm đúng chỗ
        let finalPath = file;
        if (isSubPage && file.startsWith('/')) {
            finalPath = '..' + file;
        } else if (!isSubPage && file.startsWith('/')) {
            // Nếu ở trang chủ, chỉ cần bỏ dấu / ở đầu để GitHub Pages dễ nhận diện
            finalPath = file.substring(1);
        }

        try {
            const response = await fetch(finalPath + '?v=' + new Date().getTime());
            if (response.ok) {
                el.innerHTML = await response.text();
                // Kích hoạt logic ngay sau khi nạp xong Header
                if (file.includes('header.html')) {
                    initHeaderLogic();
                }
            } else {
                console.error("404 - Đường dẫn sai:", finalPath);
            }
        } catch (err) {
            console.error("Lỗi hệ thống:", err);
        }
    }
}

function initHeaderLogic() {
    const savedFlag = localStorage.getItem('ls_flag') || 'https://flagcdn.com/w40/vn.png';
    const flagImg = document.getElementById('current-flag-img');
    if (flagImg) {
        flagImg.src = savedFlag;
    }
}

function changeLang(lang, flagUrl) {
    localStorage.setItem('ls_lang', lang);
    localStorage.setItem('ls_flag', flagUrl);
    location.reload(); 
}

// Chạy lệnh nạp khi trang đã sẵn sàng
document.addEventListener('DOMContentLoaded', includeHTML);
