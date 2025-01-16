const axios = require('axios');
const { readfile, Write2file } = require('../../read_or_write2KeyValues.js');
const { v4: uuidv4 } = require('uuid');


async function onNotify(req, res) {
        try{
                const M2_AccessToken = readfile('M2_AccessToken');
                const baseUrl = readfile('M2_Sandbox_BaseURL');
<<<<<<< HEAD
                const subscriptionId = readfile('subscriptionId');
                const requestId = readfile('requestId');
                const subscriptionStatus = readfile('subscriptionStatus');
=======
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
                const randomUUID = uuidv4();

                const currentTime = new Date();
                const formattedTimestamp = currentTime.toISOString();

<<<<<<< HEAD
=======
		const { subscriptionRequestId, requestId } = req.body;

>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
                const apiUrl = baseUrl + `/api/hiecm/subscription-requests/v3/hiu/on-notify`;

                const headers = {
                        'REQUEST-ID': randomUUID,
                        'TIMESTAMP': formattedTimestamp,
                        'Authorization': `Bearer ${M2_AccessToken}`,
                        'X-CM-ID': 'sbx',
                };

                const requestBody = {
                	'acknowledgement': {
<<<<<<< HEAD
				'status': subscriptionStatus, //'OK'
				'subscriptionRequestId': subscriptionId
=======
				'status': 'OK',
				'subscriptionRequestId': subscriptionRequestId
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
			},
			'response': {
				'requestId': requestId
			}
		};

                const response = await axios.post( apiUrl, requestBody, { headers } );
                res.status(200).json(response.json)

        } catch (error) {
                console.error('error in onNotify.js: ', error.response ? error.response.data : error.message)
                res.status(500).json({error: error.message});
        }

};

module.exports = onNotify;

