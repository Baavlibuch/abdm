const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const { readfile, Write2file } = require('./read_or_write2KeyValues.js')



async function postAadhaar_v3(req, res) {
<<<<<<< HEAD
	try {
		const accessToken = readfile('HIP_sessionToken')

		const currentTimestamp = new Date();
		// Format the timestamp as desired (e.g., ISO 8601 format)
		const formattedTimestamp = currentTimestamp.toISOString();

		const { encodedAadhaar } = req.body;

		if (!encodedAadhaar) {
			return res.status(400).json({ error: 'Aadhaar otp is required' });
		};

		const randomUUID = uuidv4();
		const apiUrl = 'https://abhasbx.abdm.gov.in/abha/api/v3/enrollment/request/otp';
		const authToken = `Bearer ${accessToken}`

		const headers = {
			'Authorization': authToken,
			'Content-Type': 'application/json',
			'User-Agent': 'axios/0.19.2', // Replace with your user agent
			'Accept': '*/*',
			'Accept-Encoding': 'gzip, deflate, br',
			'Connection': 'keep-alive',
			'REQUEST-ID': randomUUID,
			'TIMESTAMP': formattedTimestamp,

		};

		const requestBody = {
			"scope": [
				"abha-enrol"
			],
			"loginHint": "aadhaar",
			"loginId": encodedAadhaar,
			"otpSystem": "aadhaar"
		};


		const response = await axios.post(apiUrl, requestBody, { headers });
		const { txnId } = response.data;
		Write2file('transactionId', txnId);
		Write2file('guid', randomUUID);
		res.status(200).json(response.data);
		//return res.data;
	}
	catch (error) {
		console.error('Error Aadhaar_v3:', error.response ? error.response.data : error.message);

	} finally {
		console.log('AadharV3 request completed')
	}
=======
	try{
	const accessToken = readfile('HIP_sessionToken')

	const currentTimestamp = new Date();
	// Format the timestamp as desired (e.g., ISO 8601 format)
	const formattedTimestamp = currentTimestamp.toISOString();

	const { encodedAadhaar } = req.body;
	
	if (!encodedAadhaar) {
		return res.status(400).json({ error: 'Aadhaar otp is required' });
	};

	const randomUUID = uuidv4();
	const apiUrl = 'https://abhasbx.abdm.gov.in/abha/api/v3/enrollment/request/otp';
	const authToken =`Bearer ${accessToken}`
	
	const headers = {
  	 'Authorization': authToken,
 	 'Content-Type': 'application/json',
 	 'User-Agent': 'axios/0.19.2', // Replace with your user agent
 	 'Accept': '*/*',
  	 'Accept-Encoding': 'gzip, deflate, br',
  	 'Connection': 'keep-alive',
         'REQUEST-ID': randomUUID,
 	 'TIMESTAMP': formattedTimestamp,

	};

	const requestBody ={
    	"scope": [
        	"abha-enrol"
   	 ],
    	"loginHint": "aadhaar",
   	 "loginId": encodedAadhaar,
        "otpSystem": "aadhaar"
	};


	const response = await axios.post(apiUrl, requestBody, { headers });
		const {txnId} = response.data;
		Write2file('transactionId', txnId);
		Write2file('guid', randomUUID);
		res.status(200).json(response.data);
	//return res.data;
	}		
  catch(error) {
    console.error('Error Aadhaar_v3:', error.response ? error.response.data : error.message);
	  
  } finally {
	  console.log('AadharV3 request completed')
  }
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
};

module.exports = postAadhaar_v3;
