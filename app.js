const express = require('express');
const cors = require('cors');
const connectToDb = require('./connectDatabase');
const morgan = require('morgan');
const servicesRoute = require('./routes/services/servicesRoute')
const authRoute = require('./routes/auth/auth')
require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();
app.use(cors())
app.use(morgan('combined'));
app.use(express.json());

connectToDb();

app.use('/services', servicesRoute())
app.use('/auth', authRoute())

app.listen(port, () => {
    console.log(`app runing on port ${port}`);
});