const express = require('express');
const debug = require('debug')('app')
const cors = require('cors');
const mongoose = require('mongoose')
const morgan = require('morgan');
const servicesRoute = require('./routes/servicesRoutes/servicesRoute')
require('dotenv').config();
const port = process.env.PORT || 3000;

const app = express();

app.use(cors())
app.use(morgan('tiny'));
app.use(express.json());

// an immediately invoked function
// so async and await can be used 
// instead of .then(),
// for more code readability
// (async function establishDBConnection() {
//     const uri = process.env.ATLAS_URI;
//     await mongoose.connect(uri, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     });
//     const connection = mongoose.connection;
//     connection.once('open', () => {
//         debug('MongoDB database connection established successfully')
//     })
// }())

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    debug('MongoDB database connection established successfully');
})

app.use('/services', servicesRoute())
app.get('/', (req, res) => {
    res.json({ working: 'This is working' });
})

app.listen(port, () => {
    debug(`app listening on port ${port}`);
})