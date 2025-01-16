const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { readfile, Write2file } = require('../../read_or_write2KeyValues.js')


async function verifyMobileOtp(req, res) {
        try{
        const accessToken = readfile('HIP_sessionToken');
        const txnId = readfile('hpr_txnId');

        const { mobileOtp } = req.body;

        const apiUrl = 'https://hpridsbx.abdm.gov.in/api/v1/registration/aadhaar/verifyMobileOTP';
        const authToken =`Bearer ${accessToken}`

        const headers = {
         'Authorization': authToken,
        };

        const requestBody ={
                'otp': mobileOtp,
                'txnId': txnId
        };


        const response = await axios.post(apiUrl, requestBody, { headers });
        res.status(200).json(response.data);
        }
        catch(error) {
                console.error('Error in verifyMobileOtp:', error.response ? error.response.data : error.message);

  }
};

module.exports = verifyMobileOtp;

