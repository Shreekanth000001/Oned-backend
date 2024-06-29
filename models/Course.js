const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    img: {
        type: String
    },
    category: {
        type: String
    },
    module: {
        type: Number
    },
    doi: { type: Date, default: Date.now },
});

const Course = mongoose.model('Course', courseSchema);
Course.createIndexes();
module.exports = Course;