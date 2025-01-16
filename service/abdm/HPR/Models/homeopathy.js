const mongoose = require('mongoose');
const {Schema} = mongoose;

const homeopathyCollegesSchema = new Schema({
        college_id: Number,
        college_name: String,
        univer_id: Number,
        university_name: String,
        name: String
});

const homeopathyCouncilSchema = new Schema({
        id: Number,
        council_name: String
});

const homeopathyDegreeSchema = new Schema({
        id: Number,
        degree_name: String
});


const homeopathySpecialitySchema = new Schema({
        id: Number,
        speciality_name: String
});


const HomeopathyColleges = mongoose.model("homeopathyCollege", homeopathyCollegesSchema, "homeopathyColleges");
const HomeopathyCouncil = mongoose.model("homoepathyCouncil", homeopathyCouncilSchema, "homoepathyCouncil");
const HomeopathyDegree = mongoose.model("homeopathyDegree", homeopathyDegreeSchema, "homoepathyDegrees");
const HomeopathySpeciality = mongoose.model("homeopathySpeciality", homeopathySpecialitySchema, "homoepathySpeciality");

module.exports = {
        HomeopathyColleges,
        HomeopathyCouncil,
        HomeopathyDegree,
        HomeopathySpeciality
};


