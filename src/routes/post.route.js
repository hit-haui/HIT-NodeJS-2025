const express = require('express');
const router = express.Router();

const validate = require('../middlewares/validate.middleware');
const postController = require('../controllers/post.controller');
const postValidation = require('../validations/post.validation');

router.post('/', validate(postValidation.createPost), postController.createPost);

router.get('/', postController.getAllPosts);

router.get('/:id', validate(postValidation.getPostById), postController.getPostById);

router.put('/:id', validate(postValidation.updatePost), postController.updatePost);

router.delete('/:id', validate(postValidation.deletePost), postController.deletePost);

router.get('/search', validate(postValidation.searchPostByTitle), postController.searchPostByTitle);

module.exports = router;
