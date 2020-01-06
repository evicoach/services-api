const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;