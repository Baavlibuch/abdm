const mongoose = require('mongoose');
const {Schema} = mongoose;

const sowaCollegesSchema = new Schema({
        college_id: Number,
        college_name: String,
        univer_id: Number,
        university_name: String,
        name: String
});

const sowaCouncilSchema = new Schema({
        id: Number,
        council_name: String
});

const sowaDegreeSchema = new Schema({
        id: Number,
        degree_name: String
});


const SowaColleges = mongoose.model("sowaRigpaCollege", sowaCollegesSchema, "sowaRigpaColleges");
const SowaCouncil = mongoose.model("sowaCouncil", sowaCouncilSchema, "sowaCouncil");
const SowaDegree = mongoose.model("sowaDegree", sowaDegreeSchema, "sowaDegrees");

module.exports = {
        SowaColleges,
        SowaCouncil,
        SowaDegree
};

