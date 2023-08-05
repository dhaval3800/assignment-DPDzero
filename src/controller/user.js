const { User } = require('../model/model');

const registerUser = async (req, res, next) => {
    try {
        const { username, email, password, full_name, age, gender } = req.body;
        // if (!username || !email || !password || !full_name) {
        //   throw new Error('INVALID_REQUEST');
        // }
        const newUser = await User.create({ username, email, password, full_name, age, gender });
        res.status(201).json({
            "status": "success",
            "message": "user successfully registered!",
            "data": newUser
        });
    } catch (error) {
        next(error);
    }
}

const authToken = async (req, res, next) => {
    try {
        const { username, password, } = req.body;
        if (!username || !password) {
            throw new Error('MISSING_FIELDS');
        }
        const user = await User.findByCredentials(username, password);
        const token = user.generateAuthToken();
        res.status(200).json({
            "status": "success",
            "message": "Access token generated successfully",
            "data": {
                "access_token": token,
                "expires_in": 3600
            }
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    registerUser,
    authToken
}