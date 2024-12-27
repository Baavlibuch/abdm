const mongoose = require('mongoose');
const {Schema} = mongoose;

const notWorkingSchema = new Schema({
        name: String
});

const notWorking = mongoose.model("reasonForNotWorking", notWorkingSchema, "reasonForNotWorking");

module.exports = notWorking;

