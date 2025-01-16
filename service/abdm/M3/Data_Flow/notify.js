const axios = require('axios');
const { readfile, Write2file } = require('../../read_or_write2KeyValues.js');
const { v4: uuidv4 } = require('uuid');


async function notify(req, res) {
<<<<<<< HEAD
        try {
                const M2_AccessToken = readfile('M2_AccessToken');
                const baseUrl = readfile('M2_Sandbox_BaseURL');
                const consentId = readfile('consentId');
                const transactionId = readfile('transactionId');
=======
        try{
                const M2_AccessToken = readfile('M2_AccessToken');
                const baseUrl = readfile('M2_Sandbox_BaseURL');
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
                const randomUUID = uuidv4();

                const currentTime = new Date();
                const formattedTimestamp = currentTime.toISOString();

                const apiUrl = baseUrl + '/api/hiecm/data-flow/v3/health-information/notify';

<<<<<<< HEAD
                const { hiuId, hipId, sessionStatus, careContextRef, hiStatus } = req.body;
=======
                const { consentId, transactionId, doneAt, hiuId, hipId, careContextRef, hiStatus,  } = req.body;
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6

                const headers = {
                        'REQUEST-ID': randomUUID,
                        'TIMESTAMP': formattedTimestamp,
                        'Authorization': `Bearer ${M2_AccessToken}`,
                        'X-CM-ID': 'sbx'
<<<<<<< HEAD
                };

                const requestBody = {
                        'notification': {
                                'consentId': consentId,
                                'transactionId': transactionId,
                                'doneAt': formattedTimestamp,
                                'notifier': {
                                        'type': 'HIU',
                                        'id': hiuId,
                                },
                                'statusNotification': {
                                        'sessionStatus': sessionStatus, //'TRANSFERRED'
                                        'hipId': hipId,
                                        'statusResponses': [
                                                {
                                                        'careContextReference': careContextRef,
                                                        'hiStatus': hiStatus,
                                                        'description': 'Care Management'
                                                }
                                        ]
                                }
                        }
                };

                const response = await axios.post(apiUrl, requestBody, { headers });
=======
                      };

                const requestBody = {
                	'notification': {
				'consentId': consentId,
				'transactionId': transactionId,
				'doneAt': doneAt,
				'notifier': {
					'type': 'HIU',
					'id': hiuId,
				},
				'statusNotification': {
					'sessionStatus': 'TRANSFERRED',
					'hipId': hipId,
					'statusResponses': [
						{
							'careContextReference': careContextRef,
							'hiStatus': hiStatus,
							'description': 'Care Management'
						}
					]
				}
			}   
		};

                const response = await axios.post( apiUrl, requestBody, { headers } );
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
                res.status(200).json(response.json)

        } catch (error) {
                console.error('error in notify.js: ', error.response ? error.response.data : error.message)
<<<<<<< HEAD
                res.status(500).json({ error: error.message });
=======
                res.status(500).json({error: error.message});
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
        }

};

module.exports = notify;

