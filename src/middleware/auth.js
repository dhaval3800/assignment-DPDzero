const { User } = require('../model/model');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ','');
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findByPk(decoded.id);
        if(!user){
            throw new Error("INVALID_TOKEN")
        }
        req.token = token
        req.user = user
        next()
    } catch (error) {
        next(error)
    }
};

module.exports = auth;