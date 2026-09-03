/**
 * WhatsApp Yönlendirme ve Çok Dilli Mesaj Formatlama Motoru
 */
const WhatsAppManager = {
    /**
     * Verilen mesaj ile doğrudan WhatsApp bağlantısı oluşturur
     * @param {string} text Mesaj içeriği
     * @returns {string} WhatsApp web/app linki
     */
    createLink: function(text) {
        // Kullanıcının belirttiği resmi numara: 905337829634
        const number = (window.SITE_CONFIG && window.SITE_CONFIG.whatsappNumber) 
            ? window.SITE_CONFIG.whatsappNumber 
            : "905337829634";
        const encoded = encodeURIComponent(text.trim());
        return `https://wa.me/${number}?text=${encoded}`;
    },

    /**
     * WhatsApp sohbetini yeni sekmede açar
     * @param {string} text 
     */
    openChat: function(text) {
        const url = this.createLink(text);
        window.open(url, '_blank', 'noopener,noreferrer');
    },

    /**
     * Geçerli seçili dile göre şablon mesajını getirir
     * @param {string} type Mesaj türü (general, liveStreamDemo, audioRoomDemo, customApp)
     * @returns {string}
     */
    getTemplateMessage: function(type) {
        const lang = window.currentLanguage || "tr";
        const langData = window.I18N_DATA ? window.I18N_DATA[lang] : null;

        if (langData && langData.waTemplates && langData.waTemplates[type]) {
            return langData.waTemplates[type];
        }

        // Varsayılan Türkçe şablon
        return "Merhaba Mobil Yazılım, canlı yayın platformunuz ve mobil yazılım çözümleriniz hakkında fiyat ve demo bilgisi almak istiyorum.";
    },

    /**
     * Sayfadaki tüm data-wa-type etiketli butonları dinler
     */
    initTriggers: function() {
        document.querySelectorAll('[data-wa-type]').forEach(el => {
            // Önceki listener'ları temizlemek yerine tekil listener ekle
            el.onclick = (e) => {
                e.preventDefault();
                const type = el.getAttribute('data-wa-type');
                const customMsg = el.getAttribute('data-wa-msg');

                let message = customMsg ? customMsg : this.getTemplateMessage(type);
                this.openChat(message);
            };
        });
    }
};

window.WhatsAppManager = WhatsAppManager;
