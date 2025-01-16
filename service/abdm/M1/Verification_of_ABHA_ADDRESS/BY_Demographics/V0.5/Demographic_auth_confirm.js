const fs = require('fs');
const path = require('path');
const axios = require('axios');
const crypto = require('crypto');
const { readfile, Write2file } = require('../../../../read_or_write2KeyValues')


async function Demographic_auth_confirm() {
  const { v4: uuidv4 } = require('uuid');
  const uuid = uuidv4();
  const now = new Date();

  const { format } = require('date-fns');
  const timestamp = format(now, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX");

  try {
    // Read the content of accessToken.txt asynchronously
    const accessToken = readfile('HIP_sessionToken')

    const apiUrl = 'https://dev.abdm.gov.in/gateway/v0.5/users/auth/confirm';
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
      "credential": {
        "demographic": {
          "name": "Vaibhav Yadav",
          "gender": "M",
          "dateOfBirth": "2001-08-20"
        }
      }
    }

    // Use async/await with axios.post
    const response = await axios.post(apiUrl, requestBody, { headers });
    console.log(`Response status for Demographic_auth_confirm : ${response.status}`);
    // console.log('Response : ', response);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

module.exports = { Demographic_auth_confirm };

