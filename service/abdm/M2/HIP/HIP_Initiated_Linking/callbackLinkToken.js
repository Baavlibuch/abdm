const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { readfile, Write2file } = require('../../../read_or_write2KeyValues.js');

async function callbackLinkToken(req, res) {
	try{
		const baseUrl = 'https://webhook.site/252b96ed-5b09-4258-b131-de8668db4d1f'
		const apiUrl = '/api/v3/hip/token/on-generate-token';

		const randomUUID = uuidv4();
		
		const currentTime = new Date();
		const formattedTime = currentTime.toISOString();

		const M2_AccessToken = readfile('M2_AccessToken');

		const headers = {
			'REQUEST-ID': randomUUID,
			'TIMESTAMP': formattedTime,
			'X-HIP-ID': '01082002',
			'Authorization': `Bearer ${M2_AccessToken}`
		};

		const requestBody = {
			'abhaAddress': 'gyanangshu@sbx',
			'linkToken': 'LwdwKaYfSo30aFummm5a82yOZ/PSxA21JyJPI49eoT33WLstUeEaYnQ65P59t9JdbzpWK7/jop2djDWp/6/7ozbkSObwyj9Imhg108MkuNkLuEqzZvkbSoJ1EpxUSvkDEVGxSEMuKyUM8FvBtFE1eFDdFo2Oz6SL756h+GLoL/8LOS0UFkKSn82NPWU866urz/mrpTDEi14ODEruWBUgxfWyMp9vuJQUk4AMABggitGtCqZqnu3A4uTgKyOttSmuyhiZNJytzHZG3+2Q7SUGMXXlCvL6/Bp7cRcajrWDyBWv3CQAvuGK9hLV9Z4ng1HXkepLkfZQCGkO/Amg79aJxYLJkyJBdtgHOhhRpArVy+ebE/x8YaGPjUVEG1exwSo0q7QrMVaBvusU1TOomp7qr1lgSmTS3LVtNUsNkL6C56KQJzugcUBJrmvVo/Nbe4H9ZF9Rye3dUiOpZ+H5/pVx3wglwk9ApZ0zMGtY5JBdcUWe21bwKUZUmgGEZv7Pumsk5fqIOcNILVMZm1bzq88+guLviaFLEYc7/3reVgn0tniNR7K/ANOQDi3phfGrs12OL2xbFv8pIo4dWqgSleggqK/jr1qnj3KbewgoEObiM2IeRZZzeGrUFsnvTLq6LKCn4JhSMiBv3lF8e9M4BvLKpMDd9CfKnZs1XHSoNG2z8aY=',
			'response': {
				'requestId': randomUUID
			}
		};

	        const response = await axios.post( apiUrl, requestBody, { headers } );
		//const response = await axios.post(apiUrl, {headers})
		const { linkToken } = req.body;
		//Write2file('X-Link-Token', linkToken);
		res.status(200).json(response.data)
		console.log('callbackLinkToken data: ',response.data)

	} catch (error) {
		console.error('Error in callbackLinkToken', error.response ? error.response.data : error.message )
	}
};

module.exports = callbackLinkToken;

