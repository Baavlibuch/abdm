const axios = require('axios');
const { readfile, Write2file } = require('../../read_or_write2KeyValues.js');
const { v4: uuidv4 } = require('uuid');


async function consentOnNotify(req, res) {
<<<<<<< HEAD
        try {
                const M2_AccessToken = readfile('M2_AccessToken');
                const baseUrl = readfile('M2_Sandbox_BaseURL');
                const status = readfile('consentStatus');
                const consentRequestId = readfile('consentRequestId');
                const requestId = readfile('requestId');
=======
        try{
                const M2_AccessToken = readfile('M2_AccessToken');
                const baseUrl = readfile('M2_Sandbox_BaseURL');
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
                const randomUUID = uuidv4();

                const currentTime = new Date();
                const formattedTimestamp = currentTime.toISOString();

                const apiUrl = baseUrl + '/api/hiecm/consent/v3/request/hiu/on-notify';

<<<<<<< HEAD
=======
                const { notifyStatus, consentId, requestId  } = req.body;

>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
                const headers = {
                        'REQUEST-ID': randomUUID,
                        'TIMESTAMP': formattedTimestamp,
                        'Authorization': `Bearer ${M2_AccessToken}`,
                        'X-CM-ID': 'sbx',
<<<<<<< HEAD
                };

                const requestBody = {
                        'acknowledgement': [
                                {
                                        'status': status,
                                        'consentId': consentRequestId
                                }
                        ],
                        'response': {
                                'requestId': requestId
                        }
                };

                const response = await axios.post(apiUrl, requestBody, { headers });
=======
                      };

                const requestBody = {
                     'acknowledgement': [
			{
				'status': notifyStatus,
				'consentId': consentId
			}
		     ],
			'response': {
				'requestId': requestId
			}
		};

                const response = await axios.post( apiUrl, requestBody, { headers } );
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
                res.status(200).json(response.json)

        } catch (error) {
                console.error('error in consentOnNotify.js: ', error.response ? error.response.data : error.message)
<<<<<<< HEAD
                res.status(500).json({ error: error.message });
=======
                res.status(500).json({error: error.message});
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
        }

};

module.exports = consentOnNotify;

