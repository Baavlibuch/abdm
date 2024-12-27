const { UnaniColleges, UnaniCouncil, UnaniDegree, UnaniSpeciality } = require('../Models/unani.js');

const getAllColleges = async (req, res) => {
    try {
        const colleges = await UnaniColleges.find({});
        res.status(200).json(colleges);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getAllCouncils = async (req, res) => {
    try {
        const councils = await UnaniCouncil.find({});
        res.status(200).json(councils);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getAllDegrees = async (req, res) => {
    try {
        const degrees = await UnaniDegree.find({});
        res.status(200).json(degrees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getAllSpeciality = async (req, res) => {
        try {
                const speciality = await UnaniSpeciality.find({});
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

