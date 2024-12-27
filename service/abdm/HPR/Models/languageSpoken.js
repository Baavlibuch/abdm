const mongoose = require('mongoose');
const {Schema} = mongoose;

const languageSchema = new Schema({
        Salutation:{
                type: String
        },
        id: Number
});

const LanguageSpoken = mongoose.model("languageSpoken", languageSchema, "languageSpoken");

module.exports = LanguageSpoken;

