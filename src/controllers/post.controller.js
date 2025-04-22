const httpStatus = require('http-status-codes');

const Post = require('../models/post.model');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

//CREATE A NEW POST
const createPost = catchAsync(async (req, res) => {
  const { title } = req.body;

  const isExist = await Post.findOne({ title });
  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, 'Bài viết đã tồn tại!');
  }

  const post = await Post.create(req.body);
  res.status(httpStatus.CREATED).json({
    statusCode: httpStatus.CREATED,
    message: 'Tạo bài viết thành công.',
    data: {
      post,
    },
  });
});

//GET ALL POSTS
const getAllPosts = catchAsync(async (req, res) => {
  const posts = await Post.find();
  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    message: 'Lấy danh sách bài viết thành công.',
    data: {
      posts,
    },
  });
});

//GET POST BY ID
const getPostById = catchAsync(async (req, res) => {
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

//UPDATE POST
const updatePost = catchAsync(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Bài viết không tồn tại');
  }

  const { title } = req.body;
  if (title) {
    const isExist = await Post.findOne({ title, _id: { $ne: post._id } });
    if (isExist) {
      throw new ApiError(httpStatus.CONFLICT, 'Tiêu đề bài viết đã tồn tại');
    }
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

// DELETE POST
const deletePost = catchAsync(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Bài viết không tồn tại');
  }

  await Post.deleteOne({ _id: req.params.id });
  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    message: 'Xóa bài viết thành công.',
    data: {},
  });
});

// SEARCH POST BY TITLE
const searchPostByTitle = catchAsync(async (req, res) => {
  const { title } = req.query;
  const posts = await Post.find({ title: { $regex: title, $options: 'i' } });
  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    message: 'Tìm kiếm bài viết thành công.',
    data: {
      posts,
    },
  });
});

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  searchPostByTitle,
};
