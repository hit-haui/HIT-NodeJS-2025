const Joi = require('joi');

const register = {
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
    repeatPassword: Joi.string().valid(Joi.ref('password')).required().messages({
      'any.only': 'Mật khẩu không khớp',
      'string.empty': 'Xác nhận mật khẩu không được để trống',
    }),
  }),
};

const login = {
  body: Joi.object({
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

const updateProfile = {
  body: Joi.object({
    fullname: Joi.string().min(3).max(30).messages({
      'string.base': 'Tên người dùng phải là một chuỗi',
      'string.min': 'Tên người dùng phải có ít nhất {#limit} ký tự',
      'string.max': 'Tên người dùng không được vượt quá {#limit} ký tự',
    }),
    email: Joi.string().email().messages({
      'string.base': 'Email phải là một chuỗi',
      'string.email': 'Email không hợp lệ',
    }),
  }),
};

module.exports = {
  register,
  login,
  updateProfile,
};
