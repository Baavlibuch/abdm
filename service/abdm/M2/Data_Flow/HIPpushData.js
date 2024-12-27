const axios = require('axios');
const { readfile, Write2file } = require('../../read_or_write2KeyValues.js');
const { v4: uuidv4 } = require('uuid');


async function HIPpushData(req, res) {
        try{
                const M2_AccessToken = readfile('M2_AccessToken');
                const baseUrl = readfile('M2_Sandbox_BaseURL');
                const randomUUID = uuidv4();

                const currentTime = new Date();
                const formattedTimestamp = currentTime.toISOString();

                const apiUrl = baseUrl + '/api-hiu/data/notification';

                //const { consentId, Status, requestId } = req.body;

                const headers = {
                        'REQUEST-ID': randomUUID,
                        'TIMESTAMP': formattedTimestamp,
                        'Authorization': `Bearer ${M2_AccessToken}`,
                        'X-CM-ID': 'sbx',
                      };

                const requestBody = {
                        'pageNumber': '',
			'pageCount': '',
			'transactionId': '',
			'entries': [
				{
					'content': '',
					'media': 'application/fhir+json',
					'checksum': '',
					'careContextReference': ''
				}
			],
			'keyMaterial': {
				'cryptoAlg': 'ECDH',
				'curve': 'Curve25519',
				'dhPublicKey': {
					'expiry': '',
					'parameters': 'Curve25519/32byte random key',
					'keyValue': ''
				},
				'nonce': ''
			}
                };

                const response = await axios.post( apiUrl, requestBody, { headers } );
                res.status(200).json(response.json)

        } catch (error) {
                console.error('error in HIPpushData.js: ', error.response ? error.response.data : error.message)
                res.status(500).json({error: error.message});
        }

};

module.exports = HIPpushData;

