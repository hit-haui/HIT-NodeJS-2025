const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    require : true
  },
  email:{
    type: String,
    require: true,
  },
  password:{
    type: String,
    require: true,
  },
  avatar:{
    type: String,
    require: false,
    default: ' ',
  }

})

const User = mongoose.model('User', userSchema);

module.exports = User;