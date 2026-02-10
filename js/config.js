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
