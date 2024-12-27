const axios = require('axios');
const { readfile, Write2file } = require('../../read_or_write2KeyValues.js');
const { v4: uuidv4 } = require('uuid');

async function keycloakCerts(req, res) {
        try{
                const timestamp = new Date();
                const formattedTimestamp = timestamp.toISOString();

                const randomUUID = uuidv4();

                const baseUrl = readfile('M2_Sandbox_BaseURL');
                const apiUrl = baseUrl + '/api/hiecm/gateway/v3/certs';
                const headers = {
                        'REQUEST-ID': randomUUID,
                        'TIMESTAMP': formattedTimestamp,
                        'X-CM-ID': 'sbx',
                };

                const response = await axios.get( apiUrl, { headers } );
                res.status(200).json(response.data)

        } catch (error) {
                console.error(error);
                return res.status(500).json({ error: error.message });
        }
};

module.exports = keycloakCerts;

