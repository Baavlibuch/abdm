const axios = require('axios');
const { readfile, Write2file } = require('../../../read_or_write2KeyValues.js');
const { v4: uuidv4 } = require('uuid');

async function smsNotify(req, res) {
try{
                const M2_AccessToken = readfile('M2_AccessToken');
                const linkToken = readfile('X-Link-Token');
                const baseUrl = readfile('M2_Sandbox_BaseURL');
                const randomUUID = uuidv4();

                const currentTime = new Date();
                const formattedTimestamp = currentTime.toISOString();

                const apiUrl = baseUrl + '/api/hiecm/hip/v3/link/patient/links/sms/notify2';

<<<<<<< HEAD
		const { phoneNumber, hipId, hipName } = req.body;
=======
		const { phoneNumber } = req.body;
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6

                const headers = {
                        'REQUEST-ID': randomUUID,
                        'TIMESTAMP': formattedTimestamp,
                        'Authorization': `Bearer ${M2_AccessToken}`,
                        'X-CM-ID': 'sbx',
                       };

                const requestBody = {
                	'requestId': randomUUID,
			'timestamp': formattedTimestamp,
			'notification':{
				'phoneNo':phoneNumber,
				'hip': {
<<<<<<< HEAD
					'id': hipId,
					// 'id': '01082002',
					'name': hipName
					// 'name': 'IDFC Facility'
=======
					'id': '01082002',
					'name': 'IDFC Facility'
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
				}
			}
		};


                const response = await axios.post( apiUrl, requestBody, { headers } );
                res.status(200).json(response.json)

        } catch (error) {
                console.error('error in smsNotify.js: ', error.response ? error.response.data : error.message)
                res.status(500).json({error: error.message});
        }
};

module.exports = smsNotify;
