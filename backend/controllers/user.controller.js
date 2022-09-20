// import env file
require('dotenv').config();

// import npm packages
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const NodeCache = require( "node-cache" );


const myCache = new NodeCache( { stdTTL: 10} );

// import project files
const User = require('../models/user.model')

module.exports = {

    adminLogin: async (req, res) => {
        try {
            const {email, password} = req.body;
            const cachedUser = myCache.get( "email" )
            let user
            if(!cachedUser) {
                const [users, _] = await User.getUserByEmail(email);
                user = users[0]
            } else {
                user = cachedUser
            }
            if(user.length == 0) {
                res.status(400).send({
                    success: false,
                    msg: 'Incorrect Email!'
                })
            } else {
                myCache.set( "email", user );
                const match = await bcrypt.compare(password, user.hash);
                if(!match) {
                    res.status(400).send({
                        success: false,
                        msg: 'Incorrect Password!'
                    })
                } else {
                    const payload = {
                        email: email
                    };
        
                    jwt.sign(payload,
                        process.env.JWT_SECRETS,
                        {expiresIn : process.env.JWT_EXP_IN},
                        (err, token) => {
                            if(err) throw err;
                            let userData = {
                                    ...user,
                                    token
                                };
                            res.status(200).send({success: true, data: userData});
                        });
                }
            }
        } catch (error) {
            res.send({success: false, msg: error.message});
        }
    },
    
    changePassword: async (req, res) => {
        try {
            const {email, password, newPassword} = req.body;
            const cachedUser = myCache.get( "email" )
            let user
            if(!cachedUser) {
                const [users, _] = await User.getUserByEmail(email);
                user = users[0]
            } else {
                user = cachedUser
            }
            if(user.length == 0) {
                res.status(400).send({
                    success: false,
                    msg: 'Incorrect Email!'
                })
            } else {
                const match = await bcrypt.compare(password, user.hash);
                if(!match) {
                    res.status(400).send({
                        success: false,
                        msg: 'Incorrect Password!'
                    })
                } else {
                    const salt = await bcrypt.genSalt(12);
                    const hash = await bcrypt.hash(newPassword, salt);
                    await User.updateUserData(email, ['hash'], [hash]);
                    res.status(200).send({success: true, msg: 'Password Changed!'})
                }
            }
        } catch (error) {
            res.send({success: false, msg: error.message});
        }
        
    }
}
