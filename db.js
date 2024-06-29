const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://shreekanthk000001:tms1BvMs8wnDgLv2@oneddb.ao8aqdv.mongodb.net/';

const connecToMongo = async () => {
    const conn = await mongoose.connect(mongoURI)
        .then((result) => {
            console.log('success');
        }).catch((err) => {
            console.log('no success', err);
        });



}


module.exports = connecToMongo