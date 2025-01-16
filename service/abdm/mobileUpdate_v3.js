const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { readfile } = require('./read_or_write2KeyValues.js');


async function mobileUpdate_v3(req, res) {
	try{
		const currentTimestamp = new Date();
		const formattedTimestamp = currentTimestamp.toISOString();

		const { encodedMobileNumber } = req.body;

		if (!encodedMobileNumber) {
			return res.status(400).json({ error: 'Mobile number is required' });	
		};

		const randomUUID = uuidv4();

		const accessToken = readfile('HIP_sessionToken');
		const authToken = `Bearer ${accessToken}`

		const transactionId = readfile('transactionId');

		const apiUrl = 'https://abhasbx.abdm.gov.in/abha/api/v3/enrollment/request/otp';

		const headers = {
			'Authorization': authToken,
			'Content-Type': 'application/json',
			'User-Agent': 'axios/0.19.2',
			'Accept': '*/*',
			'Accept-Encoding': 'gzip, deflate, br',
			'Connection': 'keep-alive',
			'REQUEST-ID': randomUUID,
			'TIMESTAMP': formattedTimestamp
		};

		const requestBody = {
			"txnId": transactionId,
			"scope": [
				"abha-enrol",
				"mobile-verify"
			],
			"loginHint": "mobile",
			"loginId": encodedMobileNumber,
			"otpSystem": "abdm"
		};

		const response = await axios.post( apiUrl, requestBody, { headers } );
		
		res.status(200).json(response.data);
		

	} catch(error) {
		console.error('Error mobileUpdate_v3: ', error.response ? error.response.data : error.message);
	}
};

module.exports = mobileUpdate_v3;
