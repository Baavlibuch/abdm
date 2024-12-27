const { Schema, model } = require("mongoose");

// This is Note Schema
const Patient = Schema({
    abha_address: {
        type: "String",
        required: [true, "abha_address is Missing"],
        maxlength: 50,
        minlength: 3
    },
    abha_number: {
        type: "String",
        required: [true, "abha_number is Missing"],
        maxlength: 70,
        minlength: 3
    },
    fname: {
        type: "String",
        required: [true, "fname is Missing"],
        maxlength: 300,
        minlength: 3
    },
    lname: {
        type: "String",
        required: [true, "lname is Missing"],
        maxlength: 300,
        minlength: 3
    },
    age: {
        type: "String",
        required: [true, "age is Missing"],
        maxlength: 300,
        minlength: 3
    },
    gender: {
        type: "String",
        required: [true, "gender is Missing"],
        maxlength: 300,
        minlength: 1
    },
    phoneNo: {
        type: "String",
        required: [true, "phoneNo is Missing"],
        maxlength: 300,
        minlength: 3
    },
}, {
    timestamps: {
        createdAt: 'Created_at', // Use `Created_at` to store the created date
        updatedAt: 'Updated_at'
    }
});

module.exports = model('patient', Patient);