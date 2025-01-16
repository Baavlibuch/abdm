const axios = require('axios');
<<<<<<< HEAD
const { readfile, Write2file } = require('../../../read_or_write2KeyValues');
=======
const { readfile, Write2file } = require('../../../read_or_write2KeyValues.js');
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
const { v4: uuidv4 } = require('uuid');

async function HMISresponseOnRecordLink (req, res) {
	try{
                const M2_AccessToken = readfile('M2_AccessToken');
                const baseUrl = readfile('M2_Sandbox_BaseURL');
<<<<<<< HEAD
                const transactionId = readfile('transactionId');
                const requestId = readfile('requestId');
                const referenceNumber = readfile('referenceNumber');
=======
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
                const randomUUID = uuidv4();

                const currentTime = new Date();
                const formattedTimestamp = currentTime.toISOString();

                const apiUrl = baseUrl + '/api/hiecm/user-initiated-linking/v3/link/care-context/on-init';

               // const { abhaAddress } = req.body;

                const headers = {
                        'REQUEST-ID': randomUUID,
                        'TIMESTAMP': formattedTimestamp,
                        'Authorization': `Bearer ${M2_AccessToken}`,
                        'X-CM-ID': 'sbx',
                      };

                const requestBody = {
<<<<<<< HEAD
                        'transactionId': transactionId,
                        'link' : {
				'referenceNumber': referenceNumber,
=======
                        'transactionId': '',
                        'link' : {
				'referenceNumber': '',
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
				'authenticationType': 'MEDIATE',
				'meta': {
					'communicationMedium': 'MOBILE',
					'comminucationHint': 'OTP',
					'communicationExpiry': formattedTimestamp
				}
			},
			'response': {
<<<<<<< HEAD
				'requestId': requestId
=======
				'requestId': randomUUID
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
			}
                       };

                const response = await axios.post( apiUrl, requestBody, { headers } );
                res.status(200).json(response.json)

        } catch (error) {
                console.error('error in HMISresponseOnRecordLink.js: ', error.response ? error.response.data : error.message)
                res.status(500).json({error: error.message});
        }
	
};

module.exports = HMISresponseOnRecordLink;
