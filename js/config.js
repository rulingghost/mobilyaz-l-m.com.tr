/**
 * Mobil Yazılım - Yapılandırma Dosyası
 * Tüm firma bilgileri ve WhatsApp iletişim numarası
 */
const SITE_CONFIG = {
    companyName: "Mobil Yazılım",
    companyTagline: "Yeni Nesil Canlı Yayın, Ses Odaları ve Mobil Yazılım Çözümleri",
    phone: "+90 533 782 96 34",
    whatsappNumber: "905337829634", // Kullanıcının belirttiği resmi numara
    email: "info@mobilyazilim.com",
    address: "İstanbul Teknokent / Maslak & Levent Ofisleri",
    workingHours: "7/24 WhatsApp & Teknik Destek Hattı",
    
    // Sosyal Medya
    social: {
        instagram: "https://instagram.com",
        linkedin: "https://linkedin.com",
        github: "https://github.com",
        youtube: "https://youtube.com"
    },

    deliveryDays: 10
};

// Global erişim
window.SITE_CONFIG = SITE_CONFIG;
