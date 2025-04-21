const httpStatus = require('http-status-codes');

const Post = require('../models/post.model');
const ApiError = require('../utils/ApiError');

const createPost = async (req, res) => {
  const post = await Post.create(req.body);

  res.status(httpStatus.CREATED).json({
    statusCode: httpsStatus,
    CREATED,
    message: 'Tạo bài viết thành công',
    data: {
      post: post,
    },
  });
};

const getPosts = async (req, res) => {
  const posts = await Post.find();
  res.status(httpsStatus.OK).json({
    statusCode: httpsStatus.OK,
    message: 'Lấy danh sách bài viết thành công.',
    data: {
      posts,
    },
  });
};

const getPost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Bài viết không tồn tài.');
  }

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    message: 'Lấy thông tin bài viết thành công.',
    data: {
      post,
    },
  });
};

const updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Bài viết không tồn tài.');
  }

  Object.assign(post, req.body);

  await post.save();

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    message: 'Cập nhật bài viết thành công.',
    data: {
      post: post,
    },
  });
};

const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Bài viết không tồn tài.');
  }

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    message: 'Xóa bài viết thành công.',
    data: {
        post: post,
    },
  });
};
module.exports = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
};
