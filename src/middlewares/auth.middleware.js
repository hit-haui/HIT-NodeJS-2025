const httpStatus = require('http-status-codes');

const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { extractToken, verifyToken } = require('../utils/jwt');

const auth = catchAsync(async (req, res, next) => {
  const token = extractToken(req);
  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Vui lòng đăng nhập');
  }

  const payload = verifyToken(token);

  const { id } = payload;
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Người dùng không tồn tại');
  }

  req.user = user;
  next();
});

const adminRoute = catchAsync(async (req, res, next) => {
  if (req.user.role !== 'admin') {
    throw new ApiError(httpStatus.FORBIDDEN, 'Bạn không có quyền truy cập vào tài nguyên này');
  }
  next();
});

module.exports = {
  auth,
  adminRoute,
};
