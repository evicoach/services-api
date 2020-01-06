const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const service = new Schema({
    author: ObjectId,
    title: String,
    body: String,
    date: Date
});