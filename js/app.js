/**
 * Mobil Yazılım - Ana Uygulama Mantığı & Çok Dilli Yönetim (i18n)
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Çoklu Dil Sistemini Başlat (Varsayılan: tr veya kaydedilmiş dil)
    initI18n();

    // 2. WhatsApp Yöneticisini Başlat (+905337829634)
    if (window.WhatsAppManager) {
        window.WhatsAppManager.initTriggers();
    }

    // 3. Yapılandırma Bilgilerini Sayfaya Aktar
    populateConfigData();

    // 4. Mobil Navigasyon Menüsü
    initMobileNav();

    // 5. Header Kaydırma Efekti
    initStickyHeader();

    // 6. Canlı Yayın Maketi İçin Hediye Animasyonları
    initMockupAnimations();

    // 7. SSS Akordeon
    initFaqAccordion();

    // 8. İnteraktif Fiyat & Demo Simülatörü
    initInteractiveCalculator();

    // 9. Sayfa İçi Yumuşak Kaydırma
    initSmoothScroll();
});

/**
 * Çok Dilli (i18n) Motoru
 */
function initI18n() {
    const savedLang = localStorage.getItem('mobil_yazilim_lang') || 'tr';
    const langBtn = document.getElementById('lang-btn');
    const langDropdown = document.getElementById('lang-dropdown-menu');
    const langItems = document.querySelectorAll('.lang-dropdown-item');

    // Başlangıç dilini ayarla
    setLanguage(savedLang);

    // Dil seçici açılır menü kontrolü
    if (langBtn && langDropdown) {
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langDropdown.classList.toggle('show');
        });

        // Dışarı tıklandığında menüyü kapat
        document.addEventListener('click', () => {
            langDropdown.classList.remove('show');
        });
    }

    // Dil seçimi tıklandığında
    langItems.forEach(item => {
        item.addEventListener('click', () => {
            const selectedLang = item.getAttribute('data-lang');
            setLanguage(selectedLang);
            if (langDropdown) langDropdown.classList.remove('show');
        });
    });
}

/**
 * Sayfa dilini değiştirir ve arayüzü günceller
 * @param {string} lang 'tr', 'en', 'zh', 'ar'
 */
function setLanguage(lang) {
    if (!window.I18N_DATA || !window.I18N_DATA[lang]) {
        lang = 'tr';
    }

    window.currentLanguage = lang;
    localStorage.setItem('mobil_yazilim_lang', lang);

    const langData = window.I18N_DATA[lang];

    // 1. HTML lang ve dir (RTL/LTR) özniteliklerini güncelle
    document.documentElement.lang = lang;
    document.documentElement.dir = langData.dir || 'ltr';

    // 2. Dil Seçici butonunu güncelle
    const currentFlag = document.getElementById('lang-current-flag');
    const currentName = document.getElementById('lang-current-name');
    if (currentFlag) currentFlag.textContent = langData.flag;
    if (currentName) currentName.textContent = lang.toUpperCase();

    // Aktif menü öğesini işaretle
    document.querySelectorAll('.lang-dropdown-item').forEach(el => {
        if (el.getAttribute('data-lang') === lang) {
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    });

    // 3. data-i18n etiketli tüm metinleri güncelle
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const keyPath = el.getAttribute('data-i18n');
        const translatedValue = getNestedTranslation(langData, keyPath);
        if (translatedValue !== undefined) {
            // Eğer HTML içeriği (strong vs.) içeriyorsa innerHTML, aksi halde textContent
            if (translatedValue.includes('<') && translatedValue.includes('>')) {
                el.innerHTML = translatedValue;
            } else {
                el.textContent = translatedValue;
            }
        }
    });

    // 4. data-i18n-attr etiketli öznitelikleri güncelle (placeholder, title vs.)
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
        const attrSpec = el.getAttribute('data-i18n-attr'); // örn: "placeholder:calc.inputPlaceholder"
        const [attrName, keyPath] = attrSpec.split(':');
        const translatedValue = getNestedTranslation(langData, keyPath);
        if (translatedValue !== undefined) {
            el.setAttribute(attrName, translatedValue);
        }
    });

    // 5. WhatsApp tetikleyicilerini yeni dile göre hazırla
    if (window.WhatsAppManager) {
        window.WhatsAppManager.initTriggers();
    }
}

/**
 * "hero.title" gibi noktalı yolları veri nesnesinden okur
 */
function getNestedTranslation(obj, path) {
    return path.split('.').reduce((prev, curr) => (prev && prev[curr] !== undefined ? prev[curr] : undefined), obj);
}

/**
 * config.js değerlerini sayfaya dök
 */
function populateConfigData() {
    if (!window.SITE_CONFIG) return;
    const config = window.SITE_CONFIG;

    document.querySelectorAll('[data-config="companyName"]').forEach(el => el.textContent = config.companyName);
    document.querySelectorAll('[data-config="phone"]').forEach(el => {
        el.textContent = config.phone;
        if (el.tagName === 'A') el.href = `tel:${config.phone.replace(/\s+/g, '')}`;
    });
    document.querySelectorAll('[data-config="email"]').forEach(el => {
        el.textContent = config.email;
        if (el.tagName === 'A') el.href = `mailto:${config.email}`;
    });
    document.querySelectorAll('[data-config="address"]').forEach(el => el.textContent = config.address);
}

