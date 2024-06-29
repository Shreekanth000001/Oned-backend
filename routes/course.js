const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const { body, validationResult } = require('express-validator');

router.get('/',
    async (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            try {
                const newCourse = await Course.create({
                    name: req.body.name,
                    description: req.body.description,
                    img: req.body.img,
                    category: req.body.category
                });
                console.log("Success in adding course");
                res.send(newCourse);
            } catch (error) {
                res.status(500).send({ message: "An unexpected error occurred while creating the course." });
            }
        } else {
            res.send({ errors: errors.array() });
        }
    })

module.exports = router;