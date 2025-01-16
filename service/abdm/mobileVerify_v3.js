const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { readfile } = require('./read_or_write2KeyValues.js');

async function mobileVerify_v3(req, res) {
	try {
		const currentTimestamp = new Date();
		const formattedTimestamp = currentTimestamp.toISOString();

		const { encodedOtp } = req.body;
		if (!encodedOtp) {
			return res.status(400).json({ error: 'Otp is required' });
		}

		const randomUUID = uuidv4();

		const accessToken = readfile('HIP_sessionToken');
		const authToken = `Bearer ${accessToken}`

		const transactionId = readfile('transactionId');

		const apiUrl = 'https://abhasbx.abdm.gov.in/abha/api/v3/enrollment/auth/byAbdm';

		const headers = {
			'Authorization': authToken,
			'TIMESTAMP': formattedTimestamp,
			'REQUEST-ID': randomUUID,
			'Connection': 'keep-alive',
			'Accept-Encoding' : 'gzip, deflate, br',
			'Accept': '*/*',
			'User-Agent': 'axios/0.19.2',
			'Content-Type': 'application/json'
		};

		const requestBody = {
			"scope": [
				"abha-enrol",
				"mobile-verify"
			],
			"authData": {
        			"authMethods": [
            					"otp"
       				 ],
        			"otp": {
            				"timeStamp": formattedTimestamp,
            				"txnId": transactionId,
            				"otpValue": encodedOtp,
        			}
   			 }
		};

		const response = await axios.post( apiUrl, requestBody, { headers } );

		res.status(200).json(response.data);
		

	} catch (error) {
		console.error('Error mobileVerify_v3: ', error.response ? error.response.data : error.message );
	}
};

module.exports = mobileVerify_v3;
