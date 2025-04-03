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
      data: {},
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      console.log(fullName, email, password);
      res.status(httpStatus.BAD_REQUEST).json({
        statusCode: httpStatus.BAD_REQUEST,
        message: 'Vui lòng nhập đủ các trường',
        data: {},
      });
      return;
    }

    const isExistEmail = await User.findOne({ email: email });
    if (isExistEmail) {
      res.status(httpStatus.CONFLICTT).json({
        statusCode: httpStatus.CONFLICTT,
        message: 'Email đã tồn tại',
        data: {},
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
      data: {},
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
        data: {},
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
      data: {},
    });
  }
};

module.exports = { getUsers, createUser, updateUser };
