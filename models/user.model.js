const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    }, 

    salt: {
        type: String,
        required: true
    }, 

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    role: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;