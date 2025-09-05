const { boolean } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    location: {
        type: String,
        required: [true, 'Location is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
    },
    image: {
        type: String,
        required: [true, 'Image URL is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    }
});

module.exports = mongoose.model('Campground', CampgroundSchema)

