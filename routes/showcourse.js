const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

router.get('/', async (req, res) => {
    try {
      const courses = await Course.find({});
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).send({ message: 'An error occurred' });
    }
  });

module.exports = router;
