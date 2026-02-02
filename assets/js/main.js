// 1. Hàm nạp Header và Footer
async function loadComponents() {
    try {
        const headerRes = await fetch('../components/header.html');
        const headerHtml = await headerRes.text();
        document.getElementById('header-component').innerHTML = headerHtml;

        const footerRes = await fetch('../components/footer.html');
        const footerHtml = await footerRes.text();
        document.getElementById('footer-component').innerHTML = footerHtml;
        console.log("Đã nạp xong Header và Footer!");
    } catch (error) {
        console.error("Lỗi nạp thành phần:", error);
    }
}

// 2. Hàm nạp Dữ liệu Sản phẩm từ JSON
async function renderProducts() {
    const container = document.getElementById('product-display');
    if (!container) return;

    try {
        const response = await fetch('../data/products.json');
        const data = await response.json();
        
        let html = '';
        data.forEach(market => {
            html += <h2 class="text-2xl font-bold mt-10 mb-4 text-blue-700 underline">${market.market}</h2>;
            market.categories.forEach(cat => {
                html += <h3 class="text-lg font-semibold text-slate-700 mb-3 ml-2">📂 ${cat.catName}</h3>;
                html += <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">;
                cat.items.forEach(item => {
                    html += `
                        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 transition">
                            <h4 class="font-bold text-slate-900">${item.title}</h4>
                            <p class="text-sm text-slate-500 mt-2 italic">" ${item.recommendation} "</p>
                            <a href="${item.link}" target="_blank" class="inline-block mt-3 text-xs font-bold text-blue-600">Khám phá ngay →</a>
                        </div>
                    `;
                });
                html += </div>;
            });
        });
        container.innerHTML = html;
        console.log("Đã nạp xong Sản phẩm!");
    } catch (e) {
        console.log("Chưa có dữ liệu sản phẩm hoặc lỗi JSON");
    }
}

// 3. Thiết lập ngôn ngữ
function setLanguage(lang) {
    localStorage.setItem('ls-lang', lang);
    location.reload();
}

// 4. Chạy tất cả khi trang web tải xong
window.addEventListener('DOMContentLoaded', () => {
    loadComponents();
    renderProducts();
});
