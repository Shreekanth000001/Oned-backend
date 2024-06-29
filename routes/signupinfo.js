const express = require('express');
const router = express.Router();
const Userinfo = require('../models/Userinfo');
const {validationResult } = require('express-validator');

router.post('/',
    async (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            try {
                
                const newUserinfo = await Userinfo.create({
                    userid: req.body.userid,
                    skillLvl: req.body.skillLvl,
                    favWayToLearn: req.body.favWayToLearn,
                    goal: req.body.whyLearn,
                });
                res.send(newUserinfo);
            } catch (error) {
                res.status(500).send({ message: "An unexpected error occurred while creating the user info." });
            }
        } else {
            res.send({ errors: errors.array() });
        }
    })

module.exports = router;