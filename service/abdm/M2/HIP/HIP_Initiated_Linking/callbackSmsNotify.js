const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { readfile, Write2file } = require('../../../read_or_write2KeyValues.js');

//IMPLEMENTAION IS NOT DONE YET FOR THIS FILE

async function callbackSmsNotify(req, res) {
	 try{i
                const baseUrl = 'https://webhook.site/252b96ed-5b09-4258-b131-de8668db4d1f'
                const apiUrl = baseUrl + '/api/v3/patients/sms/on-notify';

                const randomUUID = uuidv4();

                const currentTime = new Date();
                const formattedTime = currentTime.toISOString();

                const M2_AccessToken = readfile('M2_AccessToken');

                const headers = {
                        'REQUEST-ID': randomUUID,
                        'TIMESTAMP': formattedTime,
                        'X-HIP-ID': '01082002',
                        'Authorization': `Bearer ${M2_AccessToken}`
                };

               
                const requestBody = {
                        'abhaAddress': 'gyanangshu_2000@sbx',
                        'status':statusMessage,
                        'response': {
                                'requestId': randomUUID
                        }
                };

                const response = await axios.post( apiUrl, requestBody, { headers } );

                res.status(200).json(response.json)

        } catch (error) {
                console.error('Error in callbackLinkToken', error.response ? error.response.data : error.message )
        }
	
};

module.exports = callbackSmsNotify;
