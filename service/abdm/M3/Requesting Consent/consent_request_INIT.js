<<<<<<< HEAD
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const { readfile, Write2file } = require('../../read_or_write2KeyValues.js')


async function consentRequest_on_Init() {
    const uuid = uuidv4();
    const timestamp = moment.utc().add(200, 'seconds').format('YYYY-MM-DDTHH:mm:ss.SSSSSS');

    try {
        // Read the content of Key_values.txt synchronously
        const accessToken = readfile('HIP_sessionToken')
        // const accessToken = await fs.readFile(accessTokenFilePath, 'utf-8');
        const apiUrl = 'https://dev.abdm.gov.in/gateway/v0.5/consent-requests/init';
        const authToken = "Bearer " + accessToken;
        const headers = {
            'Authorization': authToken,
            'Content-Type': 'application/json',
            'X-CM-ID': 'sbx',
            'User-Agent': 'axios/0.21.4',
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',

        };

        const requestBody = {
            "requestId": uuid,
            "timestamp": timestamp,
            "consent": {
                "purpose": {
                    "text": "Self Requested",
                    "code": "PATRQT",
                    "refUri": "http://baavalibuch.com"
                },
                "patient": {
                    "id": "vaibhav007@ndhm"
                },
                "hip": {
                    "id": "Bahmni"
                },
                "careContexts": [
                    {
                        "patientReference": "batman@tmh",
                        "careContextReference": "Episode1"
                    }
                ],
                "hiu": {
                    "id": "baavalibuch",
                    "name": "YOURBESTHEALTHAI"
                },
                "requester": {
                    "name": "Dr. Manju",
                    "identifier": {
                        "type": "REGNO",
                        "value": "MH1001",
                        "system": "https://www.mciindia.org"
                    }
                },
                "hiTypes": [
                    "DiagnosticReport",
                    "Prescription",
                    "DischargeSummary",
                    "OPConsultation",
                    "ImmunizationRecord",
                    "WellnessRecord",
                    "HealthDocumentRecord"
                ],
                "permission": {
                    "accessMode": "VIEW",
                    "dateRange": {
                        "from": "2020-11-25T12:30:29.592Z",
                        "to": "2025-05-09T11:10:10.592Z"
                    },
                    "dataEraseAt": "2029-12-20T12:30:29.592Z",
                    "frequency": {
                        "unit": "MONTH",
                        "value": 12,
                        "repeats": 12
                    }
                }
            }
        };

        const responses = await axios.post(apiUrl, requestBody, { headers });
        console.log(`Response status for consentRequest_on_Init  : ${responses.status}`)
        console.log(`Response Text for consentRequest_on_Init : ${responses.statusText}`)
    } catch (error) {
        console.error('Error:', error.message);
    }
}

module.exports = { consentRequest_on_Init };

=======
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const { readfile, Write2file } = require('../../read_or_write2KeyValues.js')


async function consentRequest_on_Init() {
    const uuid = uuidv4();
    const timestamp = moment.utc().add(200, 'seconds').format('YYYY-MM-DDTHH:mm:ss.SSSSSS');

    try {
        // Read the content of Key_values.txt synchronously
        const accessToken = readfile('HIP_sessionToken')
        // const accessToken = await fs.readFile(accessTokenFilePath, 'utf-8');
        const apiUrl = 'https://dev.abdm.gov.in/gateway/v0.5/consent-requests/init';
        const authToken = "Bearer " + accessToken;
        const headers = {
            'Authorization': authToken,
            'Content-Type': 'application/json',
            'X-CM-ID': 'sbx',
            'User-Agent': 'axios/0.21.4',
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',

        };

        const requestBody = {
            "requestId": uuid,
            "timestamp": timestamp,
            "consent": {
                "purpose": {
                    "text": "Self Requested",
                    "code": "PATRQT",
                    "refUri": "http://baavalibuch.com"
                },
                "patient": {
                    "id": "vaibhav007@ndhm"
                },
                "hip": {
                    "id": "Bahmni"
                },
                "careContexts": [
                    {
                        "patientReference": "batman@tmh",
                        "careContextReference": "Episode1"
                    }
                ],
                "hiu": {
                    "id": "baavalibuch",
                    "name": "YOURBESTHEALTHAI"
                },
                "requester": {
                    "name": "Dr. Manju",
                    "identifier": {
                        "type": "REGNO",
                        "value": "MH1001",
                        "system": "https://www.mciindia.org"
                    }
                },
                "hiTypes": [
                    "DiagnosticReport",
                    "Prescription",
                    "DischargeSummary",
                    "OPConsultation",
                    "ImmunizationRecord",
                    "WellnessRecord",
                    "HealthDocumentRecord"
                ],
                "permission": {
                    "accessMode": "VIEW",
                    "dateRange": {
                        "from": "2020-11-25T12:30:29.592Z",
                        "to": "2025-05-09T11:10:10.592Z"
                    },
                    "dataEraseAt": "2029-12-20T12:30:29.592Z",
                    "frequency": {
                        "unit": "MONTH",
                        "value": 12,
                        "repeats": 12
                    }
                }
            }
        };

        const responses = await axios.post(apiUrl, requestBody, { headers });
        console.log(`Response status for consentRequest_on_Init  : ${responses.status}`)
        console.log(`Response Text for consentRequest_on_Init : ${responses.statusText}`)
    } catch (error) {
        console.error('Error:', error.message);
    }
}

module.exports = { consentRequest_on_Init };

>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
