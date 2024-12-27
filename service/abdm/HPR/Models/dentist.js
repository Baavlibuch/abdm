const mongoose = require('mongoose');
const {Schema} = mongoose;

const dentistCollegesSchema = new Schema({
        college_id: Number,
        college_name: String,
        univer_id: Number,
        university_name: String,
        name: String
});

const dentistCouncilSchema = new Schema({
        id: Number,
        council_name: String
});

const dentistDegreeSchema = new Schema({
        id: Number,
        degree_name: String
});


const dentistSpecialitySchema = new Schema({
	id: Number,
	speciality_name: String
});


const DentistColleges = mongoose.model("dentistryCollege", dentistCollegesSchema, "dentistryColleges");
const DentistCouncil = mongoose.model("dentistryCouncil", dentistCouncilSchema, "dentistryCouncil");
const DentistDegree = mongoose.model("dentistryDegree", dentistDegreeSchema, "dentistryDegree");
const DentistSpeciality = mongoose.model("dentistrySpeciality", dentistSpecialitySchema, "dentistrySpeciality");

module.exports = {
        DentistColleges,
        DentistCouncil,
        DentistDegree,
	DentistSpeciality
};

