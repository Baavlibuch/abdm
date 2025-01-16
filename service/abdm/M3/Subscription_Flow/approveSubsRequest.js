const axios = require('axios');
const { readfile, Write2file } = require('../../read_or_write2KeyValues.js');
const { v4: uuidv4 } = require('uuid');


async function approveSubsRequest(req, res) {
<<<<<<< HEAD
	try {
		const M2_AccessToken = readfile('M2_AccessToken');
		const baseUrl = readfile('M2_Sandbox_BaseURL');
		const subscription_requestid = readfile('subscriptionId');
		const randomUUID = uuidv4();

		const currentTime = new Date();
		const formattedTimestamp = currentTime.toISOString();

		const { applicable, refUri, hipId, hipName, periodFrom, periodTo } = req.body;

		const apiUrl = baseUrl + `/api/hiecm/subscription-requests/v3/${subscription_requestid}/approve`;

		const headers = {
			'REQUEST-ID': randomUUID,
			'TIMESTAMP': formattedTimestamp,
			'Authorization': `Bearer ${M2_AccessToken}`,
			'X-CM-ID': 'sbx',
		};

		const requestBody = {
			'isApplicableForAllHIPs': applicable, // true or false
=======
        try{
                const M2_AccessToken = readfile('M2_AccessToken');
                const baseUrl = readfile('M2_Sandbox_BaseURL');
                const randomUUID = uuidv4();

                const currentTime = new Date();
                const formattedTimestamp = currentTime.toISOString();

		const { applicable, refUri, hipId, hipName, periodFrom, periodTo } = req.body;

                const apiUrl = baseUrl + `/api/hiecm/subscription-requests/v3/${subscription_requestid}/approve`;

                const headers = {
                        'REQUEST-ID': randomUUID,
                        'TIMESTAMP': formattedTimestamp,
                        'Authorization': `Bearer ${M2_AccessToken}`,
                        'X-CM-ID': 'sbx',     
		};

		const requestBody = {
			'isApplicableForAllHIPs': applicable,
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
			'includedSources': [
				{
					'hiTypes': [
						'Prescription',
						'DiagnosticReport',
						'OPConsultation',
						'HealthDocumentRecord'
					],
					'purpose': {
						'text': 'Care Management',
						'code': 'CAREMGT',
						'refUri': refUri
					},
					'hip': {
						'id': hipId,
						'name': hipName
					},
					'categories': [
						'DATA',
						'LINK'
					],
					'period': {
						'from': periodFrom,
						'to': periodTo
					}
				}
			]
		};

<<<<<<< HEAD
		const response = await axios.post(apiUrl, requestBody, { headers });
		res.status(200).json(response.json)

	} catch (error) {
		console.error('error in approveSubsRequest.js: ', error.response ? error.response.data : error.message)
		res.status(500).json({ error: error.message });
	}

};

module.exports = approveSubsRequest;
=======
                const response = await axios.post( apiUrl, requestBody, { headers } );
                res.status(200).json(response.json)

        } catch (error) {
                console.error('error in approveSubsRequest.js: ', error.response ? error.response.data : error.message)
                res.status(500).json({error: error.message});
        }

};

module.exports = approveSubsRequest;

>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
