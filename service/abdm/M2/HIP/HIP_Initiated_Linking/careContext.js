const axios = require('axios');
const { readfile, Write2file } = require('../../../read_or_write2KeyValues.js');
const { v4: uuidv4 } = require('uuid');

<<<<<<< HEAD
async function careContext(req, res) {
        try {
                const M2_AccessToken = readfile('M2_AccessToken');
                const linkToken = readfile('linkToken');
=======
async function careContext(req, res){
	try{
                const M2_AccessToken = readfile('M2_AccessToken');
		const linkToken = readfile('X-Link-Token');
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
                const baseUrl = readfile('M2_Sandbox_BaseURL');
                const randomUUID = uuidv4();

                const currentTime = new Date();
                const formattedTimestamp = currentTime.toISOString();

                const apiUrl = baseUrl + '/api/hiecm/hip/v3/link/carecontext';

<<<<<<< HEAD
                const { abhaNumber, abhaAddress, hiType, count, hipId } = req.body;
=======
		const {abhaNumber, abhaAddress, hiType, count } = req.body;
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6

                const headers = {
                        'REQUEST-ID': randomUUID,
                        'TIMESTAMP': formattedTimestamp,
                        'Authorization': `Bearer ${M2_AccessToken}`,
<<<<<<< HEAD
                        'X-HIP-ID': hipId,
                        //'X-HIP-ID': '01082002',
                        'X-CM-ID': 'sbx',
                        'X-LINK-TOKEN': linkToken
                };
=======
                        'X-HIP-ID': '01082002',
                        //'X-HIP-ID': 'IN2810014366',
                        'X-CM-ID': 'sbx',
			'X-LINK-TOKEN':` O1GgiDvEmScKF4muWIdIBOO3CYfc4RvUof7/l5cq+S955BWee4Q/Zv0UOGXzuhgUN6YaN3racriRtNQuVSR18LPO6Z8E/OjnVrXdWxVn8cYRqY1uc8P0sKXCtEuNRxAqatmBuZHbvyT/xzQE2WG3eaBRxzfFkz21/w1fm6XFcCkDlkeL3n+feu2gcNPivRgCb6tb0MvWW/CX3o4bzOztnj8SlPW/MId3YqqFp1sj8/RjBIS5M6NAUqZWLsL2yIRzdlhgJCTaJDrPQiMQ4PVN58XQzM9Q70DxIcPxqVp/ep0WwfXHtvYXSFgDRyUOFz+pMqDTpdIUx6bv8YsMDJlFdyCr0NUWdZwXH2sXkDaTgLIl7WR+Sm33FzNLi5Vdo3Fh0ikYW1+cR7Vy2/6vf9541vTpD8mDH5lvCelsTDg4MLF4Ink/3i8iaYMRsyxFS2a7tXZ24m37i0TdGvGSaLq6PtAx32t1tWsx+qdoEkm02F2E9JSZRcq7nWraWMlC9jO4vTM7/VLwcZEzl7TVbU0nOUb8rUFIxd+4B07U67b6n8pwdxTzXS8PtNXzlDkvmtY+EpzKVJ01P4lf5bwdD9ZoIwMOYgr4gcpvmIpOl8pqEF1642ukPN84mFfT/02tyB7Di7wQO09COvAYB8zjhjXRT9Vfu38XgaEe+1Zd6NbNQes=`
		};
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6

                const requestBody = {
                        'abhaNumber': abhaNumber,
                        'abhaAddress': abhaAddress,
<<<<<<< HEAD
                        'patient': [
                                {
                                        'referenceNumber': randomUUID,
                                        'display': 'Display',
                                        'careContexts': [
                                                {
                                                        'referenceNumber': randomUUID,
                                                        'display': 'display 1'
                                                }
                                        ],
                                        'hiType': 'Prescription',
                                        'count': count
                                }
                        ]
                };


                const response = await axios.post(apiUrl, requestBody, { headers });
=======
                        'patient':[
				{
					'referenceNumber': randomUUID,
					'display':'Display',
					'careContexts':[
						{
							'referenceNumber': randomUUID,
							'display': 'display 1'
						}
					],
					'hiType': 'Prescription',
					'count': 1
				}
			]
                };


                const response = await axios.post( apiUrl, requestBody, { headers } );
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
                res.status(200).json(response.json)

        } catch (error) {
                console.error('error in careContext.js: ', error.response ? error.response.data : error.message)
<<<<<<< HEAD
                res.status(500).json({ error: error.message });
=======
                res.status(500).json({error: error.message});
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
        }

};

module.exports = careContext;
