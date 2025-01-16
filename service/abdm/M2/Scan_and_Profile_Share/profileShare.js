const axios = require('axios');
const { readfile, Write2file } = require('../../read_or_write2KeyValues.js');
const { v4: uuidv4 } = require('uuid');


async function profileShare(req, res) {
<<<<<<< HEAD
	try {
		const M2_AccessToken = readfile('M2_AccessToken');
		const baseUrl = readfile('M2_Sandbox_BaseURL');
		const linkToken = readfile('linkToken');
		const randomUUID = uuidv4();

		const currentTime = new Date();
		const formattedTimestamp = currentTime.toISOString();

		const apiUrl = baseUrl + '/api/hiecm/patient-share/v3/share';

		const { hiuId, hipId, hprId, context, latitude, longitude, abhaNumber, abhaAddress, name, gender, dayOfBirth, monthOfBirth, yearOfBirth, address, district, state, pinCode, phoneNumber } = req.body;

		const headers = {
			'REQUEST-ID': randomUUID,
			'TIMESTAMP': formattedTimestamp,
			'Authorization': `Bearer ${M2_AccessToken}`,
			'X-CM-ID': 'sbx',
			'X-HIU-ID': hiuId,
			'X-AUTH-TOKEN': linkToken
		};

		const requestBody = {
			'intent': 'PROFILE_SHARE',
			'metaData': {
				'hipId': hipId,
				'context': context,
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
					'dayOfBirth': dayOfBirth,
					'monthOfBirth': monthOfBirth,
					'yearOfBirth': yearOfBirth,
					'address': {
						'line': address,
						'district': district,
						'state': state,
						'pinCode': pinCode
					},
					'phoneNumber': phoneNumber
=======
        try{
                const M2_AccessToken = readfile('M2_AccessToken');
                const baseUrl = readfile('M2_Sandbox_BaseURL');
                const randomUUID = uuidv4();

                const currentTime = new Date();
                const formattedTimestamp = currentTime.toISOString();

                const apiUrl = baseUrl + '/api/hiecm/patient-share/v3/share';

                //const { consentId, Status, requestId } = req.body;

                const headers = {
                        'REQUEST-ID': randomUUID,
                        'TIMESTAMP': formattedTimestamp,
                        'Authorization': `Bearer ${M2_AccessToken}`,
                        'X-CM-ID': 'sbx',
			'X-HIU-ID':'',
			'X-AUTH-TOKEN': ''
                      };

                const requestBody = {
               		'intent': 'PROFILE_SHARE',
			'metaData': {
				'hipId': '',
				'context': '',
				'hprId': '',
				'latitude': '',
				'longitude': ''
			},
			'profile': {
				'patient': {
					'abhaNumber': '',
					'abhaAddress': '',
					'name': '',
					'gender': '',
					'dayOfBirth': '',
					'monthOfBirth': '',
					'yearOfBirth':'',
					'address': {
						'line': '',
						'district': '',
						'state': '',
						'pinCode' : ''
					},
					'phoneNumber': ''
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
				}
			}
		};

<<<<<<< HEAD
		const response = await axios.post(apiUrl, requestBody, { headers });
		res.status(200).json(response.json)

	} catch (error) {
		console.error('error in profileShare.js: ', error.response ? error.response.data : error.message)
		res.status(500).json({ error: error.message });
	}
=======
                const response = await axios.post( apiUrl, requestBody, { headers } );
                res.status(200).json(response.json)

        } catch (error) {
                console.error('error in profileShare.js: ', error.response ? error.response.data : error.message)
                res.status(500).json({error: error.message});
        }
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6

};

module.exports = profileShare;

