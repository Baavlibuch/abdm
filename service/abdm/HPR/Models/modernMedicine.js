const mongoose = require('mongoose');
const {Schema} = mongoose;

const modernCollegesSchema = new Schema({
        college_id: Number,
        college_name: String,
        univer_id: Number,
        university_name: String,
        name: String
});

const modernCouncilSchema = new Schema({
        id: Number,
        council_name: String
});

const modernDegreeSchema = new Schema({
        id: Number,
        degree_name: String
});


const modernSpecialitySchema = new Schema({
        id: Number,
        speciality_name: String
});


const ModernColleges = mongoose.model("modernMedicineCollege", modernCollegesSchema, "modernMedicineColleges");
const ModernCouncil = mongoose.model("modernMedicineCouncil", modernCouncilSchema, "modernMedicineCouncil");
const ModernDegree = mongoose.model("modernMedicineDegree", modernDegreeSchema, "modernMedicineDegrees");
const ModernSpeciality = mongoose.model("modernMedicineSpeciality", modernSpecialitySchema, "modernMedicineSpeciality");

module.exports = {
        ModernColleges,
        ModernCouncil,
        ModernDegree,
        ModernSpeciality
};

