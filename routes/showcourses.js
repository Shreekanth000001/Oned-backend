const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

router.get('/:faculty', async (req, res) => {
    try {
        const faculty = req.params.faculty; // Correctly access courseId from the URL path

      const courses = await Course.find({category: faculty});
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).send({ message: 'An error occurred' });
    }
  });

module.exports = router;
