const Joi = require('joi');

const { objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object({
    fullname: Joi.string().min(3).max(30).required().messages({
      'string.base': 'Tên người dùng phải là một chuỗi',
      'string.empty': 'Tên người dùng không được để trống',
      'string.min': 'Tên người dùng phải có ít nhất {#limit} ký tự',
      'string.max': 'Tên người dùng không được vượt quá {#limit} ký tự',
    }),
    email: Joi.string().email().required().messages({
      'string.base': 'Email phải là một chuỗi',
      'string.empty': 'Email không được để trống',
      'string.email': 'Email không hợp lệ',
    }),
    password: Joi.string().min(6).max(20).required().messages({
      'string.base': 'Mật khẩu phải là một chuỗi',
      'string.empty': 'Mật khẩu không được để trống',
      'string.min': 'Mật khẩu phải có ít nhất {#limit} ký tự',
      'string.max': 'Mật khẩu không được vượt quá {#limit} ký tự',
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

const updateUser = {
  params: Joi.object({
    id: Joi.string().custom(objectId).required().messages({
      'string.base': 'ID người dùng phải là một chuỗi',
      'string.empty': 'ID người dùng không được để trống',
      'any.required': 'ID người dùng là bắt buộc',
      'string.pattern.name': 'ID người dùng không hợp lệ',
    }),
  }),
  body: Joi.object({
    fullname: Joi.string().min(3).max(30).required().messages({
      'string.base': 'Tên người dùng phải là một chuỗi',
      'string.empty': 'Tên người dùng không được để trống',
      'string.min': 'Tên người dùng phải có ít nhất {#limit} ký tự',
      'string.max': 'Tên người dùng không được vượt quá {#limit} ký tự',
    }),
    email: Joi.string().email().required().messages({
      'string.base': 'Email phải là một chuỗi',
      'string.empty': 'Email không được để trống',
      'string.email': 'Email không hợp lệ',
    }),
    password: Joi.string().min(6).max(20).required().messages({
      'string.base': 'Mật khẩu phải là một chuỗi',
      'string.empty': 'Mật khẩu không được để trống',
      'string.min': 'Mật khẩu phải có ít nhất {#limit} ký tự',
      'string.max': 'Mật khẩu không được vượt quá {#limit} ký tự',
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

const searchUserByName = {
  query: Joi.object({
    fullname: Joi.string().min(1).max(30).required().messages({
      'string.base': 'Tên người dùng phải là một chuỗi',
      'string.empty': 'Tên người dùng không được để trống',
      'string.min': 'Tên người dùng phải có ít nhất {#limit} ký tự',
      'string.max': 'Tên người dùng không được vượt quá {#limit} ký tự',
      'any.required': 'Tên người dùng là bắt buộc',
    }),
  }),
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  searchUserByName,
};
