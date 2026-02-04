/**
 * LASANWORLD - BỘ NÃO ĐIỀU KHIỂN TRUNG TÂM (FIX LỖI ĐƯỜNG DẪN)
 */

async function includeHTML() {
    const elements = document.querySelectorAll('[data-include]');
    for (const el of elements) {
        let file = el.getAttribute('data-include');
        try {
            // Đảm bảo đường dẫn luôn bắt đầu từ gốc (root) bằng dấu /
            const safePath = file.startsWith('/') ? file : '/' + file;
            
            // Thêm mã v để ép trình duyệt không dùng lại file cũ trong bộ nhớ
            const response = await fetch(safePath + '?v=' + new Date().getTime());
            
            if (response.ok) {
                el.innerHTML = await response.text();
                // Nếu nạp Header thành công thì kích hoạt ảnh lá cờ
                if (file.includes('header.html')) {
                    initHeaderLogic();
                }
            } else {
                console.error("Lỗi nạp tệp:", safePath);
            }
        } catch (err) {
            console.error("Không thể kết nối với tệp giao diện:", err);
        }
    }
}

// Hàm hiển thị lá cờ đã lưu
function initHeaderLogic() {
    const savedFlag = localStorage.getItem('ls_flag') || 'https://flagcdn.com/w40/vn.png';
    const flagImg = document.getElementById('current-flag-img');
    if (flagImg) {
        flagImg.src = savedFlag;
    }
}

// Hàm đổi ngôn ngữ và lưu vào bộ nhớ máy
function changeLang(lang, flagUrl) {
    localStorage.setItem('ls_lang', lang);
    localStorage.setItem('ls_flag', flagUrl);
    
    // Đóng menu thả xuống ngay lập tức
    const dropdown = document.getElementById('lang-dropdown');
    if (dropdown) dropdown.classList.add('hidden');
    
    // Tải lại trang để áp dụng
    location.reload();
}

// Đóng menu khi người dùng bấm chuột ra ngoài vùng menu
window.addEventListener('click', function(e) {
    const switcher = document.getElementById('lang-switcher');
    const dropdown = document.getElementById('lang-dropdown');
    if (switcher && !switcher.contains(e.target)) {
        if (dropdown) dropdown.classList.add('hidden');
    }
});

// Chạy hệ thống nạp giao diện khi trang web tải xong
document.addEventListener('DOMContentLoaded', includeHTML);
