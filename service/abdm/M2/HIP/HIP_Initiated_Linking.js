const fs = require('fs').promises; // Use fs.promises for asynchronous file reading
const path = require('path');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { readfile, Write2file } = require('../../read_or_write2KeyValues.js')
const moment = require('moment');

async function HIP_Initiated_Linking(abha) {
  const uuid = uuidv4();

  // Use moment to set the timestamp with the required format
  const timestamp = moment.utc().add(200, 'seconds').format('YYYY-MM-DDTHH:mm:ss.SSSSSS');

  // Construct the relative path to accessToken.txt
  

  try {
    // Read the content of accessToken.txt asynchronously
    const User_accessToken = readfile('User_AccessToken')
    const accessToken = readfile('HIP_sessionToken')
    const apiUrl = 'https://dev.abdm.gov.in/gateway/v0.5/links/link/add-contexts';
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
      "link": {
        "accessToken": User_accessToken,
        "patient": {
          "referenceNumber": "TMH-PUID-001",
          "display": "Vaibhav Testing",
          "careContexts": [
            {
              "referenceNumber": "BaavalibuchTesting",
              "display": "BaavalibuchTesting"
            }
          ]
        }
      }
    };

    // Use async/await with axios.post
    const response = await axios.post(apiUrl, requestBody, { headers });
    console.log(`Response status for HIP_Initiated_Linking : ${response.status}`)
    console.log('Response : ', response.statusText);
  } catch (error) {
    console.error('Error:', error.message);
    console.log("Error HIP_Initiated_Linking--------------> ", error.statusCode)
  }
}

module.exports = { HIP_Initiated_Linking };

