const axios = require('axios');
const { readfile, Write2file } = require('../../../read_or_write2KeyValues.js');
const { v4: uuidv4 } = require('uuid');


async function notifyContextUpdate(req, res) {
	 try{
                const M2_AccessToken = readfile('M2_AccessToken');
<<<<<<< HEAD
                const linkToken = readfile('linkToken');
=======
                const linkToken = readfile('X-Link-Token');
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
                const baseUrl = readfile('M2_Sandbox_BaseURL');
                const randomUUID = uuidv4();

                const currentTime = new Date();
                const formattedTimestamp = currentTime.toISOString();

                const apiUrl = baseUrl + '/api/hiecm/hip/v3/link/context/notify';

<<<<<<< HEAD
                const { abhaAddress, hiType, patientReference, careContextReference, hipId } = req.body;
=======
                const { abhaAddress, hiType, patientReference, careContextReference } = req.body;
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6

                const headers = {
                        'REQUEST-ID': randomUUID,
                        'TIMESTAMP': formattedTimestamp,
                        'Authorization': `Bearer ${M2_AccessToken}`,
<<<<<<< HEAD
                        'X-HIP-ID': hipId,
                        //'X-HIP-ID': '01082002',
=======
                        'X-HIP-ID': '01082002',
                        //'X-HIP-ID': 'IN2810014366',
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
                        'X-CM-ID': 'sbx',
                    };

                const requestBody = {
                	'notification': {
				'patient':{
					'id': abhaAddress
				},
				'careContext':{
					'patientReference': patientReference,
					'careContextReference': careContextReference,
				},
				'hiTypes':[
					hiType
				],
				'date': formattedTimestamp,
				'hip': {
<<<<<<< HEAD
					'id': hipId
=======
					'id': '01082002'
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
				}
			}      
		};


                const response = await axios.post( apiUrl, requestBody, { headers } );
                res.status(200).json(response.json)

        } catch (error) {
                console.error('error in notifyContextUpdate.js: ', error.response ? error.response.data : error.message)
                res.status(500).json({error: error.message});
        }

};

module.exports = notifyContextUpdate;
