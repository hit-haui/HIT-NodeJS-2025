const { v4: uuidv4 } = require('uuid');
const httpStatus = require('http-status-codes');
const UserModel = require('../models/user');
const createUser = (req, res) => {
  const { name, email, phone, birthday } = req.body;

  const newUser = new UserModel({
    name,
    email,
    phone,
    birthday,
  });

  newUser
    .save()
    .then((user) => {
      res.status(httpStatus.CREATED).json({
        statusCode: httpStatus.CREATED,
        message: 'Tạo người dùng thành công',
        data: {
          user,
        },
      });
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: 'Có lỗi xảy ra khi tạo người dùng',
        error: error.message,
      });
    });
};

// Get all users
const getUsers = async (req, res) => {
  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    message: 'Lấy danh sách người dùng thành công',
    data: await UserModel.find({}),
  });
};

// Get user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);

    if (user === null) {
      res.status(httpStatus.NOT_FOUND).json({
        statusCode: httpStatus.NOT_FOUND,
        message: 'Người dùng không tồn tại',
      });
      return;
    }

    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      message: 'Lấy người dùng theo ID thành công',
      data: user,
    });
  } catch (e) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: 'có lỗi khi lấy người dùng',
    });
  }
};

// Update user by ID
const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, birthday } = req.body;
  try {
    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      message: 'Cập nhật người dùng theo ID thành công',
      data: await UserModel.findByIdAndUpdate(id, { name, email, phone, birthday }, { new: true, runValidators: true }),
    });
  } catch (e) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: 'Có lỗi khi cập nhật người dùng',
    });
  }
};

// Delete user by ID
const deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      message: 'Xóa người dùng theo ID thành công',
      data: await UserModel.findByIdAndDelete(id),
    });
  } catch (e) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: 'Người dùng không tồn tại',
    });
  }
};

//Verify user by ID
const verifyUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const isVerify = await UserModel.findById(id, 'isVerify');

    if (isVerify === null) {
      res.status(httpStatus.NOT_FOUND).json({
        statusCode: httpStatus.NOT_FOUND,
        message: 'Người dùng không tồn tại',
      });
      return;
    }

    if (isVerify.isVerify === false) {
      res.status(httpStatus.NOT_ACCEPTABLE).json({
        statusCode: httpStatus.OK,
        message: 'Người dùng chưa được xác minh vui lòng liên hệ admin để được xác minh',
        data: false,
      });
    } else {
      res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        message: 'Xác minh người dùng theo ID thành công',
        data: isVerify.isVerify,
      });
    }
  } catch (e) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: 'Xác minh người dùng theo ID không thành công, vui lòng liên hệ admin để được hỗ trợ',
    });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  verifyUserById,
};
