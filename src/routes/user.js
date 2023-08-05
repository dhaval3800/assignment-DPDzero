const express = require('express');
const router = express.Router();

const { registerUser, authToken } = require('../controller/user');

router.post('/register', registerUser);

router.post('/token', authToken);

module.exports = router;



