const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: 10,
        required: true,
    },
    content: {
        type: String,
        minLength: 20,
        required: true,
    },
    tags: {
        type: [String],
        default: [],
        required: false,
    }
})

const Post = mongoose.model('Post', postSchema, 'posts');

module.exports = Post;