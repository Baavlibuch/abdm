const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

async function HIP_discover(abha) {
    const BASE_URL = 'https://dev.abdm.gov.in/gateway'
    const uuid = uuidv4();
    const timestamp = moment.utc().add(200, 'seconds').format('YYYY-MM-DDTHH:mm:ss.SSSSSS');
    const accessTokenFilePath = path.join(__dirname, '../accessToken.txt');

    try {
        // Read the content of accessToken.txt asynchronously
        const accessToken = await fs.readFile(accessTokenFilePath, 'utf-8');
        const apiUrl = `${BASE_URL}/v0.5/care-contexts/on-discover`;
        const authToken = "Bearer " + accessToken;
        const headers = {
            'Authorization': authToken,
            'Content-Type': 'application/json',
            'X-CM-ID': 'sbx',

        };

        const requestBody = {
            "requestId": uuid,
            "timestamp": timestamp,
            "transactionId": "18d9cee9-3f60-4000-86f4-a7851f57c801",  // use the transaction id
            "patient": {
                "referenceNumber": "dummy_data",
                "display": "string",
                "careContexts": [
                    {
                        "referenceNumber": "string",
                        "display": "string"
                    }
                ],
                "matchedBy": [
                    "MOBILE"
                ]
            },

            "resp": {
                "requestId": "18d9cee9-3f60-4000-86f4-a7851f57c801",
            }

        };
        console.log(apiUrl)
        const response = await axios.post(apiUrl, requestBody, { headers });
        console.log(`Response status for HIP_discover  : ${response.status}`)
    } catch (error) {
        console.error('Error:', error.message);
    }
}

module.exports = { HIP_discover }
