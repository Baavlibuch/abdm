const axios = require('axios');
const { readfile, Write2file } = require('../../../read_or_write2KeyValues.js');
const { v4: uuidv4 } = require('uuid');

<<<<<<< HEAD
async function recordLinkInit(req, res) {
        try {
                const M2_AccessToken = readfile('M2_AccessToken');
                const baseUrl = readfile('M2_Sandbox_BaseURL');
                const transactionId = readfile('transactionId');
                const count = readfile('count');
                const referenceNumber = readfile('referenceNumber');
=======
async function recordLinkInit (req, res) {
	 try{
                const M2_AccessToken = readfile('M2_AccessToken');
                const baseUrl = readfile('M2_Sandbox_BaseURL');
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
                const randomUUID = uuidv4();

                const currentTime = new Date();
                const formattedTimestamp = currentTime.toISOString();

                const apiUrl = baseUrl + '/api/hiecm/user-initiated-linking/v3/link/care-context/init';

<<<<<<< HEAD
                const { abhaAddress, hipId, hiType } = req.body;
=======
                //const { abhaAddress } = req.body;
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6

                const headers = {
                        'REQUEST-ID': randomUUID,
                        'TIMESTAMP': formattedTimestamp,
                        'Authorization': `Bearer ${M2_AccessToken}`,
<<<<<<< HEAD
                        'X-HIU-ID': hipId,
                        'X-CM-ID': 'sbx',
                };

                const requestBody = {
                        'transactionId': transactionId,
                        'abhaAddress': abhaAddress,
                        'patient': [
                                {
                                        'referenceNumber': referenceNumber,
                                        'careContexts': [
                                                {
                                                        'referenceNumber': referenceNumber,
                                                }
                                        ],
                                        'hiType': hiType,
                                        'count': count
                                }
                        ]
                };

                const response = await axios.post(apiUrl, requestBody, { headers });
=======
			'X-HIU-ID': '',
                        'X-CM-ID': 'Sbx',
                      };

                const requestBody = {
                        'transactionId': '',
			'abhaAddress': '',
			'patient': [
				{
					'referenceNumber': '',
					'careContexts':[
						{
							'referenceNumber': '',
						}
					],
					'hiType': '',
					'count': 1
				}
			]
                };

                const response = await axios.post( apiUrl, requestBody, { headers } );
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
                res.status(200).json(response.json)

        } catch (error) {
                console.error('error in recordLinkInit.js: ', error.response ? error.response.data : error.message)
<<<<<<< HEAD
                res.status(500).json({ error: error.message });
=======
                res.status(500).json({error: error.message});
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
        }

};

module.exports = recordLinkInit;
