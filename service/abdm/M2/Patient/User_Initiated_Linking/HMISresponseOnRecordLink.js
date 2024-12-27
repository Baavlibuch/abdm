const axios = require('axios');
const { readfile, Write2file } = require('../../../read_or_write2KeyValues.js');
const { v4: uuidv4 } = require('uuid');

async function HMISresponseOnRecordLink (req, res) {
	try{
                const M2_AccessToken = readfile('M2_AccessToken');
                const baseUrl = readfile('M2_Sandbox_BaseURL');
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
                        'transactionId': '',
                        'link' : {
				'referenceNumber': '',
				'authenticationType': 'MEDIATE',
				'meta': {
					'communicationMedium': 'MOBILE',
					'comminucationHint': 'OTP',
					'communicationExpiry': formattedTimestamp
				}
			},
			'response': {
				'requestId': randomUUID
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
