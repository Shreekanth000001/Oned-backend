const mongoose = require('mongoose');
const { Schema } = mongoose;

const notesSchema = new Schema({
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
    module: {
        type: Number
    },
    url: {
        type: String
    },
    doi: { type: Date, default: Date.now },
});

const Notes = mongoose.model('notes', notesSchema);
Notes.createIndexes();
module.exports = Notes;