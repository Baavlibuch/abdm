const axios = require('axios');
const { readfile, Write2file } = require('../../read_or_write2KeyValues.js');
const { v4: uuidv4 } = require('uuid');


async function paymentShare(req, res) {
	try {
		const M2_AccessToken = readfile('M2_AccessToken');
		const baseUrl = readfile('M2_Sandbox_BaseURL');
		const linkToken = readfile('linkToken');
		const randomUUID = uuidv4();

		const currentTime = new Date();
		const formattedTimestamp = currentTime.toISOString();

		const apiUrl = baseUrl + '/api/hiecm/patient-share/v3/share';

		const { hiuId, hipId, counterId, hprId, latitude, longitude, abhaNumber, abhaAddress, name, gender, address, phoneNumber, upiAddress, orderNo, amount, merchantId, description } = req.body;

		const headers = {
			'REQUEST-ID': randomUUID,
			'TIMESTAMP': formattedTimestamp,
			'Authorization': `Bearer ${M2_AccessToken}`,
			'X-CM-ID': 'sbx',
			'X-HIU-ID': hiuId,
			'X-AUTH-TOKEN': linkToken
		};

		const requestBody = {
			'intent': 'PAYMENT_SHARE',
			'metaData': {
				'hipId': hipId,
				'counterId': counterId,
				'hprId': hprId,
				'latitude': latitude,
				'longitude': longitude
			},
			'profile': {
				'patient': {
					'abhaNumber': abhaNumber,
					'abhaAddress': abhaAddress,
					'name': name,
					'gender': gender,
					'dayOfBirth': '',
					'monthOfBirth': '',
					'yearOfBirth': '',
					'address': {
						'line': address,
						'district': '',
						'state': '',
						'pinCode': ''
					},
					'phoneNumber': phoneNumber
				}
			},
			'paymentBundle': {
				'upiAddress': upiAddress,
				'orderNo': orderNo,
				'amount': amount,
				'merchantId': merchantId,
				'description': description
			}
		};

		const response = await axios.post(apiUrl, requestBody, { headers });
		res.status(200).json(response.json)

	} catch (error) {
		console.error('error in paymentShare.js: ', error.response ? error.response.data : error.message)
		res.status(500).json({ error: error.message });
	}

};

module.exports = paymentShare;

