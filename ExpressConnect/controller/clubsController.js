const csvtojson = require('csvtojson')
const Games = require('../models/clubs')

const clubs_path = '/Users/eleonoravaleri/Downloads/Assignment\ Data\ 2023-2024/clubs.csv'

const importClubs = async (req,res) => {
    try {
        const clubs = await csvtojson().fromFile(clubs_path);
        await Games.insertMany(clubs);
        res.status(200).json({
            status: 'success',
            data: clubs_path,
        });

    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message,
        });
    }
};

module.exports = {importData: importClubs}