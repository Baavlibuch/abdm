const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const { readfile, Write2file } = require('../../../read_or_write2KeyValues.js')


async function healthInfo_onNotify() {
    const uuid = uuidv4();
    const timestamp = moment.utc().add(200, 'seconds').format('YYYY-MM-DDTHH:mm:ss.SSSSSS');

    try {
        // Read the content of Key_values.txt synchronously
        const accessToken = readfile('HIP_sessionToken')
        // const accessToken = await fs.readFile(accessTokenFilePath, 'utf-8');
        const apiUrl = 'https://dev.abdm.gov.in/gateway/v0.5/health-information/notify';
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
                "consentId": readfile("consentId"),
                "transactionId": readfile("transactionId"),
                "doneAt": timestamp,
                "notifier": {
                    "type": "HIP",
                    "id": "baavlibuch"
                },
                "statusNotification": {
                    "sessionStatus": "TRANSFERRED",
                    "hipId": "baavlibuch",
                    "statusResponses": [
                        {
                            "careContextReference": "Test",
                            "hiStatus": "OK",
                            "description": "Test Sample"
                        }
                    ]
                }
            }
        };

        const responses = await axios.post(apiUrl, requestBody, { headers });
        console.log(`Response status for healthInfo_onNotify  : ${responses.status}`)
        console.log(`Response Text for healthInfo_onNotify : ${responses.statusText}`)
    } catch (error) {
        console.error('Error:', error.message);
    }
}

module.exports = { healthInfo_onNotify };