/**
 * Mobil Menü Aç/Kapat
 */
function initMobileNav() {
    const hamburger = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    const navOverlay = document.getElementById('nav-overlay');

    if (!hamburger || !navMenu) return;

    function toggleMenu() {
        const isOpen = navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isOpen);
        if (navOverlay) navOverlay.classList.toggle('active', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    function closeMenu() {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        if (navOverlay) navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', toggleMenu);
    if (navOverlay) navOverlay.addEventListener('click', closeMenu);

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

/**
 * Header Kaydırma Efekti
 */
function initStickyHeader() {
    const header = document.getElementById('main-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * Canlı Yayın Maketi İçin Hediye ve Kalp Animasyonu
 */
function initMockupAnimations() {
    const heartsContainer = document.querySelector('.floating-hearts-container');
    if (!heartsContainer) return;

    const icons = ['❤️', '🔥', '💎', '🚀', '⭐', '👑', '🎉'];

    setInterval(() => {
        if (document.hidden) return;
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = icons[Math.floor(Math.random() * icons.length)];
        heart.style.left = `${Math.floor(Math.random() * 60) + 20}%`;
        heart.style.animationDuration = `${Math.random() * 1.5 + 2}s`;
        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 3000);
    }, 1400);
}

/**
 * SSS Akordeon Mantığı
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-card');

    faqItems.forEach(card => {
        const header = card.querySelector('.faq-question');
        if (!header) return;

        header.addEventListener('click', () => {
            const isOpen = card.classList.contains('active');
            
            // Diğerlerini kapat
            faqItems.forEach(c => {
                if (c !== card) {
                    c.classList.remove('active');
                    const body = c.querySelector('.faq-answer');
                    if (body) body.style.maxHeight = null;
                }
            });

            // Seçileni aç/kapat
            if (!isOpen) {
                card.classList.add('active');
                const answer = card.querySelector('.faq-answer');
                if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                card.classList.remove('active');
                const answer = card.querySelector('.faq-answer');
                if (answer) answer.style.maxHeight = null;
            }
        });
    });
}

/**
 * İnteraktif Fiyat & Demo Simülatörü
 */
function initInteractiveCalculator() {
    const sendBtn = document.getElementById('calc-whatsapp-btn');
    const calcAudience = document.getElementById('calc-audience');

    if (!sendBtn) return;

    function getSelectedRadio(name) {
        const selected = document.querySelector(`input[name="${name}"]:checked`);
        return selected ? selected.value : "";
    }

    sendBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const platform = getSelectedRadio('calc-solution') || "Canlı Video Yayın Platformu";
        const audience = calcAudience ? calcAudience.value : "Orta Ölçek";
        const demoType = getSelectedRadio('calc-demo-type') || "iOS & Android";

        const lang = window.currentLanguage || 'tr';
        let msg = "";

        if (lang === 'en') {
            msg = `Hello Mobil Yazılım,\n` +
                  `I am contacting via the calculator on your website:\n` +
                  `🔹 Selected Solution: ${platform}\n` +
                  `🔹 Target Scale: ${audience}\n` +
                  `🔹 Requested Demo: ${demoType}\n` +
                  `Could you provide a detailed price proposal and technical presentation?`;
        } else if (lang === 'zh') {
            msg = `您好 Mobil Yazılım，\n` +
                  `我正在通过贵公司官网的方案计算器进行咨询：\n` +
                  `🔹 所选解决方案：${platform}\n` +
                  `🔹 预估用户规模：${audience}\n` +
                  `🔹 申请演示版本：${demoType}\n` +
                  `请问能否提供详细的交钥匙报价与技术方案资料？`;
        } else if (lang === 'ar') {
            msg = `مرحباً شركة Mobil Yazılım،\n` +
                  `أتواصل معكم عبر حاسبة الأسعار في موقعكم الإلكتروني:\n` +
                  `🔹 الحل المطلوب: ${platform}\n` +
                  `🔹 السعة المستهدفة: ${audience}\n` +
                  `🔹 نوع النسخة التجريبية: ${demoType}\n` +
                  `هل يمكنكم تزويدي بعرض سعر مفصل والعرض الفني؟`;
        } else {
            msg = `Merhaba Mobil Yazılım,\n` +
                  `Web sitenizdeki hesaplayıcı üzerinden ulaşıyorum:\n` +
                  `🔹 İlgilendiğim Çözüm: ${platform}\n` +
                  `🔹 Hedef Kitle/Kapasite: ${audience}\n` +
                  `🔹 Talep Ettiğim Demo: ${demoType}\n` +
                  `Fiyat teklifi ve detaylı teknik sunum alabilir miyim?`;
        }

        window.WhatsAppManager.openChat(msg);
    });
}

/**
 * Sayfa İçi Yumuşak Kaydırma
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offset = 75;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}
