# StreamForge Mobile - Mobil Yazılım & Canlı Yayın Platformu Web Sitesi

Bu proje; anahtar teslim **Canlı Yayın (Video Streaming)** ve **Ses Yayın (Audio Rooms/Clubhouse tarzı)** platformları kuran ve **özel mobil uygulamalar** geliştiren mobil yazılım ajansı için hazırlanmış ultra modern, lüks koyu temalı (Dark Cyber Tech) ve yüksek dönüşüm odaklı web sitesidir.

---

## 🚀 Öne Çıkan Özellikler

1. **Ağırlıklı Canlı Yayın & Ses Yayını Çözümleri:**
   - Bigo Live, TikTok ve Clubhouse kalitesinde özellikler: Ultra düşük gecikme (<500ms WebRTC/RTMP), sanal hediyeleşme, elmas cüzdanı, PK canlı savaşlar, çoklu koltuklu ses odaları ve gelişmiş SaaS web admin yönetim paneli.
2. **10 Günde Anahtar Teslim Süreç Çizelgesi:**
   - Markalama, sunucu altyapısı, ödeme entegrasyonu ve stres testlerinin 10 günde tamamlanışını gösteren 4 adımlı zaman çizelgesi.
   - Google Play ve Apple App Store mağaza onay süreçlerine ilişkin şeffaf bilgilendirme kutusu.
3. **iOS & Android Canlı Demo Talebi:**
   - iPhone kullanıcıları için Apple TestFlight, Android kullanıcıları için doğrudan kurulabilir APK demo test akışı.
4. **İnteraktif Fiyat & Demo Simülatörü:**
   - Ziyaretçilerin çözüm türünü, anlık kullanıcı kapasitesini ve demo platformunu seçip tek tıkla doğrudan WhatsApp'a önceden biçimlendirilmiş teklif mesajıyla geçebilmesi.
5. **Özel Mobil Uygulama Geliştirme (Custom Projects):**
   - E-ticaret, fintech, sosyal ağ veya özel fikirler için Flutter, React Native, iOS Swift ve Android Kotlin çözümleri.
6. **WhatsApp Odaklı Dönüşüm Mimarisi:**
   - Sayfanın her noktasında doğrudan WhatsApp'a yönlendiren hızlı teklif butonları ve sağ altta pulsing animasyonlu sabit WhatsApp canlı destek butonu.

---

## 📁 Proje Dizin Yapısı

```
Mobil Yazılım/
├── index.html                  # Ana sayfa (Semantik, SEO uyumlu)
├── README.md                   # Proje dokümantasyonu
├── css/
│   ├── style.css               # Tasarım sistemi, renkler, tipografi ve bileşen stilleri
│   └── responsive.css          # Mobil, tablet ve masaüstü tam uyumluluk
├── js/
│   ├── config.js               # Firma adı, telefon, WhatsApp numarası ve mesaj şablonları
│   ├── whatsapp.js             # WhatsApp bağlantı oluşturucu ve dinamik yönlendirme
│   └── app.js                  # İnteraktif akordeon, simülatör, mobil menü ve animasyonlar
└── assets/
    └── images/
        ├── app_showcase.jpg    # Canlı yayın & ses odası mobil UI görseli
        ├── admin_dashboard.jpg # Web admin paneli ve finans raporları görseli
        └── custom_apps.jpg     # Özel mobil uygulama örnekleri görseli
```

---

## ⚙️ Yapılandırma ve WhatsApp Numarasını Değiştirme

Firma adını veya WhatsApp numarasını güncellemek için yalnızca [`js/config.js`](file:///c:/Users/dell/Desktop/Mobil%20Yaz%C4%B1l%C4%B1m/js/config.js) dosyasını düzenlemeniz yeterlidir:

```javascript
const SITE_CONFIG = {
    companyName: "StreamForge Mobile",
    phone: "+90 555 123 45 67",
    whatsappNumber: "905551234567", // Ülke kodu ile boşluksuz yazın
    email: "info@streamforgemobile.com",
    // ...
};
```

---

## 🌐 Canlı Önizleme / Çalıştırma

Herhangi bir statik sunucu ile veya doğrudan `index.html` dosyasına çift tıklayarak tarayıcınızda açabilirsiniz:

```bash
# Python ile çalıştırmak için:
python -m http.server 8000

# veya npx serve ile:
npx serve .
```
Tarayıcınızda `http://localhost:8000` adresine gidin.
