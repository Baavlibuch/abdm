const axios = require('axios');
const { readfile, Write2file } = require('../../read_or_write2KeyValues.js');
const { v4: uuidv4 } = require('uuid');


async function profileOnShare(req, res) {
<<<<<<< HEAD
        try {
                const M2_AccessToken = readfile('M2_AccessToken');
                const baseUrl = readfile('M2_Sandbox_BaseURL');
                const requestId = readfile('requestId');
=======
        try{
                const M2_AccessToken = readfile('M2_AccessToken');
                const baseUrl = readfile('M2_Sandbox_BaseURL');
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
                const randomUUID = uuidv4();

                const currentTime = new Date();
                const formattedTimestamp = currentTime.toISOString();

                const apiUrl = baseUrl + '/api/hiecm/patient-share/v3/on-share';

<<<<<<< HEAD
                const { abhaAddress, counterId, tokenNumber, patientYearOfBirth } = req.body;
=======
                //const { consentId, Status, requestId } = req.body;
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6

                const headers = {
                        'REQUEST-ID': randomUUID,
                        'TIMESTAMP': formattedTimestamp,
                        'Authorization': `Bearer ${M2_AccessToken}`,
                        'X-CM-ID': 'sbx',
<<<<<<< HEAD
                };

                const requestBody = {
                        'acknowledgement': {
                                'abhaAddress': abhaAddress,
                                'status': 'SUCCESS',
                                'profile': {
                                        'context': counterId,
                                        'tokenNumber': tokenNumber,
                                        'expiry': patientYearOfBirth
                                }
                        },
                        'response': {
                                'requestId': requestId
                        }
                };

                const response = await axios.post(apiUrl, requestBody, { headers });
=======
                      };

                const requestBody = {
              		'acknowledgement': {
				'abhaAddress': '',
				'status': '',
				'profile' : {
					'context': '',
					'tokenNumber': '',
					'expiry': ''
				}
			},
			'response': {
				'requestId': ''
			}
		};

                const response = await axios.post( apiUrl, requestBody, { headers } );
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
                res.status(200).json(response.json)

        } catch (error) {
                console.error('error in profileOnShare.js: ', error.response ? error.response.data : error.message)
<<<<<<< HEAD
                res.status(500).json({ error: error.message });
=======
                res.status(500).json({error: error.message});
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
        }

};

module.exports = profileOnShare;

