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
function updateLanguageDisplay() {
    const extendedNav = document.getElementById('extended-languages');
    if (!extendedNav) return;

    // Kiểm tra nếu đang ở trang Game
    const isGamePage = window.location.pathname.includes('game.html');

    if (isGamePage) {
        // Nếu là trang Game, hiện tất cả các nước có trong cấu hình
        extendedNav.classList.remove('hidden');
        extendedNav.innerHTML = ''; // Xóa trắng để nạp lại

        Object.keys(countryConfig).forEach(code => {
            if (code !== 'US') { // Không lặp lại cờ Mỹ đã có sẵn
                extendedNav.innerHTML += `
                    <button class="w-6 h-6 rounded-full overflow-hidden border border-gray-200" title="${countryConfig[code].name}">
                        <img src="https://flagcdn.com/${code.toLowerCase()}.svg" alt="${countryConfig[code].name}">
                    </button>`;
            }
        });
    } else {
        // Nếu không phải trang Game, chỉ hiện những nước được bật "ON"
        let hasOnContent = false;
        extendedNav.innerHTML = '';

        Object.keys(countryConfig).forEach(code => {
            if (code !== 'US' && countryConfig[code].status === 'ON') {
                hasOnContent = true;
                extendedNav.innerHTML += `
                    <button class="w-6 h-6 rounded-full overflow-hidden border border-gray-200" title="${countryConfig[code].name}">
                        <img src="https://flagcdn.com/${code.toLowerCase()}.svg" alt="${countryConfig[code].name}">
                    </button>`;
            }
        });

        if (hasOnContent) {
            extendedNav.classList.remove('hidden');
        } else {
            extendedNav.classList.add('hidden');
        }
    }
}

// Chạy hàm ngay khi trang web tải xong
window.addEventListener('DOMContentLoaded', updateLanguageDisplay);
