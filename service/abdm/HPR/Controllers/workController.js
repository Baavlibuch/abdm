const Work = require('../Models/natureOfWork.js');

const getAllData = async (req, res) => {
        try{
                const work = await Work.find({});
                res.status(200).json(work)
        } catch (err) {
                res.status(500).json({ message: err.message })
        }
}

module.exports = {
        getAllData
};

