const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { string, required } = require('joi');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    required: false,
  },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
