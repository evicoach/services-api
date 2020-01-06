const express = require('express');
const debug = require('debug')('app')
const cors = require('cors');
const mongoose = require('mongoose')
const morgan = require('morgan');
const servicesRouter = express.Router();

const port = 3000;

const app = express();


app.use(morgan('tiny'));
app.use(express.json());

app.route('/').get((req, res) => {
    res.json({ welcome: 'we are in' });
})

app.listen(port, () => {
    debug(`app listening on port ${port}`)
})