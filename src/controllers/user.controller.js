const httpStatus = require('http-status-codes');

const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const createUser = catchAsync(async (req, res) => {
  const { email } = req.body;
  const isExist = await User.findOne({ email });

  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, 'Người dùng đã tồn tại');
  }

  const user = await User.create(req.body);

  const userData = user.toObject();
  delete userData.password;

  res.status(httpStatus.CREATED).json({
    statusCode: httpStatus.CREATED,
    message: 'Tạo người dùng thành công.',
    data: {
      user: userData,
    },
  });
});

const getUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    message: 'Lấy danh sách người dùng thành công.',
    data: {
      users,
    },
  });
});

const getUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Người dùng không tồn tại');
  }

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    message: 'Lấy thông tin người dùng thành công.',
    data: {
      user,
    },
  });
});

const updateUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Người dùng không tồn tại');
  }

  const { email, password } = req.body;

  if (email) {
    const isExist = await User.findOne({ email, _id: { $ne: user._id } });
    if (isExist) {
      throw new ApiError(httpStatus.CONFLICT, 'Email đã tồn tại');
    }
  }

  Object.assign(user, req.body);

  await user.save();

  const userData = user.toObject();
  delete userData.password;

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    message: 'Cập nhật người dùng thành công.',
    data: {
      user: userData,
    },
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Người dùng không tồn tại');
  }

  await User.deleteOne({ _id: req.params.id });

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    message: 'Xóa người dùng thành công.',
    data: {},
  });
});

const searchUserByName = catchAsync(async (req, res) => {
  const { name } = req.query;
  const users = await User.find({ fullname: { $regex: name, $options: 'i' } });
  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    message: 'Tìm kiếm người dùng thành công.',
    data: {
      users,
    },
  });
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  searchUserByName,
};
