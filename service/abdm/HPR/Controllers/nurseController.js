const { NurseColleges, NurseCouncil, NurseCourses, NurseSpeciality, NurseBoards, NurseCategories } = require('../Models/nurse.js');

const getAllColleges = async (req, res) => {
    try {
        const colleges = await NurseColleges.find({});
        res.status(200).json(colleges);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getAllCouncils = async (req, res) => {
    try {
        const councils = await NurseCouncil.find({});
        res.status(200).json(councils);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const getAllCourses = async (req, res) => {
    try {
        const degrees = await NurseCourses.find({});
        res.status(200).json(degrees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const getAllSpeciality = async (req, res) => {
        try {
                const speciality = await NurseSpeciality.find({});
                res.status(200).json(speciality)
        } catch (err) {
                res.status(500).json({ message: err.message });
        }
}

const getAllBoards = async (req, res) => {
	try{
		const boards = await NurseBoards.find({});
		res.status(200).json(boards)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

const getAllCategories = async (req, res) => {
	try{
		const categories = await NurseCategories.find({});
		res.status(200).json(categories)
	} catch (err) {
		res.status(500).json({message: err.message})
	}
}

module.exports = {
    getAllColleges,
    getAllCouncils,
    getAllCourses,
    getAllSpeciality,
    getAllBoards,
    getAllCategories
};

