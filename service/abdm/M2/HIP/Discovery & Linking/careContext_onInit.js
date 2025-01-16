const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const { readfile, Write2file } = require('../../../read_or_write2KeyValues.js')


async function CareContext_onInit() {
    const uuid = uuidv4();
    const timestamp = moment.utc().add(200, 'seconds').format('YYYY-MM-DDTHH:mm:ss.SSSSSS');

    try {
        // Read the content of Key_values.txt synchronously
        const accessToken = readfile('HIP_sessionToken')
        // const accessToken = await fs.readFile(accessTokenFilePath, 'utf-8');
        const apiUrl = 'https://dev.abdm.gov.in/gateway/v0.5/links/link/on-init';
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
            "transactionId": readfile('transactionId'),
            "link": {
                "referenceNumber": "VISIT:7e9f17d6-2963-49dc-b41c-5d31cd1525dd",
                "authenticationType": "DIRECT",
                "meta": {
                    "communicationMedium": "MOBILE",
                    "communicationHint": "string",
                    "communicationExpiry": '2024-04-30T12:01:55Z'
                }
            },
            "error": null,
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

module.exports = { CareContext_onInit };

