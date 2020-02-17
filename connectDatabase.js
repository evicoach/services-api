const mongoose = require('mongoose');

const connectToDb = () => {
    const uri = process.env.ATLAS_URI;
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).catch(err => { console.log('Error connecting to database'); });
    const connection = mongoose.connection;
    connection.once('open', () => {
        console.log('Mongodb connected successfully');
    }).catch(err => { console.log('Could not connect to database'); });
}

module.exports = connectToDb;