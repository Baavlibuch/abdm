const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { readfile, Write2file } = require('../../read_or_write2KeyValues.js')


async function generateOtp(req, res) {
        try{
        const accessToken = readfile('HIP_sessionToken')

        const currentTimestamp = new Date();
        // Format the timestamp as desired (e.g., ISO 8601 format)
        const formattedTimestamp = currentTimestamp.toISOString();

        const { aadhaar } = req.body;

        if (!aadhaar) {
                return res.status(400).json({ error: 'Aadhaar number is required' });
        };

        const randomUUID = uuidv4();
        const apiUrl = 'https://hpridsbx.abdm.gov.in/api/v1/registration/aadhaar/generateOtp';
        const authToken =`Bearer ${accessToken}`

        const headers = {
         'Authorization': authToken,
         //'REQUEST-ID': randomUUID,
         //'TIMESTAMP': formattedTimestamp,

        };

        const requestBody ={
        	"aadhaar": aadhaar
        };


        const response = await axios.post(apiUrl, requestBody, { headers });  
	let { txnId } = response.data;
	Write2file('hpr_txnId', txnId);
	console.log('txnid saved in file', txnId);
	res.status(200).json(response.data);
        }
  	catch(error) {
    		console.error('Error in generateOtp:', error.response ? error.response.data : error.message);

  } 
};

module.exports = generateOtp;

