const httpStatus = require('http-status-codes');

const User = require('../models/user.model');

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      message: 'tao nguoi dug thanh cong',
      data: {
        user,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

const getUser = async (req, res) => {
  console.log('da goi get');
  try {
    const user = await User.find();
    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      message: 'Lấy thông tin tất cả các người dùng thàh công',
      data: {
        user,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      res.status(httpStatus.NOT_FOUND).json({
        statusCode: httpStatus.NOT_FOUND,
        message: 'Id nay khong ton tai',
      });
    }

    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      message: 'lay nguoi dung than cong',
      data: {
        user,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        statusCode: httpStatus.NOT_FOUND,
        message: 'Id nay khong ton tai',
      });
    }

    await user.updateOne(req.body);
    await user.save();

    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      message: 'lay nguoi dung than cong',
      data: {
        user,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        statusCode: httpStatus.NOT_FOUND,
        message: 'Id nguoi dung khong dung',
      });
    }
    await user.deleteOne({ id: id });

    res.status(httpStatus.OK).json({
      statusCode: httpStatus.Ok,
      message: 'Da xoa nguoi dung thanh cong',
    });
  } catch (err) {
    console.log(err);
  }
};

const searchUserByName = async (req, res) => {
  try {
    const { fullname } = req.query;
    const nameaftertolower = fullname.toLowerCase();
    const user = await User.find({ fullname: nameaftertolower });
    if (user.length == 0) {
      return res.status(httpStatus.NOT_FOUND).json({
        statusCode: httpStatus.NOT_FOUND,
        message: 'Khong tim thay ten thanh nay',
      });
    }

    res.status(httpStatus.NOT_FOUND).json({
      statusCode: httpStatus.NOT_FOUND,
      message: `Nhung nguoi ten ${fullname}`,
      data: { user },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUser,
  getUser,
  getUserById,
  updateUser,
  deleteUser,
  searchUserByName,
};
