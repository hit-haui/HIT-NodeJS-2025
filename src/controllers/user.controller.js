const httpStatus = require('http-status-codes');

const User = require('../models/user.model');
//===============================bcrypt===================================
const bcrypt = require('bcrypt');
const { emailRegex } = require('../common/regex');
const saltRounds = 10;

//===============================create user===============================
const createUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.status(httpStatus.BAD_REQUEST).json({
        statusCode: httpStatus.BAD_REQUEST,
        message: 'Vui lòng điền đủ thông tin.',
        data: {},
      });
    }

    if (!emailRegex.test(email)) {
      return res.status(httpStatus.BAD_REQUEST).json({
        statusCode: httpStatus.BAD_REQUEST,
        message: 'Email không hợp lệ.',
        data: {},
      });
    }

    const isExist = await User.findOne({ email: email.toLowerCase() });

    if (isExist != null) {
      return res.status(httpStatus.NOT_FOUND).json({
        statusCode: httpStatus.NOT_FOUND,
        message: 'Email này đã được sử dùng!',
        data: {},
      });
    }

    const user = req.body;

    user.password = await bcrypt.hash(password, saltRounds);

    await User.create(user);

    res.status(httpStatus.CREATED).json({
      statusCode: httpStatus.CREATED,
      message: 'Tạo người dùng thành công.',
      data: {
        user,
      },
    });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: 'Đã xảy ra lỗi.',
      data: {},
    });
  }
};

//===============================get Users==============================
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      message: 'Lấy danh sách người dùng thành công.',
      data: {
        users,
      },
    });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: 'Đã xảy ra lỗi.',
      data: {},
    });
  }
};

//===============================get User By Id===============================
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user === null) {
      res.status(httpStatus.NOT_FOUND).json({
        statusCode: httpStatus.NOT_FOUND,
        message: 'Người dùng không tồn tại',
      });
      return;
    }

    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      message: 'Lấy người dùng thành công',
      data: user,
    });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: 'Đã xảy ra lỗi.',
      data: {},
    });
  }
};
//===============================update User===============================
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        statusCode: httpStatus.NOT_FOUND,
        message: 'Người dùng không tồn tại.',
        data: {},
      });
    }

    Object.assign(user, req.body);

    await user.save();

    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      message: 'Cập nhật người dùng thành công.',
      data: {
        user,
      },
    });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: 'Đã xảy ra lỗi.',
      data: {},
    });
  }
};

//===============================delete User===============================
const deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user === null) {
      return res.status(httpStatus.NOT_FOUND).json({
        statusCode: httpStatus.NOT_FOUND,
        message: 'Người dùng không tồn tại.',
        data: {},
      });
    } else {
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        message: 'Đã xóa người dùng.',
        data: user,
      });
    }
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: 'Có lỗi xảy ra khi xóa người dùng.',
      data: {},
    });
  }
};
//=============================================================================

const searchUserByName = async (req, res) => {
  try {
    const { name } = req.query;

    const users = await User.find({ fullname: new RegExp(`.*${name}.*`, 'i') });

    if (users.length === 0) {
      return res.status(httpStatus.NOT_FOUND).json({
        statusCode: httpStatus.NOT_FOUND,
        message: 'Người dùng không tồn tại.',
        data: {},
      });
    }

    return res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      message: 'Tìm người dùng thanh công.',
      data: users,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: 'Đã xảy ra lỗi.',
      data: {},
    });
  }
};

module.exports = {
  createUser,
  getUsers,
  updateUser,
  searchUserByName,
  getUserById,
  deleteUserById,
};
