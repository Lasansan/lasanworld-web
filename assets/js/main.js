/**
 * LASANWORLD - MAIN CONTROL SYSTEM
 * Xử lý: Nạp Component, Đa ngôn ngữ và Hiển thị lá cờ ảnh thật
 */

// 1. Hàm nạp các mảnh ghép giao diện (Header, Footer)
async function includeHTML() {
    const elements = document.querySelectorAll('[data-include]');
    for (const el of elements) {
        const file = el.getAttribute('data-include');
        try {
            // Thêm tham số time để tránh trình duyệt lưu file cũ (cache)
            const response = await fetch(file + '?v=' + new Date().getTime());
            if (response.ok) {
                el.innerHTML = await response.text();
                // Nếu là Header thì kích hoạt logic lá cờ
                if (file.includes('header.html')) {
                    initHeaderLogic();
                }
            }
        } catch (err) {
            console.error("Không thể nạp thành phần:", file, err);
        }
    }
}

// 2. Hàm khởi tạo logic cho Header sau khi nạp xong
function initHeaderLogic() {
    const savedFlag = localStorage.getItem('ls_flag') || 'https://flagcdn.com/w40/vn.png';
    const flagImg = document.getElementById('current-flag-img');
    if (flagImg) {
        flagImg.src = savedFlag;
    }
}

// 3. Hàm thay đổi ngôn ngữ (Được gọi từ các nút trong Header)
function changeLang(lang, flagUrl) {
    localStorage.setItem('ls_lang', lang);
    localStorage.setItem('ls_flag', flagUrl);
    
    // Cập nhật ảnh cờ ngay lập tức để người dùng thấy
    const flagImg = document.getElementById('current-flag-img');
    if (flagImg) flagImg.src = flagUrl;
    
    // Đóng menu và tải lại trang để áp dụng thay đổi
    const dropdown = document.getElementById('lang-dropdown');
    if (dropdown) dropdown.classList.add('hidden');
    
    location.reload();
}

// 4. Đóng menu ngôn ngữ khi bấm ra ngoài
window.addEventListener('click', function(e) {
    const switcher = document.getElementById('lang-switcher');
    const dropdown = document.getElementById('lang-dropdown');
    if (switcher && !switcher.contains(e.target)) {
        if (dropdown) dropdown.classList.add('hidden');
    }
});

// 5. Chạy hệ thống khi trang web sẵn sàng
document.addEventListener('DOMContentLoaded', includeHTML);
