const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/user');
const dataRoutes = require('./src/routes/data');
const errorHandler = require('./src/middleware/errorHandler');
const dotenv = require('dotenv');
dotenv.config()
const {User, Data} = require('./src/model/model')

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api',userRoutes);
app.use('/api',dataRoutes);

app.use(errorHandler)

app.listen(PORT, ()=> {
    console.log(`listening on port ${PORT}`);
})