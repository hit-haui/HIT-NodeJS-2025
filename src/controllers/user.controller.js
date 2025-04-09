const bcrypt = require('bcrypt');
const httpStatus = require('http-status-codes');
const errorHandler = require('../middlewares/error.middleware');
const User = require('../models/user.model');
const { SALT_ROUND } = require('../constants/user.constanst');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const createUser = async (req, res, next) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Thieu thong tin nguoi dung');
    }

    const isExist = await User.findOne({ email });

    if (isExist) {
      return res.status(httpStatus.CONFLICT).json({
        statusCode: httpStatus.CONFLICT,
        message: 'Người dùng đã tồn tại',
        data: {},
      });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUND);

    const user = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });

    const _user = user.toObject();
    delete _user.password;
    res.status(httpStatus.CREATED).json({
      statusCode: httpStatus.CREATED,
      message: 'Tạo người dùng thành công.',
      data: {
        _user,
      },
    });
  } catch (err) {
    next(err);
  }
};

// const getUsers = async (req, res) => {
// try {
//   const users = await User.find();
//   res.status(httpStatus.OK).json({
//     statusCode: httpStatus.OK,
//     message: 'Lấy danh sách người dùng thành công.',
//     data: {
//       users,
//     },
//   });
// } catch (err) {
//   return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//     statusCode: httpStatus.INTERNAL_SERVER_ERROR,
//     message: 'Đã xảy ra lỗi.',
//     data: {},
//   });
// }

// };
const getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  if (!users) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy người dùng');
  }
  res.status(httpStatus.OK).json(users);
});

const updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy người dùng');
  }

  Object.assign(user, req.body);

  await user.save();

  res.status(httpStatus.OK).json(users);
});

const deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy người dùng');
  }

  await user.remove();

  res.status(httpStatus.OK).json(users);
});

const searchUserByName = async (req, res) => {
  const { name } = req.query;
  const users = await User.find({ fullname: { $regex: name, $options: 'i' } });

  res.status(httpStatus.OK).json(users);
};

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  searchUserByName,
};
