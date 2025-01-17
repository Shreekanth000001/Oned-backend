const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phoneno:{
    type:String
  },
  savedcourses:[{
    type: Schema.Types.ObjectId,
    ref:'Course'
  }],
  doj: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);
User.createIndexes();
module.exports = User;