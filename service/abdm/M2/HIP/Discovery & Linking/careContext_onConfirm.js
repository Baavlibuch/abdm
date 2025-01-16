const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const { readfile, Write2file } = require('../../../read_or_write2KeyValues.js')


async function CareContext_onConfirm() {
    const uuid = uuidv4();
    const timestamp = moment.utc().add(200, 'seconds').format('YYYY-MM-DDTHH:mm:ss.SSSSSS');

    try {
        // Read the content of Key_values.txt synchronously
        const accessToken = readfile('HIP_sessionToken')
        // const accessToken = await fs.readFile(accessTokenFilePath, 'utf-8');
        const apiUrl = 'https://dev.abdm.gov.in/gateway/v0.5/links/link/on-confirm';
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
            "requestId": readfile("requestId"),
            "timestamp": timestamp,
            "patient": {
                "referenceNumber": "YOURBESTAI007",
                "display": "Test Complete",
                "careContexts": [
                    {
                        "referenceNumber": "YOURBESTAI007",
                        "display": "dummysample"
                    }
                ]
            },
            "error": {
                "code": 0,
                "message": "ERROR"
            },
            "resp": {
                "requestId": readfile("requestId")
            }
        };

        const responses = await axios.post(apiUrl, requestBody, { headers });
        console.log(`Response status for CareContext_onDiscover  : ${responses.status}`)
        console.log(`Response Text for CareContext_onDiscover : ${responses.statusText}`)
    } catch (error) {
        console.error('Error:', error.message);
    }
}

module.exports = { CareContext_onConfirm };

