const Schema = require("../Schema/Patient/patient")
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const { readfile, Write2file } = require('../read_or_write2KeyValues')


const Create_patient = async (profile) => {
    try {
        const patient = await Schema.create({ ...profile })
        return patient
    } catch (err) {
        return err.message
    }
}

const GetPatient = async (abha_address) => {
    const timestamp = moment.utc().add(200, 'seconds').format('YYYY-MM-DDTHH:mm:ss.SSSSSS');
    try {
        const response = {
            "requestId": uuid,
            "timestamp": timestamp,
            "transactionId": readfile("transactionId"),
            "patient": {
                "referenceNumber": 'VISIT:7e9f17d6-2963-49dc-b41c-5d31cd1525dd',
                "display": "dummy_sample",
                "careContexts": [
                    {
                        "referenceNumber": "dummy_saref_cc_007mple_1",
                        "display": "OPD Records April07"
                    }
                ],
                "matchedBy": [
                    "MOBILE"
                ]
            },
            "resp": {
                "requestId": readfile("requestId")
            }
        }
        return response
    } catch (err) {
        console.log(err.message)
        return err.message
    }
}

const CareContext_onInit_Request = async (careContext) => {
    const timestamp = moment.utc().add(200, 'seconds').format('YYYY-MM-DDTHH:mm:ss.SSSSSS');
    try {
        let referenceNumber = []
        careContext.forEach(ele => {
            referenceNumber.push(ele.rreferenceNumber)
        });
        return response
    } catch (err) {
        console.log(err.message)
        return err.message
    }
}






module.exports = {
    Create_patient,
    GetPatient,
    CareContext_onInit_Request
}