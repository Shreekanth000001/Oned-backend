const mongoose = require('mongoose');
const { Schema } = mongoose;

const userInfoSchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: function(userId) {
                return!!this.model('User').findById(userId);
            },
            message: props => `${props.value} is not a valid user ID`
        }
    },
  age: {
    type: String,
  },
  gender: {
    type: String,
  },
  industry: {
    type: String,
  },
  employment: {
    type: String,
  },
  degree: {
    type: String,
  },
  skillLvl: {
    type: String,
    required: true,
  },
  favWayToLearn: {
    type: String,
    required: true
  },
  goal: {
    type: String,
    required: true
  },
  doj: { type: Date, default: Date.now },
});

const Userinfo = mongoose.model('Userinfo', userInfoSchema);
Userinfo.createIndexes();
module.exports = Userinfo;