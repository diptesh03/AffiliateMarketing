require('dotenv').config();
const db = require('../config/db');

module.exports = {
    getUserByEmail: (email) => {
        const sql = `SELECT * FROM ${process.env.TABLE_PREFIX}users WHERE email = ?`;
        return db.execute(sql, [email]);
        },
    
    updateUserData: (email, fields, values) => {
        let subQuery = ''
        fields.map((e, i) => {
            subQuery = subQuery + ' ' + e + ' = ' + '"' + values[i] + '"'
            if(i < fields.length - 1) {
                subQuery = subQuery + ','
            }
        })
        const sql = `UPDATE ${process.env.TABLE_PREFIX}users SET${subQuery} WHERE email = ?`
        return db.execute(sql, [email])
    }
}