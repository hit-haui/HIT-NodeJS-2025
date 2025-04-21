const express = require('express');
const router = express.Router();

const postController = require('../controllers/post.controller');
const validate = require('../middlewares/validate.middleware');
const postValidation = require('../validations/post.validation');

router.post('/', validate(postValidation.createPost), postController.createPost);

router.get('/', postController.getPost);

router.get('/:id', validate(postValidation.postId), postController.getPostById);

router.put('/:id', validate(postValidation.postId), validate(postValidation.updatePost), postController.updatePost);

router.delete('/:id', validate(postValidation.postId), postController.deletePost);

module.exports = router;
