const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const { readfile, Write2file } = require('../../read_or_write2KeyValues.js')


async function consents_fetch() {
    const uuid = uuidv4();
    const timestamp = moment.utc().add(200, 'seconds').format('YYYY-MM-DDTHH:mm:ss.SSSSSS');

    try {
        // Read the content of Key_values.txt synchronously
        const accessToken = readfile('HIP_sessionToken')
        // const accessToken = await fs.readFile(accessTokenFilePath, 'utf-8');
        const apiUrl = 'https://dev.abdm.gov.in/gateway/v0.5/consents/fetch'
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
            "consentId": readfile("consentId")
        };

        const responses = await axios.post(apiUrl, requestBody, { headers });
        console.log(`Response status for consents_fetch  : ${responses.body}`)
        console.log(`Response status for consents_fetch  : ${responses.status}`)
        console.log(`Response Text for consents_fetch : ${responses.statusText}`)
    } catch (error) {
        console.error('Error:', error.message);
    }
}

module.exports = { consents_fetch };

