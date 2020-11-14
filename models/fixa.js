const mongoose = require('mongoose');
const geocoder = require('../utils/goecoder')

const FixaSchema = new mongoose.Schema({
    fixaId: {
        type: String,
        required: [true, 'Please add a fixa ID'],
        trim: true,
        unique: true,
        maxlength: [10, 'Fixa ID must be less than 10 characters'],
    },
    name: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image_urls: { type: Array, required: true },
    address: {
        type: String,
        required: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, {timestamps: true});

FixaSchema.index({ location: "2dsphere" });

// Geocode & create location
// FixaSchema.pre('save', async function(next){
//     const loc = await geocoder.geocode(this.address);
//     console.log(loc);
//     this.location = {
//         type: 'Point', 
//         coordinates: [loc[0].longitude, loc[0].latitude],
//         formattedAddress: loc[0].formattedAddress,
//     } // end of location object

//     this.address = undefined;
//     next();
// });

module.exports = mongoose.model('Fixa', FixaSchema);