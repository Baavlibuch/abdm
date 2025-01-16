const axios = require('axios');
const { readfile, Write2file } = require('../../read_or_write2KeyValues.js');
const { v4: uuidv4 } = require('uuid');


async function requestInvokedByHIU(req, res) {
        try{
                const M2_AccessToken = readfile('M2_AccessToken');
                const baseUrl = readfile('M2_Sandbox_BaseURL');
<<<<<<< HEAD
                const consentId = readfile('consentId');
=======
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
                const randomUUID = uuidv4();

                const currentTime = new Date();
                const formattedTimestamp = currentTime.toISOString();

                const apiUrl = baseUrl + '/api/hiecm/data-flow/v3/health-information/request ';

<<<<<<< HEAD
                const { hiuId, dateRangeFrom, dateRangeTo, callbackBaseUrl, expiryTimestamp } = req.body;
=======
                const { hiuId, consentId, dateRangeFrom, dateRangeTo, callbackUrl, expiryTimestamp, keyValue, nonce } = req.body;
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6

                const headers = {
                        'REQUEST-ID': randomUUID,
                        'TIMESTAMP': formattedTimestamp,
                        'Authorization': `Bearer ${M2_AccessToken}`,
                        'X-HIU-ID': hiuId,
                        'X-CM-ID': 'sbx'
                      };

                const requestBody = {
                	'hiRequest': {
				'consent': {
					'id': consentId
				},
				'dateRange': {
					'from': dateRangeFrom,
					'to': dateRangeTo
				},
<<<<<<< HEAD
				'dataPushUrl': callbackBaseUrl,
=======
				'dataPushUrl': callbackUrl,
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
				'keyMaterial': {
					'cryptoAlg': 'ECDH',
					'curve': 'Curve25519',
					'dhPublicKey': {
						'expiry': expiryTimestamp,
						'parameters': 'Curve25519/32byte random key',
<<<<<<< HEAD
						'keyValue': "BCpsBW37KgfLyjxJK0zHHG26hDjxzK368DEO4PapzFhQM0cghZziKuvJh5/anTnHitVHKMn0Owr1HvcH1fm0D pA=" 
					},
					'nonce': "0ka0stPfqmXWhX+ODC/iOFMO0PXFdRjBdcEGbv55qqc="
=======
						'keyValue': keyValue
					},
					'nonce': nonce
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
				}
			}       
		};

                const response = await axios.post( apiUrl, requestBody, { headers } );
                res.status(200).json(response.json)

        } catch (error) {
                console.error('error in requestInvokedByHIU.js: ', error.response ? error.response.data : error.message)
                res.status(500).json({error: error.message});
        }

};

module.exports = requestInvokedByHIU;

