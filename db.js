const mongoose = require('mongoose');

const mongoURI = 'mongodb://0.0.0.0:27017/oned';

const connecToMongo = async () => {
    const conn = await mongoose.connect(mongoURI)
        .then((result) => {
            console.log('success');
        }).catch((err) => {
            console.log('no success', err);
        });



}


module.exports = connecToMongo