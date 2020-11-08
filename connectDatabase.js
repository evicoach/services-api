const mongoose = require('mongoose');

const connectToDb = async () => {
    const uri = process.env.ATLAS_URI;
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).catch(err => { console.log('Error connecting to database', err); });
    const connection = mongoose.connection;
    connection.once('open', () => {
        console.log(`MongoDB Connected: ${connection.host}`);
    }).catch(err => { console.log('Could not connect to database'); });
}

module.exports = connectToDb;