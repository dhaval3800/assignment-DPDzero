const { ValidationError, UniqueConstraintError } = require('sequelize');

const errorHandler = (err, req, res, next) => {


    if (err instanceof ValidationError) {
        const messages = err.errors[0];
        switch (messages.message) {
            case 'User.full_name cannot be null':
            case 'User.email cannot be null':
            case 'User.username cannot be null':
            case 'User.password cannot be null':
            case 'INVALID_REQUEST':
                res.status(400).json({
                    "status": "error",
                    "code": "INVALID_REQUEST",
                    "message": 'Invalid request. Please provide all required fields: username, email, password, full_name.'
                });
                break;
            case 'INVALID_EMAIL':
                res.status(400).json({
                    "status": "error",
                    "code": messages.message,
                    "message": 'Invalid email. Please provide a valid email address.'
                });
                break;
            case 'INVALID_PASSWORD':
                res.status(400).json({
                    "status": "error",
                    "code": messages.message,
                    "message": 'The provided password does not meet the requirements. Password must be at least 8 characters long and contain a mix of uppercase and lowercase letters, numbers, and special characters.'
                });
                break;
            case 'INVALID_AGE':
            case 'User.age cannot be null':
                res.status(400).json({
                    "status": "error",
                    "code": 'INVALID_AGE',
                    "message": 'Invalid age value. Age must be a positive integer.'
                });
                break;
            case 'GENDER_REQUIRED':
            case 'User.gender cannot be null':
                res.status(400).json({
                    "status": "error",
                    "code": "GENDER_REQUIRED",
                    "message": 'Gender field is required. Please specify the gender (e.g., male, female, non-binary).'
                });
                break;
            case 'USERNAME_EXISTS':
                res.status(400).json({
                    "status": "error",
                    "code": messages.message,
                    "message": 'The provided username is already taken. Please choose a different username.'
                });
                break;
            case 'EMAIL_EXISTS':
                res.status(400).json({
                    "status": "error",
                    "code": messages.message,
                    "message": 'The provided email is already registered. Please use a different email address.'
                });
                break;
            case 'INVALID_KEY':
            case 'Data.key cannot be null':
                res.status(400).json({
                    "status": "error",
                    "code": "INVALID_KEY",
                    "message": 'The provided key is not valid or missing.'
                });
                break;
            case 'INVALID_VALUE':
            case 'Data.value cannot be null':
                res.status(400).json({
                    "status": "error",
                    "code": "INVALID_VALUE",
                    "message": 'The provided value is not valid or missing.'
                });
                break;
            case 'KEY_EXISTS':
                res.status(400).json({
                    "status": "error",
                    "code": messages.message,
                    "message": 'The provided key already exists in the database. To update an existing key, use the update API.'
                });
                break;

            default:
                res.status(500).json({
                    "status": "error",
                    "code": "INTERNAL_SERVER_ERROR",
                    "message": messages.message
                });
                break;
        }
    }
    else {
        switch (err.message) {
            case 'INVALID_REQUEST':
                res.status(400).json({
                    "status": "error",
                    "code": err.message,
                    "message": 'Invalid request. Please provide all required fields: username, email, password, full_name.'
                });
                break;
            case 'MISSING_FIELDS':
                res.status(400).json({
                    "status": "error",
                    "code": err.message,
                    "message": 'Missing fields. Please provide both username and password.'
                });
                break;
            case 'INVALID_CREDENTIALS':
                res.status(400).json({
                    "status": "error",
                    "code": err.message,
                    "message": 'Invalid credentials. The provided username or password is incorrect.'
                });
                break;
            case 'INVALID_TOKEN':
            case 'invalid signature':
                res.status(400).json({
                    "status": "error",
                    "code": "INVALID_TOKEN",
                    "message": 'Invalid access token provided.'
                });
                break;
            case "KEY_NOT_FOUND":
                res.status(404).json({
                    "status": "error",
                    "code": "KEY_NOT_FOUND",
                    "message": "The provided key does not exist in the database."
                })
                break;
            case "jwt must be provided":
            case "jwt expired":
                res.status(404).json({
                    "status": "error",
                    "code": "JWT_ERROR",
                    "message": err.message
                })
                break;
            default:
                res.status(500).json({
                    "status": "error",
                    "code": "INTERNAL_ERROR",
                    "message": 'Internal server error occurred. Please try again later.'
                });
                break;
        }
    }
}


module.exports = errorHandler; 