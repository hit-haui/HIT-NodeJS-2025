const Joi = require('joi');

const { objectId } = require('./custom.validation');

const createPost = {
  body: Joi.object({
    title: Joi.string().min(3).max(100).required().messages({
      'string.base': 'Tiêu đề phải là một chuỗi',
      'string.empty': 'Tiêu đề không được để trống',
      'string.min': 'Tiêu đề phải có ít nhất {#limit} ký tự',
      'string.max': 'Tiêu đề không được vượt quá {#limit} ký tự',
    }),
    content: Joi.string().min(10).required().messages({
      'string.base': 'Nội dung phải là một chuỗi',
      'string.empty': 'Nội dung không được để trống',
      'string.min': 'Nội dung phải có ít nhất {#limit} ký tự',
    }),
    tags: Joi.array().items(Joi.string()).messages({
      'array.base': 'Tags phải là một mảng',
      'string.base': 'Mỗi tag phải là một chuỗi',
    }),
  }),
};

const getPost = {
  params: Joi.object({
    id: Joi.string().custom(objectId).required().messages({
      'string.base': 'ID bài viết phải là một chuỗi',
      'string.empty': 'ID bài viết không được để trống',
      'any.required': 'ID bài viết là bắt buộc',
      'string.pattern.name': 'ID bài viết không hợp lệ',
    }),
  }),
};

const updatePost = {
  params: Joi.object({
    id: Joi.string().custom(objectId).required().messages({
      'string.base': 'ID bài viết phải là một chuỗi',
      'string.empty': 'ID bài viết không được để trống',
      'any.required': 'ID bài viết là bắt buộc',
      'string.pattern.name': 'ID bài viết không hợp lệ',
    }),
  }),
  body: Joi.object({
    title: Joi.string().min(3).max(100).messages({
      'string.base': 'Tiêu đề phải là một chuỗi',
      'string.empty': 'Tiêu đề không được để trống',
      'string.min': 'Tiêu đề phải có ít nhất {#limit} ký tự',
      'string.max': 'Tiêu đề không được vượt quá {#limit} ký tự',
    }),
    content: Joi.string().min(10).messages({
      'string.base': 'Nội dung phải là một chuỗi',
      'string.empty': 'Nội dung không được để trống',
      'string.min': 'Nội dung phải có ít nhất {#limit} ký tự',
    }),
    tags: Joi.array().items(Joi.string()).messages({
      'array.base': 'Tags phải là một mảng',
      'string.base': 'Mỗi tag phải là một chuỗi',
    }),
  }),
};

const deletePost = {
  params: Joi.object({
    id: Joi.string().custom(objectId).required().messages({
      'string.base': 'ID bài viết phải là một chuỗi',
      'string.empty': 'ID bài viết không được để trống',
      'any.required': 'ID bài viết là bắt buộc',
      'string.pattern.name': 'ID bài viết không hợp lệ',
    }),
  }),
};

module.exports = {
  createPost,
  getPost,
  updatePost,
  deletePost,
};
