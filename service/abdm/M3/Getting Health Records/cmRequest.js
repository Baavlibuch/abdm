const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const { readfile, Write2file } = require('../../read_or_write2KeyValues.js')


async function cm_Request() {
    const uuid = uuidv4();
    const timestamp = moment.utc().add(200, 'seconds').format('YYYY-MM-DDTHH:mm:ss.SSSSSS');

    try {
        // Read the content of Key_values.txt synchronously
        const accessToken = readfile('HIP_sessionToken')
        // const accessToken = await fs.readFile(accessTokenFilePath, 'utf-8');
        const apiUrl = 'https://dev.abdm.gov.in/gateway/v0.5/health-information/cm/request'
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
            "hiRequest": {
                "consent": {
                    "id": "bc2dd144-4e6e-47af-9749-1ae77d27d707"
                },
                "dateRange": {
                    "from": "2020-11-25T12:30:29.592",
                    "to": "2025-05-09T11:10:10.592"
                },
                "dataPushUrl": "http://34.131.119.20:80",
                "keyMaterial": {
                    "cryptoAlg": "ECDH",
                    "curve": "Curve25519",
                    "dhPublicKey": {
                        "expiry": "2029-12-20T12:30:29.592",
                        "parameters": "Curve25519/32byte random key",
                        "keyValue": "MIIBMTCB6gYHTBEJANCAAQqCCIzBXvtTZBvovCenuoWTsfk+e1lFo+LF0xP+9bqa/CP/jn4KNVp0cwCb"
                    },
                    "nonce": "oQJi7UZVU+nFwoEVMuqMnQ6AbGQzYXvxGy58V3kAAHI="
                }
            }
        };

        const responses = await axios.post(apiUrl, requestBody, { headers });
        console.log(`Response status for cm_Request  : ${responses.body}`)
        console.log(`Response status for cm_Request  : ${responses.status}`)
        console.log(`Response Text for cm_Request : ${responses.statusText}`)
    } catch (error) {
        console.error('Error:', error.message);
    }
}

module.exports = { cm_Request };

