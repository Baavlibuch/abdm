const { ModernColleges, ModernCouncil, ModernDegree, ModernSpeciality } = require('../Models/modernMedicine.js');

// Controller for fetching all Ayurveda Colleges
const getAllColleges = async (req, res) => {
    try {
        const colleges = await ModernColleges.find({});
        res.status(200).json(colleges);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller for fetching all Ayurveda Councils
const getAllCouncils = async (req, res) => {
    try {
        const councils = await ModernCouncil.find({});
        res.status(200).json(councils);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller for fetching all Ayurveda Degrees
const getAllDegrees = async (req, res) => {
    try {
        const degrees = await ModernDegree.find({});
        res.status(200).json(degrees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller for fetching all Dentist Specialities
const getAllSpeciality = async (req, res) => {
        try {
                const speciality = await ModernSpeciality.find({});
                res.status(200).json(speciality)
        } catch (err) {
                res.status(500).json({ message: err.message });
        }
}

module.exports = {
    getAllColleges,
    getAllCouncils,
    getAllDegrees,
    getAllSpeciality
};


