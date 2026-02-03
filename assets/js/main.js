async function init() {
    try {
        // 1. Nạp Header & Footer
        const [h, f] = await Promise.all([
            fetch('../components/header.html').then(r => r.text()),
            fetch('../components/footer.html').then(r => r.text())
        ]);
        document.getElementById('header-component').innerHTML = h;
        document.getElementById('footer-component').innerHTML = f;

        // 2. Nạp Sản phẩm (Dùng ../ để lùi ra ngoài thư mục pages)
        const res = await fetch('../data/products.json');
        const data = await res.json();
        const container = document.getElementById('product-display');
        
        if (container && data) {
            let html = '';
            data.forEach(m => {
                html += <h2 class="text-2xl font-bold mt-10 mb-4 text-blue-700 underline">${m.market}</h2>;
                m.categories.forEach(c => {
                    html += <h3 class="text-lg font-semibold mb-3">📂 ${c.catName}</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4">;
                    c.items.forEach(i => {
                        html += `<div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <h4 class="font-bold text-slate-900">${i.title}</h4>
                            <p class="text-sm text-slate-500 mt-2 italic">"${i.recommendation}"</p>
                            <a href="${i.link}" target="_blank" class="inline-block mt-3 text-blue-600 font-bold">Xem ngay →</a>
                        </div>`;
                    });
                    html += </div>;
                });
            });
            container.innerHTML = html;
        }
    } catch (e) { 
        console.error("Lỗi rồi Tiểu Ngưu ơi:", e);
        document.getElementById('product-display').innerHTML = "Lỗi kết nối dữ liệu. Tiểu Ngưu kiểm tra lại file JSON nhé!";
    }
}
window.addEventListener('DOMContentLoaded', init);
