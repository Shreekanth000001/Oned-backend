const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const Notes = require('../models/Notes');

router.get('/:courseId', async (req, res) => {
    try {
        const courseId = req.params.courseId; // Correctly access courseId from the URL path

        // Find the course by its ID
        const course = await Course.findById(courseId);

        // Check if the course was found
        if (!course) {
            return res.status(404).send({ message: 'Course not found' });
        }
        const lessons = await Lesson.find({ courseid: courseId });
        const notes = await Notes.find({ courseid: courseId });

        // Merge the course and lessons
        const mergedData = {
            ...course.toObject(),
            lessons,
            notes
        };

        // Send the merged data
        res.status(200).json(mergedData);
    } catch (error) {
        res.status(500).send({ message: 'An error occurred' });
    }
});

module.exports = router;
