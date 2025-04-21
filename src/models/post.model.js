const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength:10,
  },
  content: {
    type: String,
    required: true,
    minlength:20,
  },
  tag: {
    type:[String],
    required: false,
  },
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;