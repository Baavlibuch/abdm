const mongoose = require('mongoose');
const {Schema} = mongoose;

const salutationSchema = new Schema({
	Salutation:{
		type: String
	},
	id: Number
});

const Salutation = mongoose.model("Salutation", salutationSchema, "salutations");

module.exports = Salutation;
