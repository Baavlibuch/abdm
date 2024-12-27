const mongoose = require('mongoose');
const {Schema} = mongoose;

const countrySchema = new Schema({
	countries: {
                type: String
        },
        id: Number
});

const Countries = mongoose.model("countries", countrySchema, "countries");

module.exports = Countries;

