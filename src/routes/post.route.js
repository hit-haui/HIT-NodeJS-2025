const express = require('express');

const { auth } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const postController = require('../controllers/post.controller');
const postValidation = require('../validations/post.validation');

const router = express.Router();

router.post('/', auth, validate(postValidation.createPost), postController.createPost);

router.get('/', postController.getPosts);

router.get('/:id', validate(postValidation.getPost), postController.getPost);

router.put('/:id', auth, validate(postValidation.updatePost), postController.updatePost);

router.delete('/:id', auth, validate(postValidation.deletePost), postController.deletePost);

module.exports = router;
