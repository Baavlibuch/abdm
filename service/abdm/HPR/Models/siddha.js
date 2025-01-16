const mongoose = require('mongoose');
const {Schema} = mongoose;

const siddhaCollegesSchema = new Schema({
        college_id: Number,
        college_name: String,
        univer_id: Number,
        university_name: String,
        name: String
});

const siddhaCouncilSchema = new Schema({
        id: Number,
        council_name: String
});

const siddhaDegreeSchema = new Schema({
        id: Number,
        degree_name: String
});


const siddhaSpecialitySchema = new Schema({
        id: Number,
        speciality_name: String
});


const SiddhaColleges = mongoose.model("sidhaCollege", siddhaCollegesSchema, "sidhaColleges");
const SiddhaCouncil = mongoose.model("siddhaCouncil", siddhaCouncilSchema, "siddhaCouncil");
const SiddhaDegree = mongoose.model("siddhaDegree", siddhaDegreeSchema, "siddhaDegrees");
const SiddhaSpeciality = mongoose.model("siddhaSpeciality", siddhaSpecialitySchema, "siddhaSpeciality");

module.exports = {
        SiddhaColleges,
        SiddhaCouncil,
        SiddhaDegree,
        SiddhaSpeciality
};

