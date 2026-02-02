// Hàm này giúp máy tính tự tìm đường dẫn đúng dù bạn ở trang chủ hay trang con
const getPath = (url) => window.location.pathname.includes('/pages/') ? ../${url} : url;

async function initSite() {
    try {
        // Nạp Header và Footer
        const [hRes, fRes] = await Promise.all([
            fetch(getPath('components/header.html')),
            fetch(getPath('components/footer.html'))
        ]);
        document.getElementById('header-component').innerHTML = await hRes.text();
        document.getElementById('footer-component').innerHTML = await fRes.text();

        // Nạp dữ liệu sản phẩm
        const pContainer = document.getElementById('product-display');
        if (pContainer) {
            const pRes = await fetch(getPath('data/products.json'));
            const pData = await pRes.json();
            let html = '';
            pData.forEach(m => {
                html += <h2 class="text-2xl font-bold mt-10 mb-4 text-blue-700 underline">${m.market}</h2>;
                m.categories.forEach(c => {
                    html += <h3 class="text-lg font-semibold text-slate-700 mb-3 ml-2">📂 ${c.catName}</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4">;
                    c.items.forEach(i => {
                        html += `<div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 transition">
                            <h4 class="font-bold text-slate-900">${i.title}</h4>
                            <p class="text-sm text-slate-500 mt-2 italic">"${i.recommendation}"</p>
                            <a href="${i.link}" target="_blank" class="inline-block mt-3 text-xs font-bold text-blue-600">Khám phá ngay →</a>
                        </div>`;
                    });
                    html += </div>;
                });
            });
            pContainer.innerHTML = html;
        }
    } catch (e) { console.error("Lỗi nạp dữ liệu:", e); }
}
window.addEventListener('DOMContentLoaded', initSite);
