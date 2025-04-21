const httpStatus = require('http-status-codes');

const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');


const createUser = async (req, res) => {
  const { email } = req.body;
  const isExist = await User.findOne({ email });

  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, 'Người dùng đã tồn tại');
  }

  const user = await User.create(req.body);

  res.status(httpStatus.CREATED).json({
    statusCode: httpStatus.CREATED,
    message: 'Tạo người dùng thành công.',
    data: {
      user: user,
    },
  });
};

const getUsers = async (req, res) => {
  const users = await User.find();
  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    message: 'Lấy danh sách người dùng thành công.',
    data: {
      users,
    },
  });
};

const getUser = async (req, res) => {
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
};

const updateUser = async (req, res) => {
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

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    message: 'Cập nhật người dùng thành công.',
    data: {
      user: user,
    },
  });
};

const deleteUser = async (req, res) => {
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
};

const searchUserByName = async (req, res) => {
  const { name } = req.query;
  const users = await User.find({ fullname: { $regex: name, $options: 'i' } });

  if (users.length == 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Người dùng không tồn tại')
  }

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    message: 'Tìm kiếm người dùng thành công.',
    data: {
      users,
    },
  });
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  searchUserByName,
};
