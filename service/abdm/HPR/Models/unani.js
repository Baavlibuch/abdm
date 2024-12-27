const mongoose = require('mongoose');
const {Schema} = mongoose;

const unaniCollegesSchema = new Schema({
        college_id: Number,
        college_name: String,
        univer_id: Number,
        university_name: String,
        name: String
});

const unaniCouncilSchema = new Schema({
        id: Number,
        council_name: String
});

const unaniDegreeSchema = new Schema({
        id: Number,
        degree_name: String
});


const unaniSpecialitySchema = new Schema({
        id: Number,
        speciality_name: String
});


const UnaniColleges = mongoose.model("unaniCollege", unaniCollegesSchema, "unaniColleges");
const UnaniCouncil = mongoose.model("unaniCouncil", unaniCouncilSchema, "unaniCouncil");
const UnaniDegree = mongoose.model("unaniDegree", unaniDegreeSchema, "unaniDegrees");
const UnaniSpeciality = mongoose.model("unaniSpeciality", unaniSpecialitySchema, "unaniSpeciality");

module.exports = {
        UnaniColleges,
        UnaniCouncil,
        UnaniDegree,
        UnaniSpeciality
};

