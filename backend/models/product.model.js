require('dotenv').config();
const db = require('../config/db');

module.exports = {

    getAllCategories: () => {
        return db.execute(`SELECT * FROM ${process.env.TABLE_PREFIX}categories;`);
    }
}