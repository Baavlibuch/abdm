const axios = require('axios');
const { readfile, Write2file } = require('../../../read_or_write2KeyValues.js');
const { v4: uuidv4 } = require('uuid');

<<<<<<< HEAD
async function HMISresponse(req, res) {
	try {
		const M2_AccessToken = readfile('M2_AccessToken');
		const baseUrl = readfile('M2_Sandbox_BaseURL');
		const transactionId = readfile('transactionId');
		const requestId = readfile('generateToken_requestId')
		const randomUUID = uuidv4();

		const currentTime = new Date();
		const formattedTimestamp = currentTime.toISOString();

		const apiUrl = baseUrl + '/api/hiecm/user-initiated-linking/v3/patient/care-context/on-discover';

		const { hiType } = req.body;

		const headers = {
			'REQUEST-ID': randomUUID,
			'TIMESTAMP': formattedTimestamp,
			'Authorization': `Bearer ${M2_AccessToken}`,
			'X-CM-ID': 'sbx',
		};

		const requestBody = {
			'transactionId': transactionId,
			'patient': [
				{
					'referenceNumber': randomUUID,
					'display': '',
					'careContexts': [
						{
							'referenceNumber': randomUUID,
							'display': '',
						}
					],
					'hiType': hiType,
					'count': 1
				}
			],
			'matchedBy': [
				'MR'
			],
			'response': {
				'requestId': requestId
			}
		};

		const response = await axios.post(apiUrl, requestBody, { headers });
		res.status(200).json(response.json)

	} catch (error) {
		console.error('error in HMISresponse.js: ', error.response ? error.response.data : error.message)
		res.status(500).json({ error: error.message });
	}
=======

async function HMISresponse(req, res) {
	try{
                const M2_AccessToken = readfile('M2_AccessToken');
                const baseUrl = readfile('M2_Sandbox_BaseURL');
                const randomUUID = uuidv4();

                const currentTime = new Date();
                const formattedTimestamp = currentTime.toISOString();

                const apiUrl = baseUrl + '/api/hiecm/user-initiated-linking/v3/patient/care-context/on-discover';

               // const { abhaAddress } = req.body;

                const headers = {
                        'REQUEST-ID': randomUUID,
                        'TIMESTAMP': formattedTimestamp,
                        'Authorization': `Bearer ${M2_AccessToken}`,
                        'X-CM-ID': 'sbx',
                      };

                const requestBody = {
                	'transactionId': '',
			'patient': [
				{
					'referenceNumber': '',
					'display': '',
					'careContexts': [
						{
							'referenceNumber':'',
							'display': '',
						}
					],
					'hiType': '',
					'count': 1
				}
			],
			'matchedBy':[
				'MR'
			],
			'response': {
				'requestId': randomUUID
			}
                };

                const response = await axios.post( apiUrl, requestBody, { headers } );
                res.status(200).json(response.json)

        } catch (error) {
                console.error('error in HMISresponse.js: ', error.response ? error.response.data : error.message)
                res.status(500).json({error: error.message});
        }
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6

};

module.exports = HMISresponse;
