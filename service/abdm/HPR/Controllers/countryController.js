const Country = require('../Models/country.js');

const getAllData = async (req, res) => {
        try{
                const country = await Country.find({});
                res.status(200).json(country)
        } catch (err) {
                res.status(500).json({ message: err.message })
        }
}

module.exports = {
        getAllData
};

