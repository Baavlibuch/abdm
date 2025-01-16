const fs = require('fs').promises; // Use fs.promises for asynchronous file reading
const path = require('path');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

// acknowledgement to notification of consent

async function HIP_consent_notification() {
    const uuid = uuidv4();
    const BASE_URL = 'https://dev.abdm.gov.in/gateway'
    const timestamp = moment.utc().add(200, 'seconds').format('YYYY-MM-DDTHH:mm:ss.SSSSSS');

    // Construct the relative path to accessToken.txt
    const accessTokenFilePath = path.join(__dirname, '../accessToken.txt');

    try {
        // Read the content of accessToken.txt asynchronously
        const accessToken = await fs.readFile(accessTokenFilePath, 'utf-8');
        const apiUrl = `${BASE_URL}/v0.5/consents/hip/on-notify`;
        const authToken = "Bearer " + accessToken;
        const headers = {
            'Authorization': authToken,
            'Content-Type': 'application/json',
            'X-CM-ID': 'sbx',
            'User-Agent': 'axios/0.21.4',
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
        };

        const requestBody = {
            "requestId": uuid,
            "timestamp": timestamp,
            "acknowledgement": {
                "status": "OK",
                "consentId": "5f7a535d-a3fd-416b-b069-c97d021fbacd"
            },
            "error": {
                "code": 1000,
                "message": "string"
            },
            "resp": {
                "requestId": uuid,
            }
        }

        // Use async/await with axios.post
	    console.log(apiUrl)
        const response = await axios.post(apiUrl, requestBody, { headers });
        console.log(`Response status for HIP_consent_notification : ${response.status}`)
        console.log('Response : ', response.data);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

module.exports = { HIP_consent_notification };

