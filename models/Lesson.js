const mongoose = require('mongoose');
const { Schema } = mongoose;

const lessonSchema = new Schema({
    slno: {
        type: Number
    },
    courseid: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
        validate: {
            validator: function(courseId) {
                return!!this.model('Course').findById(courseId);
            },
            message: props => `${props.value} is not a valid courseId`
        }
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    module: {
        type: Number
    },
    url: {
        type: String
    },
    doi: { type: Date, default: Date.now },
});

const Lesson = mongoose.model('Lesson', lessonSchema);
Lesson.createIndexes();
module.exports = Lesson;