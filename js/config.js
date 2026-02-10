// Cấu hình danh sách 12 quốc gia Amazon ưu tiên
const countryConfig = {
    "US": { name: "United States", domain: "amazon.com", status: "ON" }, // Mặc định ON
    "DE": { name: "Germany", domain: "amazon.de", status: "OFF" },
    "UK": { name: "United Kingdom", domain: "amazon.co.uk", status: "OFF" },
    "CA": { name: "Canada", domain: "amazon.ca", status: "OFF" },
    "JP": { name: "Japan", domain: "amazon.co.jp", status: "OFF" },
    "FR": { name: "France", domain: "amazon.fr", status: "OFF" },
    "AU": { name: "Australia", domain: "amazon.com.au", status: "OFF" },
    "IT": { name: "Italy", domain: "amazon.it", status: "OFF" },
    "ES": { name: "Spain", domain: "amazon.es", status: "OFF" },
    "SG": { name: "Singapore", domain: "amazon.sg", status: "OFF" },
    "AE": { name: "UAE", domain: "amazon.ae", status: "OFF" },
    "SA": { name: "Saudi Arabia", domain: "amazon.sa", status: "OFF" }
};

// Hệ thống tự động điều hướng link Amazon (Geo-Redirect)
function redirectAmazonLinks(userCountryCode) {
    const links = document.querySelectorAll('a[href*="amazon.com"]');
    links.forEach(link => {
        if (countryConfig[userCountryCode]) {
            const newDomain = countryConfig[userCountryCode].domain;
            link.href = link.href.replace("amazon.com", newDomain); // Đổi đuôi link theo quốc gia khách hàng
        }
    });
}
// Hàm điều khiển hiển thị ngôn ngữ dựa trên trang đang xem
// 1. Hàm đóng/mở menu khi ấn vào lá cờ
function toggleGlobalLang() {
    const dropdown = document.getElementById('lang-dropdown-global');
    if (dropdown) {
        dropdown.classList.toggle('hidden');
    }
}

// 2. Hàm nạp danh sách cờ tự động dựa trên từng trang
function loadLangList() {
    const dropdown = document.getElementById('lang-dropdown-global');
    if (!dropdown) return;

    // Cách nhận diện trang Game mới: kiểm tra cả tiêu đề và đường dẫn
    const isGamePage = window.location.href.toLowerCase().includes('game') || 
                       document.title.toLowerCase().includes('game');
    
    dropdown.innerHTML = ''; 

    Object.keys(countryConfig).forEach(code => {
        // CHỈ cho phép hiện danh sách ở trang Game. 
        // Ở các trang khác, chỉ hiện nếu Tiểu Ngưu chủ động bật status: "ON"
        if (isGamePage || countryConfig[code].status === "ON") {
            dropdown.innerHTML += `
                <button class="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-50 transition-colors">
                    <img src="https://flagcdn.com/${code.toLowerCase()}.svg" width="20" class="rounded-sm shadow-sm">
                    <span class="text-sm font-medium text-slate-700">${countryConfig[code].name}</span>
                </button>`;
        }
    });
}

// 3. Lệnh thực thi khi trang web sẵn sàng
window.addEventListener('DOMContentLoaded', loadLangList);

// 4. Tự động đóng menu nếu người dùng bấm trượt ra ngoài
window.addEventListener('click', function(e) {
    const switcher = document.getElementById('lang-switcher');
    const dropdown = document.getElementById('lang-dropdown-global');
    if (switcher && !switcher.contains(e.target)) {
        dropdown.classList.add('hidden');
    }
});
