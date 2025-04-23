const express = require('express');

const validate = require('../middlewares/validate.middleware');
const postController = require('../controllers/post.controller');
const postValidation = require('../validations/post.validation');

const router = express.Router();

router.post('/', validate(postValidation.createPost), postController.createPost);

router.get('/', postController.getPosts);

router.get('/:id', validate(postValidation.getPost), postController.getPost);

router.put('/:id', validate(postValidation.updatePost), postController.updatePost);

router.delete('/:id', validate(postValidation.deletePost), postController.deletePost);

module.exports = router;
