const httpStatus = require('http-status-codes');
const User = require('../../models/user.model');
const bcrypt = require('bcryptjs');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    // .select('-password')
    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      message: 'Lấy danh sách người dùng',
      data: {
        users,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: 'Đã xảy ra lỗi',
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      res.status(httpStatus.BAD_REQUEST).json({
        statusCode: httpStatus.BAD_REQUEST,
        message: 'Vui lòng nhập đủ các trường',
      });
      return;
    }

    const isExistEmail = await User.findOne({ email: email });
    if (isExistEmail) {
      res.status(httpStatus.CONFLICT).json({
        statusCode: httpStatus.CONFLICT,
        message: 'Email đã tồn tại',
      });
      return;
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const user = await User.create({
      fullName: fullName,
      email: email,
      password: hashPassword,
    });
    res.status(httpStatus.CREATED).json({
      statusCode: httpStatus.CREATED,
      message: 'Tạo người dùng thành công.',
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: 'Đã xảy ra lỗi',
    });
  }
};

const updateUser = async (req, res) => {
  try {
    // const user = await User.findById(req.params.id);
    // Object.assign(user, req.body);
    // await user.save();

    const userUpdate = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, userUpdate);
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        statusCode: httpStatus.NOT_FOUND,
        message: 'Người dùng không tồn tại',
      });
    }

    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      message: 'Cập nhật người dùng thành công.',
      data: {
        user,
      },
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: 'Đã xảy ra lỗi',
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id });
    if (!user || !id) {
      return res.status(httpStatus.NOT_FOUND).json({
        statusCode: httpStatus.NOT_FOUND,
        message: 'Người dùng không tồn tại',
      });
    }

    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      message: 'Lấy danh người dùng thành công',
      data: {
        user,
      },
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: 'Đã xảy ra lỗi',
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.deleteOne({ _id: id });
    if (!user || !id) {
      return res.status(httpStatus.NOT_FOUND).json({
        statusCode: httpStatus.NOT_FOUND,
        message: 'Người dùng không tồn tại',
      });
    }

    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      message: 'Xoá người dùng thành công',
      data: {
        user,
      },
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: 'Đã xảy ra lỗi',
    });
  }
};

const searchUserByName = async (req, res) => {
  try {
    const fullName = req.query.name;
    if (!fullName) {
      return res.status(httpStatus.BAD_REQUEST).json({
        statusCode: httpStatus.BAD_REQUEST,
        message: 'Tên tìm kiếm không được để trống',
      });
    }

    const user = await User.find({
      fullName: { $regex: fullName, $options: 'i' },
    });

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        statusCode: httpStatus.NOT_FOUND,
        message: 'Không tìm thấy người dùng',
      });
    }

    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      message: 'Tìm kiếm thành công',
      data: { user },
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: 'Đã xảy ra lỗi',
    });
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  searchUserByName,
  getUserById,
};
