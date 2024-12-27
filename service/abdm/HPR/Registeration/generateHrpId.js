const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { readfile, Write2file } = require('../../read_or_write2KeyValues.js')


async function generateHrpId(req, res) {
        try{
        const accessToken = readfile('HIP_sessionToken');
        const txnId = readfile('hpr_txnId');

        const { email, firstName, hprUserId, lastName, middleName, password } = req.body;

        const apiUrl = 'https://hpridsbx.abdm.gov.in/api/v1/registration/aadhaar/createHprIdWithPreVerified';
        const authToken =`Bearer ${accessToken}`

        const headers = {
         'Authorization': authToken,
        };

        const requestBody ={
                'txnId': txnId,
		'domainName': '@hpr.abdm',
		'email': email,
		'firstName': firstName,
		'hprId': hprUserId,
		'idType': 'hpr_id',
		'lastName': lastName,
		'middleName': middleName,
		'password': password
        };


        const response = await axios.post(apiUrl, requestBody, { headers });
	let { token } = response.data;
	Write2file('hprId_token', token);
	console.log('hprId token saved: ', token);
        res.status(200).json(response.data);
        }
        catch(error) {
                console.error('Error in generateHrpId:', error.response ? error.response.data : error.message);

  }
};

module.exports = generateHrpId;

