const axios = require('axios');
const { readfile, Write2file } = require('../../../read_or_write2KeyValues.js');
const { v4: uuidv4 } = require('uuid');

async function careContextConfirm (req, res) {
        try{
                const M2_AccessToken = readfile('M2_AccessToken');
                const baseUrl = readfile('M2_Sandbox_BaseURL');
<<<<<<< HEAD
                const referenceNumber = readfile('referenceNumber');
=======
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
                const randomUUID = uuidv4();

                const currentTime = new Date();
                const formattedTimestamp = currentTime.toISOString();

                const apiUrl = baseUrl + '/api/hiecm/user-initiated-linking/v3/link/care-context/confirm';

<<<<<<< HEAD
                const { token, hipId } = req.body;
=======
                const { token } = req.body;
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6

                const headers = {
                        'REQUEST-ID': randomUUID,
                        'TIMESTAMP': formattedTimestamp,
                        'Authorization': `Bearer ${M2_AccessToken}`,
                        'X-CM-ID': 'sbx',
<<<<<<< HEAD
			'X-HIU-ID': hipId
=======
			'X-HIU-ID': ''
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
                      };

                const requestBody = {
                	'token': token,
<<<<<<< HEAD
			'linkRefNumber': referenceNumber
=======
			'linkRefNumber': ''
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
		};

                const response = await axios.post( apiUrl, requestBody, { headers } );
                res.status(200).json(response.json)

        } catch (error) {
                console.error('error in careContextConfirm.js: ', error.response ? error.response.data : error.message)
                res.status(500).json({error: error.message});
        }

};

module.exports = careContextConfirm;

