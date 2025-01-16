const axios = require('axios');
const { readfile, Write2file } = require('../../read_or_write2KeyValues.js');
const { v4: uuidv4 } = require('uuid');


async function recordOnShare(req, res) {
        try{
                const M2_AccessToken = readfile('M2_AccessToken');
                const baseUrl = readfile('M2_Sandbox_BaseURL');
<<<<<<< HEAD
                const requestId = readfile('requestId');
=======
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
                const randomUUID = uuidv4();

                const currentTime = new Date();
                const formattedTimestamp = currentTime.toISOString();

                const apiUrl = baseUrl + '/api/hiecm/patient-share/v3/on-share';

<<<<<<< HEAD
                const { abhaNumber, paymentReference } = req.body;
=======
                //const { consentId, Status, requestId } = req.body;
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6

                const headers = {
                        'REQUEST-ID': randomUUID,
                        'TIMESTAMP': formattedTimestamp,
                        'Authorization': `Bearer ${M2_AccessToken}`,
                        'X-CM-ID': 'sbx',
                      };

                const requestBody = {
                	'acknowledgement': {
<<<<<<< HEAD
				'status': 'SUCCESS',
				'abhaNumber': abhaNumber,
				'healthInformation': {
					'healthInformationReference': paymentReference
				}
			},
			'response': {
				'requestId': requestId
=======
				'status': '',
				'abhaNumber': '',
				'healthInformation': {
					'healthInformationReference': ''
				}
			},
			'response': {
				'requestId': ''
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
			}
		};

                const response = await axios.post( apiUrl, requestBody, { headers } );
                res.status(200).json(response.json)

        } catch (error) {
                console.error('error in recordOnShare.js: ', error.response ? error.response.data : error.message)
                res.status(500).json({error: error.message});
        }

};

module.exports = recordOnShare;

