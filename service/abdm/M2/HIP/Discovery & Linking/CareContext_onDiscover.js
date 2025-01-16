const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const { readfile, Write2file } = require('../../../read_or_write2KeyValues.js')
const { GetPatient } = require("../../../Controller/CareContext_onDiscover.js")


async function CareContext_onDiscover() {
    const uuid = uuidv4();
    const timestamp = moment.utc().add(200, 'seconds').format('YYYY-MM-DDTHH:mm:ss.SSSSSS');

    try {
        // Read the content of Key_values.txt synchronously
        const accessToken = readfile('HIP_sessionToken')
        const apiUrl = 'https://dev.abdm.gov.in/gateway/v0.5/care-contexts/on-discover';
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
            "transactionId": readfile("transactionId"),
            "patient": {
                "referenceNumber": readfile('referenceNumber'),
                "display": "dummy_sample",
                "careContexts": [
                    {
                        "referenceNumber": "dummy_saref_cc_007mple_1",
                        "display": "OPD Records April07"
                    }
                ],
                "matchedBy": [
                    "MOBILE"
                ]
            },
            "resp": {
                "requestId": readfile("requestId")
            }
        };

        // const response = await axios.post(apiUrl, GetPatient(), { headers });
        const response = await axios.post(apiUrl, requestBody, { headers });
        console.log(`Response status for CareContext_onDiscover  : ${response.status}`)
        console.log(`Response Text for CareContext_onDiscover : ${response.statusText}`)
    } catch (error) {
        console.error('Error:', error.message);
    }
}

module.exports = { CareContext_onDiscover };

