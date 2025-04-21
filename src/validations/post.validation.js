const Joi = require('joi');

const { objectId } = require('./custom.validation');

const createPost = {
  body: Joi.object({
    title: Joi.string().min(10).required().messages({
      'string.base': 'Tiêu đề bài viết phải là một chuỗi.',
      'string.empty': 'Tiêu đề bài viết không được để trống.',
      'string.min': 'Tiêu đề bài viết phải có ít nhất {#limit} ký tự.',
      'any.required': 'Tiêu đề bài viết là bắt buộc.',
    }),
    content: Joi.string().min(20).required().messages({
      'string.base': 'Nội dung bài viết phải là một chuỗi.',
      'string.empty': 'Nội dung bài viết không được để trống.',
      'string.min': 'Nội dung bài viết phải có ít nhất {#limit} ký tự.',
      'any.required': 'Nội dung bài viết là bắt buộc.',
    }),
    tags: Joi.array().items(Joi.string()).messages({
      'array.base': 'Tags phải là một mảng.',
      'array.includes': 'Mỗi tag phải là một chuỗi.',
    }),
  }),
};

const getPosts = {
  query: Joi.object({
    page: Joi.number().integer().min(1).default(1).messages({
      'number.base': 'Trang phải là một số nguyên.',
      'number.min': 'Trang phải lớn hơn hoặc bằng 1.',
    }),
    limit: Joi.number().integer().min(1).max(100).default(10).messages({
      'number.base': 'Giới hạn phải là một số nguyên.',
      'number.min': 'Giới hạn phải lớn hơn hoặc bằng 1.',
      'number.max': 'Giới hạn không được vượt quá 100.',
    }),
    search: Joi.string().allow('').messages({
      'string.base': 'Từ khóa tìm kiếm phải là một chuỗi.',
    }),
  }),
};

const getPost = {
  params: Joi.object({
    id: Joi.string().custom(objectId).required().messages({
      'string.base': 'ID bài viết phải là một chuỗi.',
      'string.empty': 'ID bài viết không được để trống.',
      'any.required': 'ID bài viết là bắt buộc.',
    }),
  }),
};

const updatePost = {
  params: Joi.object({
    id: Joi.string().custom(objectId).required().messages({
      'string.base': 'ID bài viết phải là một chuỗi.',
      'string.empty': 'ID bài viết không được để trống.',
      'any.required': 'ID bài viết là bắt buộc.',
    }),
  }),
  body: Joi.object({
    title: Joi.string().min(10).messages({
      'string.base': 'Tiêu đề bài viết phải là một chuỗi.',
      'string.min': 'Tiêu đề bài viết phải có ít nhất {#limit} ký tự.',
    }),
    content: Joi.string().min(20).messages({
      'string.base': 'Nội dung bài viết phải là một chuỗi.',
      'string.min': 'Nội dung bài viết phải có ít nhất {#limit} ký tự.',
    }),
    tags: Joi.array().items(Joi.string()).messages({
      'array.base': 'Tags phải là một mảng.',
      'array.includes': 'Mỗi tag phải là một chuỗi.',
    }),
  })
    .min(1)
    .messages({
      'object.min': 'Phải cung cấp ít nhất một trường để cập nhật.',
    }),
};

const deletePost = {
  params: Joi.object({
    id: Joi.string().custom(objectId).required().messages({
      'string.base': 'ID bài viết phải là một chuỗi.',
      'string.empty': 'ID bài viết không được để trống.',
      'any.required': 'ID bài viết là bắt buộc.',
    }),
  }),
};

module.exports = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
};
