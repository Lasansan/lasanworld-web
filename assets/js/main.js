/**
 * LASANWORLD - MAIN ENGINE
 * Bộ não vận hành: Tự động nạp Header/Footer và Dữ liệu Sản phẩm
 */

// Hàm xử lý đường dẫn linh hoạt (dùng được cho cả trang chủ và trang trong thư mục pages)
const getPath = (url) => window.location.pathname.includes('/pages/') ? ../${url} : url;

async function initLaSanWorld() {
    try {
        // 1. NẠP CÁC THÀNH PHẦN GIAO DIỆN CHUNG
        const [hRes, fRes] = await Promise.all([
            fetch(getPath('components/header.html')),
            fetch(getPath('components/footer.html'))
        ]);
        
        if (hRes.ok) document.getElementById('header-component').innerHTML = await hRes.text();
        if (fRes.ok) document.getElementById('footer-component').innerHTML = await fRes.text();

        // 2. NẠP DỮ LIỆU SẢN PHẨM/MẸO VẶT (Chỉ chạy khi đang ở trang products.html)
        const pContainer = document.getElementById('product-display');
        if (pContainer) {
            const pRes = await fetch(getPath('data/products.json'));
            const pData = await pRes.json();
            
            let html = '';
            pData.forEach(market => {
                // Tạo tiêu đề nhóm lớn (Mẹo vặt & Tiện ích) với màu xanh #1264AB của Tiểu Ngưu
                html += `
                <div class="border-t border-slate-200 pt-10">
                    <h2 class="text-2xl font-black mb-8 text-[#1264AB] uppercase tracking-widest italic">${market.market}</h2>`;
                
                market.categories.forEach(cat => {
                    html += <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">;
                    
                    cat.items.forEach(item => {
                        // Tạo từng thẻ (card) mẹo vặt/sản phẩm
                        html += `
                        <div class="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 group">
                            <div class="text-xs font-bold text-slate-400 mb-3 uppercase tracking-widest">${cat.catName}</div>
                            <h4 class="text-2xl font-black text-slate-900 mb-4 group-hover:text-[#1264AB] transition">${item.title}</h4>
                            <p class="text-slate-500 leading-relaxed mb-8 italic text-lg">"${item.recommendation}"</p>
                            <a href="${item.link}" target="_blank" class="inline-flex items-center font-black text-[#1264AB] hover:gap-2 transition-all">
                                KHÁM PHÁ NGAY <span class="ml-2">→</span>
                            </a>
                        </div>`;
                    });
                    
                    html += </div>;
                });
                html += </div>;
            });
            
            // Đưa toàn bộ nội dung đã dựng vào trang
            pContainer.innerHTML = html;
        }
    } catch (e) {
        console.error("Lỗi vận hành hệ thống LaSanWorld:", e);
    }
}

// Chạy hệ thống khi trang đã sẵn sàng
window.addEventListener('DOMContentLoaded', initLaSanWorld);
