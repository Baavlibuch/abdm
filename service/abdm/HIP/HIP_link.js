const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');


const BASE_URL = "http://34.131.119.20:80";

async function HIP_link_care_contexts(abha) {
    const uuid = uuidv4();
    const timestamp = moment.utc().add(200, 'seconds').format('YYYY-MM-DDTHH:mm:ss.SSSSSS');
    const accessTokenFilePath = path.join(__dirname, '../accessToken.txt');

    try {
        // Read the content of accessToken.txt asynchronously
        const accessToken = await fs.readFile(accessTokenFilePath, 'utf-8');
        const apiUrl = `${BASE_URL}/v0.5/links/link/init`;
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
            "transactionId": "18d9cee9-3f60-4000-86f4-a7851f57c801",  // use the transaction id
            "patient": {
                "id": abha,
                "referenceNumber": "TMH-PUID-001",
                "careContexts": [
                    {
                        "referenceNumber": "string"
                    }
                ]
            }
        };

        const response = await axios.post(apiUrl, requestBody, { headers });
        console.log(`Response status for HIP_link_care_contexts  : ${response.status}`)
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function HIP_link_confirm() {
    const uuid = uuidv4();
    const timestamp = moment.utc().add(200, 'seconds').format('YYYY-MM-DDTHH:mm:ss.SSSSSS');
    const accessTokenFilePath = path.join(__dirname, '../accessToken.txt');

    try {
        // Read the content of accessToken.txt asynchronously
        const accessToken = await fs.readFile(accessTokenFilePath, 'utf-8');
        const apiUrl = `${BASE_URL}/v0.5/links/link/confirm`;
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
            "confirmation": {
                "linkRefNumber": "string",
                "token": "string"
            }

        };

        const response = await axios.post(apiUrl, requestBody, { headers });
        console.log(`Response status for HIP_link_confirm  : ${response.status}`)
    } catch (error) {
        console.error('Error:', error.message);
    }
}


module.exports = { HIP_link_care_contexts, HIP_link_confirm };

