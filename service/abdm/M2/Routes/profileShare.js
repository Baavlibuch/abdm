const express = require('express');
const router = express.Router();

const profileShare = require('../Scan_and_Profile_Share/profileShare.js');
const profileOnShare = require('../Scan_and_Profile_Share/profileOnShare.js');


router.post('/patient-share/share', profileShare);
router.post('/patient-share/on-share', profileOnShare);

/*router.post('/response/on-confirm', async (req, res) => {
        try{
                const data = await responseOnRecordConfirm(req, res)
        } catch (err) {
                res.status(500).json({err: err.message});
        }
}); */

module.exports = router;

