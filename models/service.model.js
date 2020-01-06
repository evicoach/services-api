const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const serviceSchema = new Schema({
    author: ObjectId,
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    shortDescription: Date,
    favorite: false
}, {
    timestamps: true
});

const Service = mongoose.model('Service', userSchema);

module.exports = Service;