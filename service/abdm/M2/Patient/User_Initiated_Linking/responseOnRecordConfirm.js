const axios = require('axios');
const { readfile, Write2file } = require('../../../read_or_write2KeyValues.js');
const { v4: uuidv4 } = require('uuid');

<<<<<<< HEAD
async function responseOnRecordConfirm(req, res) {
        try {
                const M2_AccessToken = readfile('M2_AccessToken');
                const baseUrl = readfile('M2_Sandbox_BaseURL');
                const referenceNumber = readfile('referenceNumber');
                const count = readfile('count');
                const requestId = readfile('requestId');
=======
async function responseOnRecordConfirm (req, res) {
        try{
                const M2_AccessToken = readfile('M2_AccessToken');
                const baseUrl = readfile('M2_Sandbox_BaseURL');
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
                const randomUUID = uuidv4();

                const currentTime = new Date();
                const formattedTimestamp = currentTime.toISOString();

                const apiUrl = baseUrl + '/api/hiecm/user-initiated-linking/v3/link/care-context/on-confirm';

                const { hiType } = req.body;

                const headers = {
                        'REQUEST-ID': randomUUID,
                        'TIMESTAMP': formattedTimestamp,
                        'Authorization': `Bearer ${M2_AccessToken}`,
                        'X-CM-ID': 'sbx'
<<<<<<< HEAD
                };

                const requestBody = {
                        'patient': [
                                {
                                        'referenceNumber': referenceNumber,
                                        'display': '',
                                        'careContexts': [
                                                {
                                                        'referenceNumber': referenceNumber,
                                                        'display': ''
                                                }
                                        ],
                                        'hiType': hiType,
                                        'count': count
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
                        'patient': [
				{
					'referenceNumber': '',
					'display' : '',
					'careContexts' : [
						{
							'referenceNumber': '',
							'display':''
						}
					],
					'hiType': hiType,
					'count': 1
				}
			],
			'response': {
				'requestId': randomUUID
			}
                };

                const response = await axios.post( apiUrl, requestBody, { headers } );
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
                res.status(200).json(response.json)

        } catch (error) {
                console.error('error in responseOnRecordConfirm.js: ', error.response ? error.response.data : error.message)
<<<<<<< HEAD
                res.status(500).json({ error: error.message });
=======
                res.status(500).json({error: error.message});
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
        }

};

module.exports = responseOnRecordConfirm;

