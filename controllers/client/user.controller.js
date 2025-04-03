const httpStatus = require('http-status-codes');
const User = require('../../models/user.model');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      message: 'Lấy danh sách người dùng',
      data: {
        users,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const createUser = (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      res.status(httpStatus.BAD_REQUEST).json({
        statusCode: httpStatus.BAD_REQUEST,
        message: 'Vui lòng nhập đủ các trường',
        data: {},
      });
      return;
    }

    const isExistEmail = User.findOne({ email: email });
    if (isExistEmail) {
      res.status(httpStatus.BAD_REQUEST).json({
        statusCode: httpStatus.BAD_REQUEST,
        message: 'Email đã tồn tại',
        data: {},
      });
      return;
    }

    const user = User.create(req.body);
    res.status(httpStatus.CREATED).json({
      statusCode: httpStatus.CREATED,
      message: 'Tạo người dùng thành công.',
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getUsers, createUser };
