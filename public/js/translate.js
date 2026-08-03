(function () {
    const DEFAULT_LANG = 'en';
    const LANG_MAP = {
        AF: 'fa',
AX: 'sv',
AL: 'sq',
DZ: 'ar',
AS: 'en',
AD: 'ca',
AO: 'pt',
AI: 'en',
AQ: 'en',
AG: 'en',
AR: 'es',
AM: 'hy',
AW: 'nl',
AU: 'en',
AT: 'de',
AZ: 'az',
BS: 'en',
BH: 'ar',
BD: 'bn',
BB: 'en',
BY: 'be',
BE: 'nl',
BZ: 'en',
BJ: 'fr',
BM: 'en',
BT: 'dz',
BO: 'es',
BQ: 'nl',
BA: 'bs',
BW: 'en',
BR: 'pt',
IO: 'en',
BN: 'ms',
BG: 'bg',
BF: 'fr',
BI: 'fr',
KH: 'km',
CM: 'fr',
CA: 'en',
CV: 'pt',
KY: 'en',
CF: 'fr',
TD: 'fr',
CL: 'es',
CN: 'zh',
CX: 'en',
CC: 'en',
CO: 'es',
KM: 'ar',
CG: 'fr',
CD: 'fr',
CR: 'es',
CI: 'fr',
HR: 'hr',
CU: 'es',
CW: 'nl',
CY: 'el',
CZ: 'cs',
DK: 'da',
DJ: 'fr',
DM: 'en',
DO: 'es',
EC: 'es',
EG: 'ar',
SV: 'es',
GQ: 'es',
ER: 'ti',
EE: 'et',
SZ: 'en',
ET: 'am',
FK: 'en',
FO: 'fo',
FJ: 'en',
FI: 'fi',
FR: 'fr',
GF: 'fr',
PF: 'fr',
TF: 'fr',
GA: 'fr',
GM: 'en',
GE: 'ka',
DE: 'de',
GH: 'en',
GI: 'en',
GR: 'el',
GL: 'kl',
GD: 'en',
GP: 'fr',
GU: 'en',
GT: 'es',
GG: 'en',
GN: 'fr',
GW: 'pt',
GY: 'en',
HT: 'fr',
HM: 'en',
VA: 'it',
HN: 'es',
HK: 'zh',
HU: 'hu',
IS: 'is',
IN: 'hi',
ID: 'id',
IR: 'fa',
IQ: 'ar',
IE: 'en',
IM: 'en',
IL: 'he',
IT: 'it',
JM: 'en',
JP: 'ja',
JE: 'en',
JO: 'ar',
KZ: 'kk',
KE: 'en',
KI: 'en',
KP: 'ko',
KR: 'ko',
KW: 'ar',
KG: 'ky',
LA: 'lo',
LV: 'lv',
LB: 'ar',
LS: 'en',
LR: 'en',
LY: 'ar',
LI: 'de',
LT: 'lt',
LU: 'lb',
MO: 'zh',
MG: 'fr',
MW: 'en',
MY: 'ms',
MV: 'dv',
ML: 'fr',
MT: 'mt',
MH: 'en',
MQ: 'fr',
MR: 'ar',
MU: 'en',
YT: 'fr',
MX: 'es',
FM: 'en',
MD: 'ro',
MC: 'fr',
MN: 'mn',
ME: 'sr',
MS: 'en',
MA: 'ar',
MZ: 'pt',
MM: 'my',
NA: 'en',
NR: 'en',
NP: 'ne',
NL: 'nl',
NC: 'fr',
NZ: 'en',
NI: 'es',
NE: 'fr',
NG: 'en',
NU: 'en',
NF: 'en',
MK: 'mk',
MP: 'en',
NO: 'no',
OM: 'ar',
PK: 'ur',
PW: 'en',
PS: 'ar',
PA: 'es',
PG: 'en',
PY: 'es',
PE: 'es',
PH: 'en',
PN: 'en',
PL: 'pl',
PT: 'pt',
PR: 'es',
QA: 'ar',
RE: 'fr',
RO: 'ro',
RU: 'ru',
RW: 'rw',
BL: 'fr',
SH: 'en',
KN: 'en',
LC: 'en',
MF: 'fr',
PM: 'fr',
VC: 'en',
WS: 'sm',
SM: 'it',
ST: 'pt',
SA: 'ar',
SN: 'fr',
RS: 'sr',
SC: 'fr',
SL: 'en',
SG: 'en',
SX: 'nl',
SK: 'sk',
SI: 'sl',
SB: 'en',
SO: 'so',
ZA: 'en',
GS: 'en',
SS: 'en',
ES: 'es',
LK: 'si',
SD: 'ar',
SR: 'nl',
SJ: 'no',
SE: 'sv',
CH: 'de',
SY: 'ar',
TW: 'zh',
TJ: 'tg',
TZ: 'sw',
TH: 'th',
TL: 'pt',
TG: 'fr',
TK: 'en',
TO: 'en',
TT: 'en',
TN: 'ar',
TR: 'tr',
TM: 'tk',
TC: 'en',
TV: 'en',
UG: 'en',
UA: 'uk',
AE: 'ar',
GB: 'en',
US: 'en',
UM: 'en',
UY: 'es',
UZ: 'uz',
VU: 'en',
VE: 'es',
VN: 'vi',
VG: 'en',
VI: 'en',
WF: 'fr',
EH: 'ar',
YE: 'ar',
ZM: 'en',
ZW: 'en'
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
