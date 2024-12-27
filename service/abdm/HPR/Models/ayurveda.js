const mongoose = require('mongoose');
const {Schema} = mongoose;

const ayurvedaCollegesSchema = new Schema({
	college_id: Number,
	college_name: String,
	univer_id: Number,
	university_name: String,
	name: String
});

const ayurvedaCouncilSchema = new Schema({
	id: Number,
	council_name: String
});

const ayurvedaDegreeSchema = new Schema({
	id: Number,
	degree_name: String
});

/*
const ayurvedaSpecialitySchema = new Schema({
	
});
*/

const AyurvedaColleges = mongoose.model("ayurvedaCollege", ayurvedaCollegesSchema, "ayurvedaColleges");
const AyurvedaCouncil = mongoose.model("ayurvedaCouncil", ayurvedaCouncilSchema, "ayurvedaCouncil");
const AyurvedaDegree = mongoose.model("ayurvedaDegree", ayurvedaDegreeSchema, "ayurvedaDegrees");

module.exports = {
	AyurvedaColleges,
	AyurvedaCouncil,
	AyurvedaDegree
};
