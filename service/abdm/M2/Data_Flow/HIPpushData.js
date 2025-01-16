const axios = require('axios');
const { readfile, Write2file } = require('../../read_or_write2KeyValues.js');
const { v4: uuidv4 } = require('uuid');


async function HIPpushData(req, res) {
        try{
                const M2_AccessToken = readfile('M2_AccessToken');
                const baseUrl = readfile('M2_Sandbox_BaseURL');
                const transactionId = readfile('transactionId');
                const randomUUID = uuidv4();

                const currentTime = new Date();
                const formattedTimestamp = currentTime.toISOString();

                const apiUrl = baseUrl + '/api-hiu/data/notification';

                const { pageNumber, pageCount } = req.body;

                const headers = {
                        'REQUEST-ID': randomUUID,
                        'TIMESTAMP': formattedTimestamp,
                        'Authorization': `Bearer ${M2_AccessToken}`,
                        'X-CM-ID': 'sbx',
                      };

                const requestBody = {
                        'pageNumber': pageNumber,
			'pageCount': pageCount,
			'transactionId': transactionId,
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
					'expiry': '2124-12-09T00:00:00.000Z',
					'parameters': 'Curve25519/32byte random key',
					'keyValue': "BCpsBW37KgfLyjxJK0zHHG26hDjxzK368DEO4PapzFhQM0cghZziKuvJh5/anTnHitVHKMn0Owr1HvcH1fm0DpA=" 
				},
				'nonce': "0ka0stPfqmXWhX+ODC/iOFMO0PXFdRjBdcEGbv55qqc="
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

