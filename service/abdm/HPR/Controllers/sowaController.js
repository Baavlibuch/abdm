const { SowaColleges, SowaCouncil, SowaDegree } = require('../Models/sowa.js');

// Controller for fetching all Ayurveda Colleges
const getAllColleges = async (req, res) => {
    try {
        const colleges = await SowaColleges.find({});
        res.status(200).json(colleges);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller for fetching all Ayurveda Councils
const getAllCouncils = async (req, res) => {
    try {
        const councils = await SowaCouncil.find({});
        res.status(200).json(councils);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller for fetching all Ayurveda Degrees
const getAllDegrees = async (req, res) => {
    try {
        const degrees = await SowaDegree.find({});
        res.status(200).json(degrees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllColleges,
    getAllCouncils,
    getAllDegrees
};

