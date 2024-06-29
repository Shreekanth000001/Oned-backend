const express = require('express');
const router = express.Router();
const Lesson = require('../models/Lesson');
const {validationResult } = require('express-validator');

router.get('/',
    async (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            try {
                const newLesson = await Lesson.create({
                    slno: req.body.slno,
                    courseid: req.body.courseid,
                    name: req.body.name,
                    description: req.body.description,
                    module: req.body.module,
                    url: req.body.url
                });
                console.log("Success in adding Lesson");
                res.send(newLesson);
            } catch (error) {
                res.status(500).send({ message: "An unexpected error occurred while creating the Lesson." });
            }
        } else {
            res.send({ errors: errors.array() });
        }
    })

module.exports = router;