const axios = require('axios');
const { readfile, Write2file } = require('../../read_or_write2KeyValues.js');
const { v4: uuidv4 } = require('uuid');


async function healthInfoOnRequest(req, res) {
<<<<<<< HEAD
        try {
                const M2_AccessToken = readfile('M2_AccessToken');
                const baseUrl = readfile('M2_Sandbox_BaseURL');
                const requestStatus = readfile('requestStatus');
=======
        try{
                const M2_AccessToken = readfile('M2_AccessToken');
                const baseUrl = readfile('M2_Sandbox_BaseURL');
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
                const randomUUID = uuidv4();

                const currentTime = new Date();
                const formattedTimestamp = currentTime.toISOString();

                const apiUrl = baseUrl + '/api/hiecm/data-flow/v3/health-information/hip/on-request';

<<<<<<< HEAD
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
                        'hiRequest': {
                                'transactionId': randomUUID,
                                'sessionStatus': requestStatus
                        },
                        'response': {
                                'requestId': randomUUID
                        }
                };

                const response = await axios.post(apiUrl, requestBody, { headers });
=======
                      };

                const requestBody = {
                	'response':{
				'requestId': randomUUID
			}      
		};

                const response = await axios.post( apiUrl, requestBody, { headers } );
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
                res.status(200).json(response.json)

        } catch (error) {
                console.error('error in healthInfoOnRequest.js: ', error.response ? error.response.data : error.message)
<<<<<<< HEAD
                res.status(500).json({ error: error.message });
=======
                res.status(500).json({error: error.message});
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
        }

};

module.exports = healthInfoOnRequest;

