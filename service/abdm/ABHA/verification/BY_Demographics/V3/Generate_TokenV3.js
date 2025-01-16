const fs = require('fs').promises; // Use fs.promises for asynchronous file reading
const path = require('path');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { format } = require('date-fns');

async function Generate_Token(abha) {
  const uuid = uuidv4();
  const now = new Date();
  const timestamp = format(now, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX");

  // Construct the relative path to accessToken.txt
  const accessTokenFilePath = path.join(__dirname, '../../../accessToken.txt');

  try {
    // Read the content of accessToken.txt asynchronously
    const accessToken = await fs.readFile(accessTokenFilePath, 'utf-8');

    const apiUrl = 'https://dev.abdm.gov.in/hiecm/api/v3/token/generate-token';
    const authToken = User_AccessToken;
    const headers = {
      'Authorization': authToken,
      'Content-Type': 'application/json',
      'X-CM-ID': 'sbx',
      'User-Agent': 'axios/0.21.4',
      'Accept': '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive',
      'X_HIP_ID': 'baavlibuch',
    };

    const requestBody = {
        "abhaNumber": 91656638513340,
        "abhaAddress": "vaibhav007@sbx",
        "name": "Vaibhav Yadav",
        "gender": "M",
        "yearOfBirth": 2001
    };

    // Use async/await with axios.post
    const response = await axios.post(apiUrl, requestBody, { headers });
    console.log(`Response status for fetch_modes : ${response.status}`)
    //console.log('Response : ', response);
  } catch (error) {
    console.error('Error:', error);
  }
}
//fetch_modes("13-0357-5624-4787@sbx");
module.exports ={ Generate_Token };
