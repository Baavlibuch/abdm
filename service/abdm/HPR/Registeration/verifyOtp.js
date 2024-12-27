const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { readfile, Write2file } = require('../../read_or_write2KeyValues.js')


async function verifyOtp(req, res) {
        try{
        const accessToken = readfile('HIP_sessionToken');
	const txnId = readfile('hpr_txnId');

        const { otp } = req.body;

	const apiUrl = 'https://hpridsbx.abdm.gov.in/api/v1/registration/aadhaar/verifyOTP';
        const authToken =`Bearer ${accessToken}`

        const headers = {
         'Authorization': authToken,
        };

        const requestBody ={
                'domainName': '@hpr.abdm',
		'idType': 'hpr_id',
		'otp': otp,
		'restrictions': '',
		'txnId': txnId
        };


        const response = await axios.post(apiUrl, requestBody, { headers });
        res.status(200).json(response.data);
        }
        catch(error) {
                console.error('Error in verifyOtp:', error.response ? error.response.data : error.message);

  }
};

module.exports = verifyOtp;

