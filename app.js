const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const morgan = require('morgan');
const servicesRoute = require('./routes/servicesRoutes/servicesRoute')
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();


app.use(cors())
app.use(morgan('combined'));
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .catch(err => { console.log('Error connecting to database') });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Mongodb connected successfully')
}).catch(err => { console.log('Could not connect to database') });

app.use('/services', servicesRoute())

app.listen(port, () => {
    console.log(`app runing on port ${port}`);
});