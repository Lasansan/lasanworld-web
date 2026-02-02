// Hàm nạp các thành phần Header và Footer vào trang
async function loadComponents() {
    try {
        const headerRes = await fetch('/components/header.html');
        const headerHtml = await headerRes.text();
        document.getElementById('header-component').innerHTML = headerHtml;

        const footerRes = await fetch('/components/footer.html');
        const footerHtml = await footerRes.text();
        document.getElementById('footer-component').innerHTML = footerHtml;
        
        console.log("Đã nạp xong Header và Footer!");
    } catch (error) {
        console.error("Lỗi nạp thành phần:", error);
    }
}

// Chạy lệnh nạp khi trang đã sẵn sàng
window.addEventListener('DOMContentLoaded', loadComponents);
