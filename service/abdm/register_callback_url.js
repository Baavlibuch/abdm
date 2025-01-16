const fs = require('fs').promises; // Use fs.promises for asynchronous file reading
const path = require('path');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { format } = require('date-fns');
const { readfile, Write2file } = require('./read_or_write2KeyValues.js');

async function register_callback_url() {

  // Construct the relative path to accessToken.txt
  const accessTokenFilePath = path.join(__dirname, './accessToken.txt');
	const newAccessToken = readfile('HIP_sessionToken');
	const accessToken = fs.readFile(accessTokenFilePath, 'utf-8');

  try {
	    // Read the content of accessToken.txt asynchronously
	    //const accessToken = await fs.readFile(accessTokenFilePath, 'utf-8');
	    //const newAccessToken = await readfile('HIP_sessionToken');

	    const apiUrl = 'https://dev.abdm.gov.in/devservice/v1/bridges';
	    const authToken = `Bearer ${newAccessToken}`;
	    const headers = {
	      'Authorization': authToken,
	      'Content-Type': 'application/json',
	      'User-Agent': 'axios/0.19.2',
	      'Accept': '*/*',
	      'Accept-Encoding': 'gzip, deflate, br',
	      'Connection': 'keep-alive',
	    };

	    const requestBody = {
		  "url": "http://34.131.119.20:3000/5b24ab9e-2194-4f5f-aca3-fdb0a4872312"
		}
      
 

	    const response = await axios.patch(apiUrl, requestBody, headers);
	    console.log('Response to register_callback_url: ', response.status); 
     } catch (error) {
           console.error('Error register_callback_url:', error.message);
	     throw error
     }
}

module.exports = register_callback_url;
