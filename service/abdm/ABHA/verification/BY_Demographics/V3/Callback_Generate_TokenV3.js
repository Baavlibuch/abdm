const app = require('express')()

// Callback URL for users/auth/on-fetch-modes ----> Successfull Request
// {
//     "abhaAddress": "abc@abdm",
//     "linkToken": "eyJhbGciOiJSUzUxMiJ9.eyJzdWIiOiJ2YXNhbnRoYWt1bWFyLmtlc2F2",
//     "response": {
//       "requestId": "6f0b4665-a915-4c92-aa36-65afb4a2cd71"
//     }
//   }
app.post('/v3/hip/token/on-generate-token', (req, res) => {
    console.log('Received on-generate-token:', req.body);
    console.log("Link Token ---> ", req.body.linkToken)
    res.status(202).send('Acknowledged'); // Respond with 202 status code as acknowledgment
});
