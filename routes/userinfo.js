const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Userinfo = require('../models/Userinfo');
const Userpass = require('../models/Userpass');
const User = require('../models/User');
const { validationResult } = require('express-validator');

router.post('/g',
    async (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            try {
                const userid = req.body.userid;
                const userinfo = await Userinfo.find({ userid: userid });
                res.json(userinfo);
            } catch (error) {
                res.status(500).send({ error: 'Error while fetching user info' });
            }

        } else {
            res.send({ errors: errors.array() });
        }
    }
)

router.post('/p',
    async (req, res) => {
        const errors = validationResult(req);
        const { userid, age, gender, industry, employment, degree, goal } = req.body;
        if (errors.isEmpty()) {
            try {
                const userinfo = await Userinfo.findOne({ userid: userid });
                if (!userinfo) {
                    return res.status(404).json({ error: 'User info not found' });
                }

                await userinfo.updateOne({
                    age: age,
                    gender: gender,
                    industry: industry,
                    employment: employment,
                    degree: degree,
                    goal: goal,
                });
                res.send({ message: 'Updated Succefully!' });
            } catch (error) {
                res.status(500).send({ message: "An unexpected error occurred while creating the course." });
            }
        } else {
            res.send({ errors: errors.array() });
        }
    })

router.post('/sp',
    async (req, res) => {
        const errors = validationResult(req);
        let { userid, email, password, phoneno } = req.body;
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        if (errors.isEmpty()) {
            try {
                const userinfo = await User.findById(userid);
                const userpass = await Userpass.find({ userid: userid });

                if (!userinfo) {
                    return res.status(404).json({ error: 'User info not found' });
                }
                if (email === '') {
                    email = userinfo.email;
                }
                if (password === '') {
                    password = userinfo.password;
                } else {
                    password = secPass;
                }
                if (phoneno === '') {
                    phoneno = userinfo.phoneno;
                }

                await userinfo.updateOne({
                    email: email,
                    password: password,
                    phoneno: phoneno,
                });

                await Userpass.updateOne({
                    password: req.body.password
                });
                res.send({ message: 'Updated Succefully!' });
            } catch (error) {
                res.status(500).send({ message: "An unexpected error occurred while updating the user" });
            }
        } else {
            res.send({ errors: errors.array() });
        }
    })

module.exports = router;