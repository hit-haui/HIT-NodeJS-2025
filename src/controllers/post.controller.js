const httpStatus = require('http-status-codes');
const Post = require('../models/post.model');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');

const createPost = catchAsync(async (req, res) => {
  const post = await Post.create(req.body);
  res.status(httpStatus.CREATED).json({
    statusCode: httpStatus.CREATED,
    message: 'Tạo bài viết thành công',
    data: {
      post: post,
    },
  });
});

const getPost = catchAsync(async (req, res) => {
  const post = await Post.find();
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'danh sách trống!');
  }
  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    message: 'hiển thị danh sách bài viết thành công',
    data: {
      post: post,
    },
  });
});

const getPostById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    message: `lấy bài viết theo id ${id} thành công`,
    data: {
      post: post,
    },
  });
});

const updatePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById({ _id: id });
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'id không tồn tại!');
  }
  Object.assign(post, req.body);
  await post.save();

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    message: `cập nhật viết theo id ${id} thành công`,
    data: {
      post: post,
    },
  });
});

const deletePost = catchAsync(async (req, res) => {
  const { id } = req.params;

  const deletedPost = await Post.findByIdAndDelete(id);

  if (!deletedPost) {
    throw new ApiError(httpStatus.CONFLICT, 'id không tồn tại!');
  }

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    message: `Xoá thành công bài viết có ID: ${id}`,
    data: {
      post: deletedPost,
    },
  });
});

module.exports = {
  createPost,
  getPost,
  getPostById,
  updatePost,
  deletePost,
};
