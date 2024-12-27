const mongoose = require('mongoose');
const {Schema} = mongoose;

const stateSchema = new Schema({
	state_id: Number,
	state_name: String,
	state_iso_code: Number,
	district_name: String,
	district_iso_code: Number
});

const State = mongoose.model("state", stateSchema, "state");

module.exports = State;

