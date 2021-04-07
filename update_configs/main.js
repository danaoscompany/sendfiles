const fetch = require('node-fetch');
const fs = require('fs');
setInterval(() => {
	fetch("http://www.vpngate.net/api/iphone/")
		.then(response => response.text())
		.then(async (response) => {
			let configsJSON = response.split("\n");
			let externalConfigs = [];
			for (let i=2; i<configsJSON.length-1; i++) {
				let configJSON = configsJSON[i];
				let configs = configJSON.split(",");
				let ip = configs[1];
				let country = configs[5];
				let countryCode = configs[6];
				let base64Config = configs[14];
				if (ip != undefined && country != undefined && countryCode != undefined) {
					externalConfigs.push({
						'ip': ip,
						'country_code': countryCode.toLowerCase(),
						'country': country,
						'user': 'vpn',
						'pass': 'vpn',
						'config': base64Config
					});
				}
			}
			console.log(JSON.stringify(externalConfigs));
			fs.writeFile("../external_configs.json", JSON.stringify(externalConfigs), function(err) {
			}); 
		});
}, 1*60*60*1000);
