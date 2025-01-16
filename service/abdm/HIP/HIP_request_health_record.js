const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

async function HIP_data_transfer_notification(transactionId) {
    const BASE_URL = 'https://dev.abdm.gov.in/gateway'
    const uuid = uuidv4();
    const timestamp = moment.utc().add(200, 'seconds').format('YYYY-MM-DDTHH:mm:ss.SSSSSS');
    const accessTokenFilePath = path.join(__dirname, '../accessToken.txt');

    try {
        // Read the content of accessToken.txt asynchronously
        const accessToken = await fs.readFile(accessTokenFilePath, 'utf-8');
        const apiUrl = `${BASE_URL}/v0.5/health-information/notify`;
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
            "notification": {
                "consentId": "a1s2c932-2f70-3ds3-a3b5-2sfd46b12a18d",
                "transactionId": "a1s2c932-2f70-3ds3-a3b5-2sfd46b12a18d",
                "doneAt": "1970-01-01T00:00:00.000Z",
                "notifier": {
                    "type": "HIU",
                    "id": "tmh"
                },
                "statusNotification": {
                    "sessionStatus": "TRANSFERRED",
                    "hipId": "max",
                    "statusResponses": [
                        {
                            "careContextReference": "string",
                            "hiStatus": "OK",
                            "description": "string"
                        }
                    ]
                }
            }
        };

        const response = await axios.post(apiUrl, requestBody, { headers });
        console.log(response)
        console.log(`Response status for Data Transfer Notification  : ${response.status}`)
    } catch (error) {
        console.error('Error:', error.message);
    }
}

module.exports = { HIP_data_transfer_notification }
