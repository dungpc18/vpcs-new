(function () {
    const DEFAULT_LANG = 'en';
    const LANG_MAP = {
        'US': 'en', 'GB': 'en', 'CA': 'en', 'AU': 'en', 'NZ': 'en', 'IE': 'en', 'SG': 'en',
        'JP': 'ja',
        'KR': 'ko',
        'CN': 'zh-CN',
        'TW': 'zh-TW',
        'HK': 'zh-TW',
        'TH': 'th',
        'VN': 'vi',
        'ID': 'id',
        'MY': 'ms',
        'PH': 'tl',
        'IN': 'hi',
        'PK': 'ur',
        'BD': 'bn',

        'FR': 'fr',
        'DE': 'de',
        'IT': 'it',
        'ES': 'es',
        'PT': 'pt',
        'NL': 'nl',
        'BE': 'fr',
        'CH': 'de',
        'AT': 'de',

        'SE': 'sv',
        'NO': 'no',
        'DK': 'da',
        'FI': 'fi',
        'IS': 'is',

        'PL': 'pl',
        'CZ': 'cs',
        'SK': 'sk',
        'HU': 'hu',
        'RO': 'ro',
        'BG': 'bg',
        'HR': 'hr',
        'SI': 'sl',
        'RS': 'sr',
        'BA': 'bs',
        'ME': 'sr',
        'MK': 'mk',

        'LT': 'lt',
        'LV': 'lv',
        'EE': 'et',

        'GR': 'el',
        'AL': 'sq',

        'SA': 'ar',
        'AE': 'ar',
        'EG': 'ar',
        'IQ': 'ar',
        'MA': 'ar',
        'IL': 'he',
        'IR': 'fa',
        'AF': 'fa',
        'TR': 'tr',

        'MX': 'es',
        'AR': 'es',
        'CO': 'es',
        'CL': 'es',
        'PE': 'es',
        'VE': 'es',
        'UY': 'es',
        'PY': 'es',
        'BO': 'es',
        'EC': 'es',

        'BR': 'pt',
        'ZA': 'en',
        'NG': 'en',
        'KE': 'en',

        'UA': 'uk',
        'RU': 'ru',
    };

    const overlay = document.createElement('div');
    overlay.id = 'translate-overlay';
    overlay.style.cssText = [
        'position:fixed', 'inset:0', 'z-index:999999',
        'background:rgba(255, 255, 255, 0.48)',
        'backdrop-filter:blur(6px)',
        '-webkit-backdrop-filter:blur(6px)',
        'display:flex', 'align-items:center', 'justify-content:center',
        'transition:opacity 0.4s ease',
        'opacity:1',
    ].join(';');

    const spinner = document.createElement('div');
    spinner.style.cssText = [
        'width:36px', 'height:36px',
        'border:3px solid #e0e0e0',
        'border-top-color:#1877f2',
        'border-radius:50%',
        'animation:_tl_spin 0.7s linear infinite',
    ].join(';');

    const style = document.createElement('style');
    style.textContent = '@keyframes _tl_spin{to{transform:rotate(360deg)}}';

    document.head.appendChild(style);
    overlay.appendChild(spinner);
    document.body.appendChild(overlay);

    function removeOverlay() {
        overlay.style.opacity = '0';
        setTimeout(function () {
            overlay.remove();
        }, 420);
    }

    function getGoogtransCookie() {
        const m = /(?:^|;\s*)googtrans=([^;]*)/.exec(document.cookie);
        return m ? decodeURIComponent(m[1]) : null;
    }

    function setGoogtransCookie(lang) {
        const value = '/en/' + (lang || DEFAULT_LANG);
        const hostname = location.hostname;
        document.cookie = 'googtrans=' + value + '; path=/';
        if (hostname && hostname !== 'localhost') {
            document.cookie = 'googtrans=' + value + '; path=/; domain=' + hostname;
        }
    }

    async function getCountryCode() {
        try {
            const res = await fetch('https://ipinfo.io/json?token=5a58a2d85996e3');
            const data = await res.json();
            return (data.country || '').toUpperCase();
        } catch (error_) {
            console.debug('err ipinfo primary', error_);
            try {
                const res2 = await fetch('https://ipinfo.io/json?token=5a58a2d85996e3');
                const data2 = await res2.json();
                return (data2.country_code || '').toUpperCase();
            } catch (error_) {
                console.debug('err ipinfo fallback', error_);
                return '';
            }
        }
    }

    function waitForTranslation(timeout) {
        return new Promise(function (resolve) {
            const html = document.documentElement;
            if (/translated-(ltr|rtl)/.test(html.className)) {
                return resolve();
            }
            const timer = setTimeout(resolve, timeout || 5000);
            const obs = new MutationObserver(function () {
                if (/translated-(ltr|rtl)/.test(html.className)) {
                    clearTimeout(timer);
                    obs.disconnect();
                    resolve();
                }
            });
            obs.observe(html, { attributes: true, attributeFilter: ['class'] });
        });
    }

    async function run() {
        const existing = getGoogtransCookie();
        if (existing && existing !== '/en/' && existing !== '/en/undefined') {
            if (existing !== '/en/en') {
                await waitForTranslation(6000);
            }
            removeOverlay();
            return;
        }

        const countryCode = await getCountryCode();
        let targetLang = countryCode ? LANG_MAP[countryCode] : null;
        if (!targetLang) {
            targetLang = DEFAULT_LANG;
        }

        if (targetLang === DEFAULT_LANG) {
            setGoogtransCookie(DEFAULT_LANG);
            removeOverlay();
            return;
        }

        setGoogtransCookie(targetLang);
        location.reload();
    }

    if (document.body) {
        run();
    } else {
        document.addEventListener('DOMContentLoaded', run);
    }
})();
