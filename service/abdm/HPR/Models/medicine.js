const mongoose = require('mongoose');
const {Schema} = mongoose;

const medicineSchema = new Schema({
        system_of_medicine:String,
        id: Number
});

const Medicine = mongoose.model("sysOfMedicine", medicineSchema, "sysOfMedicine");

module.exports = Medicine;

