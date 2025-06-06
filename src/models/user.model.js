const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const { SALT_ROUND } = require('../constants/user.constant');

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  avatar: {
    type: String,
    required: false,
    default: '',
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
});

userSchema.pre('save', function (next) {
  const user = this;

  if (user.isModified('password')) {
    bcrypt.hash(user.password, SALT_ROUND, function (err, hashedPassword) {
      if (err) return next(err);
      user.password = hashedPassword;
      next();
    });
  } else {
    next();
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
