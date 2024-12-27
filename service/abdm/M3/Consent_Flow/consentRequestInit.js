const axios = require('axios');
const { readfile, Write2file } = require('../../read_or_write2KeyValues.js');
const { v4: uuidv4 } = require('uuid');


async function consentRequestInit(req, res) {
        try{
                const M2_AccessToken = readfile('M2_AccessToken');
                const baseUrl = readfile('M2_Sandbox_BaseURL');
                const randomUUID = uuidv4();

                const currentTime = new Date();
                const formattedTimestamp = currentTime.toISOString();

                const apiUrl = baseUrl + '/api/hiecm/consent/v3/request/init';

                const { abhaAddress, requesterName, requesterNumber, hiType, requesterSystem, dateTo, dateFrom, frequencyUnit, dataEraseAt } = req.body;

                const headers = {
                        'REQUEST-ID': randomUUID,
                        'TIMESTAMP': formattedTimestamp,
                        'Authorization': `Bearer ${M2_AccessToken}`,
                        'X-CM-ID': 'sbx',
                      };

                const requestBody = {
                	'consent':{
				'hip': {
					'id': '01082002',
				},
				'hiu': {
					'id': 'IN162946244'
				},
				'hiTypes': [
					'Prescription',
					'DiagnosticReport',
				],
				'patient': {
					'id': abhaAddress
				},
				'purpose': {
					'code': 'CAREMGT',
					'text': 'Care Management',
					'refUri': 'www.abdm.gov.in'
				},
				'requester': {
					'name': requesterName,
					'identifier': {
						'type': 'REGNO',
						'value': requesterNumber,
						'system': requesterSystem
					}
				},
				'permission': {
					'dateRange': {
						'to': dateTo,
						'from': dateFrom
					},
					'frequency': {
						'unit': frequencyUnit,
						'value': 0,
						'repeats': 0
					},
					'accessMode': 'VIEW',
					'dataEraseAt': dataEraseAt
				},
				'careContexts': [
					{
						'patientReference': '',
						'careContextReference': ''
					}
				]
			}     
		};

                const response = await axios.post( apiUrl, requestBody, { headers } );
                res.status(200).json(response.json)

        } catch (error) {
                console.error('error in consentRequestInit.js: ', error.response ? error.response.data : error.message)
                res.status(500).json({error: error.message});
        }

};

module.exports = consentRequestInit;

