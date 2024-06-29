const express = require('express')
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const JWS_SECRET = 'password';
const fetchuser = require('../middleware/fetchuser');

router.post('/', fetchuser,
    async (req, res) => {
        try {
            const userid = req.user.id;
            const user = await User.findById(userid).select("-password");
            res.send(user);

        } catch (error) {
            res.status(500).send('Internal server error');
        }

    });

router.post('/savedcourses',
    async (req, res) => {
        try {
            const userid = req.body.userid;
            const savedcourses = await User.findById(userid).select("savedcourses -_id");
            res.send(savedcourses);

        } catch (error) {
            res.status(500).send("Internal server error");
        }

    })

module.exports = router;
