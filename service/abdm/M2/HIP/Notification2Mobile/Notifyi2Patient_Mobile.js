const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const { readfile, Write2file } = require('../../../read_or_write2KeyValues.js')



async function Notify2Patient_mobile() {
    const uuid = uuidv4();
    const timestamp = moment.utc().add(200, 'seconds').format('YYYY-MM-DDTHH:mm:ss.SSSSSS');
    try {
        // Read the content of Key_values.txt synchronously
        const accessToken = readfile('HIP_sessionToken')
        // const accessToken = await fs.readFile(accessTokenFilePath, 'utf-8');
        const apiUrl = 'https://dev.abdm.gov.in/gateway/v0.5/patients/sms/notify2';
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
                "phoneNo": readfile('MobileNo'),
                "hip": {
                    "name": readfile('name'),
                    "id": readfile('id')
                }
            }
        };

        const response = await axios.post(apiUrl, requestBody, { headers });
        console.log(`Response status for HIP_notification_to_mobile  : ${response.status}`)
	    console.log(`Response Text for notification : ${response.statusText}`)
    } catch (error) {
        console.error('Error:', error.message);
    }
}

module.exports = { Notify2Patient_mobile };

