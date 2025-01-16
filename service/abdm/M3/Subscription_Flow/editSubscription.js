const axios = require('axios');
const { readfile, Write2file } = require('../../read_or_write2KeyValues.js');
const { v4: uuidv4 } = require('uuid');


async function editSubscription(req, res) {
<<<<<<< HEAD
	try {
		const M2_AccessToken = readfile('M2_AccessToken');
		const baseUrl = readfile('M2_Sandbox_BaseURL');
		const linkToken = readfile('linkToken');
		const approvedSubscriptionId = readfile('approvedSubscriptionId');
		const randomUUID = uuidv4();

		const currentTime = new Date();
		const formattedTimestamp = currentTime.toISOString();

		const { hiuId, refUri, periodFrom, periodTo } = req.body;

		const apiUrl = baseUrl + `/api/hiecm/subscription-requests/v3/patients/${approvedSubscriptionId}`;

		const headers = {
			'REQUEST-ID': randomUUID,
			'TIMESTAMP': formattedTimestamp,
			'Authorization': `Bearer ${M2_AccessToken}`,
			'X-CM-ID': 'sbx',
			'X-AUTH-TOKEN': linkToken
		};

		const requestBody = {
			'hiuId': hiuId,
			'subscriptionEditAndApprovalRequest': {
=======
        try{
                const M2_AccessToken = readfile('M2_AccessToken');
                const baseUrl = readfile('M2_Sandbox_BaseURL');
                const randomUUID = uuidv4();

                const currentTime = new Date();
                const formattedTimestamp = currentTime.toISOString();

                const { hiuId, refUri, periodFrom, periodTo } = req.body;

                const apiUrl = baseUrl + `/api/hiecm/subscription-requests/v3/patients/${approved_subscription_id}`;

                const headers = {
                        'REQUEST-ID': randomUUID,
                        'TIMESTAMP': formattedTimestamp,
                        'Authorization': `Bearer ${M2_AccessToken}`,
                        'X-CM-ID': 'sbx',
                        'X-AUTH-TOKEN': ''
                };

                const requestBody = {
                        'hiuId': hiuId,
			'subscriptionEditAndApprovalRequest':{
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
				'isApplicableForAllHIPs': true,
				'includedSources': [
					{
						'hiTypes': [
							'DiagnosticReport',
							'Prescription',
							'OPConsultation',
							'HealthDocumentRecord'
						],
						'purpose': {
							'text': 'Care Management',
							'code': 'CAREMGT',
							'refUri': refUri
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
				],
				'excludedSources': []
			}
<<<<<<< HEAD
		};

		const response = await axios.post(apiUrl, requestBody, { headers });
		res.status(200).json(response.json)

	} catch (error) {
		console.error('error in editSubscription.js: ', error.response ? error.response.data : error.message)
		res.status(500).json({ error: error.message });
	}
=======
                };

                const response = await axios.post( apiUrl, requestBody, { headers } );
                res.status(200).json(response.json)

        } catch (error) {
                console.error('error in editSubscription.js: ', error.response ? error.response.data : error.message)
                res.status(500).json({error: error.message});
        }
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6

};

module.exports = editSubscription;

