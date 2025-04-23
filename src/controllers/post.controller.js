const httpStatus = require('http-status-codes');

const Post = require('../models/post.model');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const createPost = catchAsync(async (req, res) => {
  const post = await Post.create(req.body);

  res.status(httpStatus.CREATED).json({
    statusCode: httpStatus.CREATED,
    message: 'Tạo bài viết thành công.',
    data: {
      post,
    },
  });
});

const getPosts = catchAsync(async (req, res) => {
  const posts = await Post.find();

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    message: 'Lấy danh sách bài viết thành công.',
    data: {
      posts,
    },
  });
});

const getPost = catchAsync(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Bài viết không tồn tại');
  }

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    message: 'Lấy thông tin bài viết thành công.',
    data: {
      post,
    },
  });
});

const updatePost = catchAsync(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Bài viết không tồn tại');
  }

  Object.assign(post, req.body);
  await post.save();

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    message: 'Cập nhật bài viết thành công.',
    data: {
      post,
    },
  });
});

const deletePost = catchAsync(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Bài viết không tồn tại');
  }

  await Post.deleteOne({ _id: req.params.id });

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    message: 'Xóa bài viết thành công.',
  });
});

module.exports = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
};
