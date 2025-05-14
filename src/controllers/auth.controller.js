const bcrypt = require('bcrypt');
const httpStatus = require('http-status-codes');

const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { generateToken } = require('../utils/jwt');

const register = catchAsync(async (req, res) => {
  const { email } = req.body;
  const isExist = await User.findOne({ email });

  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, 'Người dùng đã tồn tại');
  }

  await User.create(req.body);

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    message: 'Đăng ký thành công.',
    data: {},
  });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Sai tài khoản hoặc mật khẩu');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Sai tài khoản hoặc mật khẩu');
  }

  const token = generateToken(user._id);

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    message: 'Đăng nhập thành công.',
    data: {
      token,
    },
  });
});

module.exports = {
  register,
  login,
};
