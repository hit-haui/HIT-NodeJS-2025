const express = require('express');
const router = express.Router();

const validate = require('../middlewares/validate.middleware');
const catchAsync = require('../utils/catchAsync');
const postController = require('../controllers/post.controller')

router.post('/', catchAsync(postController.createPost));

router.get('/', catchAsync(postController.getPosts));

router.get('/:id', catchAsync(postController.getPost));

router.put('/:id', catchAsync(postController.updatePost));

router.delete('/:id', catchAsync(postController.deletePost));
 
module.exports = router;