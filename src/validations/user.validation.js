const Joi = require('joi');

const { objectId } = require('./custom.validation');
const { PASSWORD_PATTERN, EMAIL_PATTERN } = require('../pattern/pattern.user');

const createUser = {
  body: Joi.object({
    fullname: Joi.string().min(3).max(30).required().messages({
      'string.base': 'Tên người dùng phải là một chuỗi',
      'string.empty': 'Tên người dùng không được để trống',
      'string.min': 'Tên người dùng phải có ít nhất {#limit} ký tự',
      'string.max': 'Tên người dùng không được vượt quá {#limit} ký tự',
    }),
    email: Joi.string().email().max(50).required().messages({
      'string.base': 'Email phải là một chuỗi',
      'string.empty': 'Email không được để trống',
      'string.email': 'Email không hợp lệ',
      'string.max': 'Email không được vượt quá {#limit} ký tự',
    }),
    password: Joi.string().pattern(PASSWORD_PATTERN).min(6).max(20).required().messages({
      'string.base': 'Mật khẩu phải là một chuỗi',
      'string.empty': 'Mật khẩu không được để trống',
      'string.min': 'Mật khẩu phải có ít nhất {#limit} ký tự',
      'string.max': 'Mật khẩu không được vượt quá {#limit} ký tự',
      'string.pattern.base': 'Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt',
    }),
  }),
};

const getUser = {
  params: Joi.object({
    id: Joi.string().custom(objectId).required().messages({
      'string.base': 'ID người dùng phải là một chuỗi',
      'string.empty': 'ID người dùng không được để trống',
      'any.required': 'ID người dùng là bắt buộc',
      'string.pattern.name': 'ID người dùng không hợp lệ',
    }),
  }),
};

const searchUserByName = {
  query: Joi.object({
    name: Joi.string().required().max(40).messages({
      'string.base': 'Tên tìm kiếm phải là một chuỗi',
      'string.max': 'Tên tìm kiếm không được vượt quá {#limit} ký tự',
    }),
  }),
};

const updateUser = {
  body: Joi.object({
    email: Joi.string().email().max(50).required().messages({
      'string.base': 'Email phải là một chuỗi',
      'string.empty': 'Email không được để trống',
      'string.email': 'Email không hợp lệ',
      'string.max': 'Email không được vượt quá {#limit} ký tự',
    }),
    password: Joi.string().pattern(PASSWORD_PATTERN).min(6).max(20).required().messages({
      'string.base': 'Mật khẩu phải là một chuỗi',
      'string.empty': 'Mật khẩu không được để trống',
      'string.min': 'Mật khẩu phải có ít nhất {#limit} ký tự',
      'string.max': 'Mật khẩu không được vượt quá {#limit} ký tự',
      'string.pattern.base': 'Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt',
    }),
  }),
  params: Joi.object({
    id: Joi.string().custom(objectId).required().messages({
      'string.base': 'ID người dùng phải là một chuỗi',
      'string.empty': 'ID người dùng không được để trống',
      'any.required': 'ID người dùng là bắt buộc',
      'string.pattern.name': 'ID người dùng không hợp lệ',
    }),
  }),
};

const deleteUser = {
  params: Joi.object({
    id: Joi.string().custom(objectId).required().messages({
      'string.base': 'ID người dùng phải là một chuỗi',
      'string.empty': 'ID người dùng không được để trống',
      'any.required': 'ID người dùng là bắt buộc',
      'string.pattern.name': 'ID người dùng không hợp lệ',
    }),
  }),
};
module.exports = {
  createUser,
  getUser,
  searchUserByName,
  updateUser,
  deleteUser,
};
