const httpStatus = require('http-status-codes');

const User = require('../models/user.model');
const { get } = require('mongoose');

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(httpStatus.CREATED).json({
      statuscode: httpStatus.CREATED,
      message: 'Tao nguoi dung thanh cong',
      data: {
        user,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(httpStatus.OK).json({
      statuscode: httpStatus.OK,
      message: 'Lay danh sach nguoi dung thanh cong',
      data: {
        users,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        statuscode: httpStatus.NOT_FOUND,
        message: 'Nguoi dung khong ton tai',
      });
    }
    res.status(httpStatus.OK).json({
      statuscode: httpStatus.OK,
      message: 'Lay nguoi dung thanh cong',
      data: {
        user,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        statuscode: httpStatus.NOT_FOUND,
        message: 'Nguoi dung khong ton tai',
      });
    }
    res.status(httpStatus.OK).json({
      statuscode: httpStatus.OK,
      message: 'Cap nhat nguoi dung thanh cong',
      data: {
        user,
      },
    });
  } catch (err) {
    console.error(err);
  }
};
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        statuscode: httpStatus.NOT_FOUND,
        message: 'Nguoi dung khong ton tai',
      });
    }
    res.status(httpStatus.OK).json({
      statuscode: httpStatus.OK,
      message: 'Xoa nguoi dung thanh cong',
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
