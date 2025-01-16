const axios = require('axios');
const { readfile, Write2file } = require('../../read_or_write2KeyValues.js');
const { v4: uuidv4 } = require('uuid');


async function consentHIPnotify(req, res) {
        try{
                const M2_AccessToken = readfile('M2_AccessToken');
                const baseUrl = readfile('M2_Sandbox_BaseURL');
<<<<<<< HEAD
                const requestStatus = readfile('requestStatus');
                const consentId = readfile('consentId');
                const requestId = readfile('requestId');
=======
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
                const randomUUID = uuidv4();

                const currentTime = new Date();
                const formattedTimestamp = currentTime.toISOString();

                const apiUrl = baseUrl + '/api/hiecm/consent/v3/request/hip/on-notify';

<<<<<<< HEAD
=======
                const { consentId, Status, requestId } = req.body;

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
				'status' : requestStatus,
				'consentId': consentId,
			},
			'response' : {
				'requestId': requestId
=======
				'status' : 'OK',
				'consentId': '',
			},
			'response' : {
				'requestId': ''
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
			}
                };

                const response = await axios.post( apiUrl, requestBody, { headers } );
                res.status(200).json(response.json)

        } catch (error) {
<<<<<<< HEAD
                console.error('error in consentHIPnotify.js: ', error.response ? error.response.data : error.message)
=======
                console.error('error in censentHIPnotify.js: ', error.response ? error.response.data : error.message)
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
                res.status(500).json({error: error.message});
        }

};

module.exports = consentHIPnotify;

