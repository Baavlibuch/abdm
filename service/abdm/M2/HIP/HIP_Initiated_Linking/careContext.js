const axios = require('axios');
const { readfile, Write2file } = require('../../../read_or_write2KeyValues.js');
const { v4: uuidv4 } = require('uuid');

async function careContext(req, res) {
        try {
                const M2_AccessToken = readfile('M2_AccessToken');
                const linkToken = readfile('linkToken');
                const baseUrl = readfile('M2_Sandbox_BaseURL');
                const randomUUID = uuidv4();

                const currentTime = new Date();
                const formattedTimestamp = currentTime.toISOString();

                const apiUrl = baseUrl + '/api/hiecm/hip/v3/link/carecontext';

                const { abhaNumber, abhaAddress, hiType, count, hipId } = req.body;

                const headers = {
                        'REQUEST-ID': randomUUID,
                        'TIMESTAMP': formattedTimestamp,
                        'Authorization': `Bearer ${M2_AccessToken}`,
                        'X-HIP-ID': hipId,
                        //'X-HIP-ID': '01082002',
                        'X-CM-ID': 'sbx',
                        'X-LINK-TOKEN': linkToken
                };

                const requestBody = {
                        'abhaNumber': abhaNumber,
                        'abhaAddress': abhaAddress,
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
                res.status(200).json(response.json)

        } catch (error) {
                console.error('error in careContext.js: ', error.response ? error.response.data : error.message)
                res.status(500).json({ error: error.message });
        }

};

module.exports = careContext;
