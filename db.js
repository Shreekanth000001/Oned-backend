const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://shreekanthk000001:tms1BvMs8wnDgLv2@oneddb.ao8aqdv.mongodb.net/';


const connecToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
};


module.exports = connecToMongo