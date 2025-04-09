const httpStatus = require('http-status-codes');
const User = require('../models/user.model');


//createUser
const createUser = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    const user = await User.create(req.body);
    res.status(httpStatus.CREATED).json({
      statusCode: httpStatus.CREATED,
      message: 'tạo mới thành công!',
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
//getUsers
const getUsers = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    const user = await User.find();
    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      message: 'lấy danh sách người dùng thành công!',
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
//getUserById
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    //check độ dài id
    if (id.length !== 24) {
      return res.status(httpStatus.BAD_REQUEST).json({
        statusCode: httpStatus.BAD_REQUEST,
        message: 'Bạn cần nhập đúng 24 ký tự id',
      });
    }
    //check id có tồn tại hay không
    const isUser = await User.findOne({ _id: id });
    if (!isUser) {
      return res.status(httpStatus.NOT_FOUND).json({
        statusCode: httpStatus.NOT_FOUND,
        message: 'Người dùng không tồn tại',
        data: {},
      });
    }

    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      message: 'Hiển thị người dùng thành công!',
      data: {
        isUser,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    //check độ dài id
    if (id.length !== 24) {
      return res.status(httpStatus.BAD_REQUEST).json({
        statusCode: httpStatus.BAD_REQUEST,
        message: 'Bạn cần nhập đúng 24 ký tự id',
      });
    }
    //check id có tồn tại hay không
    const isUser = await User.findOne({ _id: id });
    if (!isUser) {
      return res.status(httpStatus.NOT_FOUND).json({
        statusCode: httpStatus.NOT_FOUND,
        message: 'Người dùng không tồn tại',
        data: {},
      });
    }

    //update người dùng
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });

    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      message: 'Cập nhật người dùng thành công!',
      data: { user },
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    //check độ dài id
    if (id.length !== 24) {
      return res.status(httpStatus.BAD_REQUEST).json({
        statusCode: httpStatus.BAD_REQUEST,
        message: 'Bạn cần nhập đúng 24 ký tự id',
      });
    }
    //check id có tồn tại hay không
    const isUser = await User.findOne({ _id: id });
    if (!isUser) {
      return res.status(httpStatus.NOT_FOUND).json({
        statusCode: httpStatus.NOT_FOUND,
        message: 'Người dùng không tồn tại',
        data: {},
      });
    }
    const user = await User.findByIdAndDelete({ _id: id });

    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      message: 'xoá người dùng thành công !',
    });
  } catch (error) {
    console.log(error);
  }
};

const searchUser = async (req, res) => {
  const { name } = req.query;
  //check name có tồn tại hay là rỗng không
  if (!name || name == '') {
    return res.status(httpStatus.BAD_REQUEST).json({
      statusCode: httpStatus.BAD_REQUEST,
      message: 'vui lòng nhập tên người dùng',
    });
  }
  // tìm name người dùng 
  const users = await User.find({ fullname: { $regex: name, $options: 'i' } });
  if (users.length == 0) {
    return res.status(httpStatus.NOT_FOUND).json({
      statusCode: httpStatus.NOT_FOUND,
      message: 'Khong tìm thấy người dùng',
    });
  }
  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    message: 'tìm thấy thành công !',
    data: {
      users,
    },
  });
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  searchUser,
};
