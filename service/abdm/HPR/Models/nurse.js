const mongoose = require('mongoose');
const {Schema} = mongoose;

const nurseCollegesSchema = new Schema({
        college_id: Number,
        college_name: String,
        univer_id: Number,
        university_name: String,
        name: String
});

const nurseCouncilSchema = new Schema({
        id: Number,
        council_name: String
});

const nurseCourseSchema = new Schema({
        id: Number,
        degree_name: String
});


const nurseSpecialitySchema = new Schema({
        id: Number,
        speciality_name: String
});

const nurseBoards = new Schema({
	id: Number,
	name: String
});

const nurseCategories = new Schema({
	id: Number,
	name: String
});


const NurseColleges = mongoose.model("nurseCollege", nurseCollegesSchema, "nurseColleges");
const NurseCouncil = mongoose.model("nurseCouncil", nurseCouncilSchema, "nurseCouncil");
const NurseCourses = mongoose.model("nurseCourses", nurseCourseSchema, "nurseCourses");
const NurseSpeciality = mongoose.model("nurseSpecialities", nurseSpecialitySchema, "nurseSpecialities");
const NurseBoards = mongoose.model("nurseAffBoards", nurseBoards, "nurseAffBoards");
const NurseCategories = mongoose.model("nurseCategories", nurseCategories, "nurseCategories");

module.exports = {
        NurseColleges,
        NurseCouncil,
        NurseCourses,
        NurseSpeciality,
	NurseBoards,
	NurseCategories
};

