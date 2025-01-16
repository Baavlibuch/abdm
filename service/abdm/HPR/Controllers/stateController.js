const State = require('../Models/state.js');

const getAllData = async (req, res) => {
        try{
                const salute = await State.find({});
                res.status(200).json(salute)
        } catch (err) {
                res.status(500).json({ message: err.message })
        }
}

module.exports = {
        getAllData
};

