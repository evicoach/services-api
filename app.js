const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const morgan = require('morgan');
const servicesRoute = require('./routes/servicesRoutes/servicesRoute')
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();


app.use(cors())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(morgan('tiny'));
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Mongodb connected successfully')
})

app.use('/services', cors(), servicesRoute(app))

app.listen(port, () => {
    console.log(`app runing on port ${port}`);
});