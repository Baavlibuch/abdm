const axios = require('axios');
const { readfile, Write2file } = require('../../read_or_write2KeyValues.js');
const { v4: uuidv4 } = require('uuid');


async function profileOnShare(req, res) {
        try {
                const M2_AccessToken = readfile('M2_AccessToken');
                const baseUrl = readfile('M2_Sandbox_BaseURL');
                const requestId = readfile('requestId');
                const randomUUID = uuidv4();

                const currentTime = new Date();
                const formattedTimestamp = currentTime.toISOString();

                const apiUrl = baseUrl + '/api/hiecm/patient-share/v3/on-share';

                const { abhaAddress, counterId, tokenNumber, patientYearOfBirth } = req.body;

                const headers = {
                        'REQUEST-ID': randomUUID,
                        'TIMESTAMP': formattedTimestamp,
                        'Authorization': `Bearer ${M2_AccessToken}`,
                        'X-CM-ID': 'sbx',
                };

                const requestBody = {
                        'acknowledgement': {
                                'abhaAddress': abhaAddress,
                                'status': 'SUCCESS',
                                'profile': {
                                        'context': counterId,
                                        'tokenNumber': tokenNumber,
                                        'expiry': patientYearOfBirth
                                }
                        },
                        'response': {
                                'requestId': requestId
                        }
                };

                const response = await axios.post(apiUrl, requestBody, { headers });
                res.status(200).json(response.json)

        } catch (error) {
                console.error('error in profileOnShare.js: ', error.response ? error.response.data : error.message)
                res.status(500).json({ error: error.message });
        }

};

module.exports = profileOnShare;

