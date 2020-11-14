const path = require('path');
const express = require('express');
const cors = require('cors');
const connectToDb = require('./connectDatabase');
const morgan = require('morgan');
const dotenv = require('dotenv');
const fixasRoute = require('./routes/fixas/fixasRoute');
const authRoute = require('./routes/auth/auth');
const { FIXAS, AUTH, USERS } = require('./constants/routes');


dotenv.config();

const port = process.env.PORT || 5000;

const app = express();
// Enable cors
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))
app.use(morgan('combined'));

// Add body parser to our app
// so we can send data to our app
app.use(express.json()); // because we're going to be sending json data


connectToDb();

app.use(AUTH, authRoute());
app.use(FIXAS, fixasRoute());

app.listen(port, () => {
    console.log(`app runing on port ${port}`);
});