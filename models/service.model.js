const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    owner: { type: String, required: true },
    title: { type: String, required: true },
    imageUrls: { type: Array, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true }
}, {
    timestamps: true
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;