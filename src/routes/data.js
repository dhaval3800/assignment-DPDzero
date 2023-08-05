const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { storeData,retrieveData,updateData,deleteData } = require('../controller/data');

router.post('/data', auth, storeData)

router.get('/data/:key', auth, retrieveData)

router.put('/data/:key', auth, updateData);

router.delete('/data/:key', auth, deleteData);

module.exports = router;

