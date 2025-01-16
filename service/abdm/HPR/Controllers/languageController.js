const Language = require('../Models/languageSpoken.js');

const getAllData = async (req, res) => {
        try{
                const language = await Language.find({});
                res.status(200).json(language)
        } catch (err) {
                res.status(500).json({ message: err.message })
        }
}

module.exports = {
        getAllData
};

