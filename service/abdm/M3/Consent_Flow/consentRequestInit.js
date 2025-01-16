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

<<<<<<< HEAD
                const { abhaAddress, requesterName, requesterNumber, hiType, requesterSystem, dateTo, dateFrom, frequencyUnit, dataEraseAt, hipId, hiuId } = req.body;
=======
                const { abhaAddress, requesterName, requesterNumber, hiType, requesterSystem, dateTo, dateFrom, frequencyUnit, dataEraseAt } = req.body;
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6

                const headers = {
                        'REQUEST-ID': randomUUID,
                        'TIMESTAMP': formattedTimestamp,
                        'Authorization': `Bearer ${M2_AccessToken}`,
                        'X-CM-ID': 'sbx',
                      };

                const requestBody = {
                	'consent':{
				'hip': {
<<<<<<< HEAD
					'id': hipId, //01082002
				},
				'hiu': {
					'id': hiuId, //IN162946244
				},
				'hiTypes': [
					hiType
=======
					'id': '01082002',
				},
				'hiu': {
					'id': 'IN162946244'
				},
				'hiTypes': [
					'Prescription',
					'DiagnosticReport',
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
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
<<<<<<< HEAD
						'patientReference': abhaAddress,
						'careContextReference': 'COCa496bc2f-ca6c-4af5-b973-02e915fd9815'
=======
						'patientReference': '',
						'careContextReference': ''
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
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

