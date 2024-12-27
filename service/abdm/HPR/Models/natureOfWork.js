const mongoose = require('mongoose');
const {Schema} = mongoose;

const workSchema = new Schema({
        Salutation:{
                type: String
        },
        id: Number
});

const Work = mongoose.model("natureOfWork", workSchema, "natureOfWork");

module.exports = Work;

