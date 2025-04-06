const httpStatus = require('http-status-codes');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

//REMOVE PASSWORD
const hidePasswordUser = (user) => {
  const userObj = user.toObject();
  delete userObj.password;
  return userObj;
};

//CREATE USER
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

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ fullname, email, password: hashedPassword });

    res.status(httpStatus.CREATED).json({
      statusCode: httpStatus.CREATED,
      message: 'Tạo người dùng thành công.',
      data: {
        user,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: 'Đã xảy ra lỗi.',
      data: {},
    });
  }
};

//GET USERS
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users.length) {
      return res.status(httpStatus.NOT_FOUND).json({
        statusCode: httpStatus.NOT_FOUND,
        message: 'Không có người dùng nào!',
      });
    }

    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      message: 'Danh sách người dùng:',
      data: { users: users.map(hidePasswordUser) },
    });
  } catch (err) {
    console.log(err);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: 'Đã xảy ra lỗi.',
      data: {},
    });
  }
};

//GET USER BY ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        statusCode: httpStatus.NOT_FOUND,
        message: 'Không tìm thấy người dùng!',
      });
    }

    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      message: 'Lấy thông tin người dùng thành công',
      data: { user: hidePasswordUser(user) },
    });
  } catch (err) {
    console.error('Lỗi:', err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: 'Lỗi máy chủ khi lấy người dùng theo ID!',
    });
  }
};

//UPDATE USER BY ID
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedUser) {
      return res.status(httpStatus.NOT_FOUND).json({
        statusCode: httpStatus.NOT_FOUND,
        message: 'Không tìm thấy người dùng!',
      });
    }

    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      message: 'Cập nhật người dùng thành công!',
      data: { user: hidePasswordUser(updatedUser) },
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: 'Cập nhật người dùng thất bại!',
    });
  }
};

// DELETE USER BY ID
const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        statusCode: httpStatus.NOT_FOUND,
        message: 'Không tìm thấy người dùng!',
      });
    }

    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      message: 'Xóa người dùng thành công!',
    });
  } catch (err) {
    console.error('Lỗi:', err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: 'Xóa người dùng thất bại!',
    });
  }
};

// SEARCH USER BY NAME
const searchUserByName = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(httpStatus.BAD_REQUEST).json({
        statusCode: httpStatus.BAD_REQUEST,
        message: 'Thiếu tham số tên để tìm kiếm!',
      });
    }

    const users = await User.find({
      fullname: { $regex: name, $options: 'i' },
    });

    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      message: 'Tìm kiếm người dùng thành công!',
      data: { users: users.map(hidePasswordUser) },
    });
  } catch (err) {
    console.error('Lỗi:', err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: 'Lỗi máy chủ khi tìm kiếm người dùng!',
    });
  }
};

module.exports = {
  createUser,
  getUsers,
  updateUser,
  getUserById,
  deleteUserById,
  searchUserByName,
};
