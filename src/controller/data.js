const { Data } = require('../model/model');

const storeData = async (req, res, next) => {
    try {
        const { key, value } = req.body;

        const data = await Data.create({ key, value, userId: req.user.id })
        res.status(201).json({
            "status": "success",
            "message": "Data stored successfully."
        })
    } catch (error) {
        next(error)
    }
}

const retrieveData = async (req, res, next) => {
    try {
        const key = req.params.key;
        const data = await Data.findOne({ where: { key } })
        if (!data) {
            throw new Error("KEY_NOT_FOUND")
        }
        res.json({
            "status": "success",
            "data": {
                "key": data.key,
                "value": data.value
            }
        });
    } catch (error) {
        next(error)
    }
}

const updateData = async (req, res, next) => {
    try {
        const key = req.params.key;
        const newValue = req.body.value;
        const data = await Data.findOne({ where: { key } });
        if (!data) {
            throw new Error("KEY_NOT_FOUND");
        }
        data.value = newValue;
        await data.save();
        res.json({
            "status": "success",
            "message": "Data updated successfully."
        });
    } catch (error) {
        next(error);
    }
}

const deleteData = async (req, res, next) => {
    try {
        const key = req.params.key;
        const data = await Data.findOne({ where: { key } });
        if (!data) {
            throw new Error("KEY_NOT_FOUND");
        }
        await data.destroy();
        res.json({
            "status": "success",
            "message": "Data deleted successfully."
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    storeData, retrieveData, updateData, deleteData
}