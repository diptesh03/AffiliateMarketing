// import env file
require('dotenv').config();

// import npm packages
const jwt = require('jsonwebtoken');

module.exports = {
    jwtauthentication: (req, res, next) => {
        const token = req.header("jwtToken");
        if(!token) {
            res.status(401).send({success: false, msg: "Authentication Error!"});
        } else {
            try {
                jwt.verify(token, process.env.JWT_SECRETS);
                next();
            } catch (error) {
                res.send({success: false, msg: error.message});
            }
        }
    }
}

