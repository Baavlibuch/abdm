const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { readfile } = require('./read_or_write2KeyValues.js');

async function emailVerification(req, res) {
	try{
		const currentTimestamp = new Date();
		const formattedTimestamp = currentTimestamp.toISOString();

		const randomUUID = uuidv4();

		const { emailId } = req.body;

		if (!emailId) {
			return res.status(400).json({ error: 'Email is required' });
		};

		const accessToken = readfile('HIP_sessionToken');
		const authToken = `Bearer ${accessToken}`;

		const xToken = readfile('X-Token');

		const apiUrl = 'https://abhasbx.abdm.gov.in/abha/api/v3/profile/account/request/emailVerificationLink';

		const headers = {
			'Authorization': authToken,
			'X-Token': `Bearer ${xToken}`,
			'TIMESTAMP': formattedTimestamp,
			'REQUEST-ID': randomUUID,
			'Connection': 'keep-alive',
			'Accept-Encoding': 'gzip, deflate, br',
			'Accept': '*/*',
			'User-Agent': 'axios/0.19.2',
			'Content-Type': 'application/json',
		};

		const requestBody = {
			"loginHint": "email",
  			"loginId": emailId,
  			"otpSystem": "abdm",
 			 "scope": [
   				"abha-profile",
    				"email-link-verify"
  			]
		};

		const response = await axios.post( apiUrl, requestBody, { headers } );
		res.status(200).json(response.data);

	} catch (error) {
		console.error('Error emailVerification.js: ', error.response ? error.response.data : error.message);
	}
};

module.exports = emailVerification;
