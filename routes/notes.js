const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

router.get('/',
    async (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            try {
                const newNotes = await Notes.create({
                    slno: req.body.slno,
                    courseid: req.body.courseid,
                    module: req.body.module,
                    url: req.body.url
                });
                console.log("Success in adding Lesson");
                res.send(newNotes);
            } catch (error) {
                res.status(500).send({ message: "An unexpected error occurred while creating the Lesson." });
            }
        } else {
            res.send({ errors: errors.array() });
        }
    })

module.exports = router;