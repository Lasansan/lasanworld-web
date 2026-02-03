// LaSanWorld - Central Controller
const getPath = (url) => window.location.pathname.includes('/pages/') ? ../${url} : url;

async function initLaSanWorld() {
    try {
        // Load Reusable Components
        const [hRes, fRes] = await Promise.all([
            fetch(getPath('components/header.html')),
            fetch(getPath('components/footer.html'))
        ]);
        
        document.getElementById('header-component').innerHTML = await hRes.text();
        document.getElementById('footer-component').innerHTML = await fRes.text();

        // Check if on Products page to render from JSON
        const pContainer = document.getElementById('product-display');
        if (pContainer) {
            renderProducts(pContainer);
        }
    } catch (error) {
        console.error("LaSanWorld Error:", error);
    }
}

async function renderProducts(container) {
    try {
        const res = await fetch(getPath('data/products.json'));
        const data = await res.json();
        // Logic render sẽ cập nhật chi tiết ở Phần tiếp theo
    } catch (e) {
        container.innerHTML = "Dữ liệu đang được cập nhật...";
    }
}

window.addEventListener('DOMContentLoaded', initLaSanWorld);

