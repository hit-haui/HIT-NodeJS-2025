const bcrypt = require('bcrypt');
const httpStatus = require('http-status-codes');

const User = require('../models/user.model');
const { SALT_ROUND } = require('../constants/user.constanst');

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

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        statusCode: httpStatus.NOT_FOUND,
        message: 'Người dùng không tồn tại.',
        data: {},
      });
    }

    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      message: 'Lấy thông tin người dùng thành công.',
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

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        statusCode: httpStatus.NOT_FOUND,
        message: 'Người dùng không tồn tại.',
        data: {},
      });
    }

    await user.remove();

    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      message: 'Xóa người dùng thành công.',
      data: {},
    });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: 'Đã xảy ra lỗi.',
      data: {},
    });
  }
};

const searchUserByName = async (req, res) => {
  try {
    const { name } = req.query;
    const users = await User.find({ fullname: { $regex: name, $options: 'i' } });
    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      message: 'Tìm kiếm người dùng thành công.',
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

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  searchUserByName,
};
