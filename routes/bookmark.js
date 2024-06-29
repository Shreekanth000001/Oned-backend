const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { validationResult } = require('express-validator');

router.post('/',
    async (req, res) => {
        const errors = validationResult(req);
        const userid = req.body.userid;
        if (errors.isEmpty()) {
            try {
                await User.findByIdAndUpdate(userid, {
                    $addToSet:
                        { savedcourses: req.body.courseid },
                });
                res.status(200).send({ message: "Saved the course" });
            } catch (error) {
                res.status(500).send({ error: "An unexpected error occurred while saving the course" });
            }
        } else {
            res.send({ errors: errors.array() });
        }
    })

router.post('/remove',
    async (req, res) => {
        const errors = validationResult(req);
        const userid = req.body.userid;
        if (errors.isEmpty()) {
            try {
                await User.findByIdAndUpdate(userid,
                    { $pull: { savedcourses: req.body.courseid } },
                    { new: true });
                res.status(200).send({ message: "unsaved the course" });
            } catch (error) {
                console.log(error);
                res.status(500).send({ error: "An unexpected error occurred while unsaving the course" });
            }
        } else {
            res.send({ errors: errors.array() });
        }
    })

module.exports = router;