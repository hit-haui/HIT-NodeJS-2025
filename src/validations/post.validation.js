const joi = require('joi');

const { objectId } = require('./custom.validation');

const createPost = {
  body: joi.object({
    title: joi.string().min(10).required().messages({
      'string.base': 'Tiêu đề bài viết phải là một chuỗi',
      'string.empty': 'Tiêu đề bài viết không được để trống',
      'string.min': 'Tiêu đề bài viết phải có ít nhất {#limit} ký tự',
      'any.required': 'Tiêu đề bài viết là bắt buộc',
    }),
    content: joi.string().min(20).required().messages({
      'string.base': 'Nội dung bài viết phải là một chuỗi',
      'string.empty': 'Nội dung bài viết không được để trống',
      'string.min': 'Nội dung bài viết phải có ít nhất {#limit} ký tự',
      'any.required': 'Nội dung bài viết là bắt buộc',
    }),
    tags: joi.array().items(joi.string()).optional().messages({
      'array.base': 'Tags phải là một mảng',
      'array.includesRequiredUnknowns': 'Tags không được chứa giá trị không hợp lệ',
    }),
  }),
};

const getPostById = {
  params: joi.object({
    id: joi.string().custom(objectId).required().messages({
      'string.base': 'ID bài viết phải là một chuỗi',
      'string.empty': 'ID bài viết không được để trống',
      'any.required': 'ID bài viết là bắt buộc',
    }),
  }),
};

const updatePost = {
  params: joi.object({
    id: joi.string().custom(objectId).required().messages({
      'string.base': 'ID bài viết phải là một chuỗi',
      'string.empty': 'ID bài viết không được để trống',
      'any.required': 'ID bài viết là bắt buộc',
    }),
  }),
  body: joi.object({
    title: joi.string().min(10).optional().messages({
      'string.base': 'Tiêu đề bài viết phải là một chuỗi',
      'string.empty': 'Tiêu đề bài viết không được để trống',
      'string.min': 'Tiêu đề bài viết phải có ít nhất {#limit} ký tự',
    }),
    content: joi.string().min(20).optional().messages({
      'string.base': 'Nội dung bài viết phải là một chuỗi',
      'string.empty': 'Nội dung bài viết không được để trống',
      'string.min': 'Nội dung bài viết phải có ít nhất {#limit} ký tự',
    }),
    tags: joi.array().items(joi.string()).optional().messages({
      'array.base': 'Tags phải là một mảng',
      'array.includesRequiredUnknowns': 'Tags không được chứa giá trị không hợp lệ',
    }),
  }),
};

const deletePost = {
  params: joi.object({
    id: joi.string().custom(objectId).required().messages({
      'string.base': 'ID bài viết phải là một chuỗi',
      'string.empty': 'ID bài viết không được để trống',
      'any.required': 'ID bài viết là bắt buộc',
    }),
  }),
};

const searchPostByTitle = {
  query: joi.object({
    title: joi.string().min(3).required().messages({
      'string.base': 'Tiêu đề bài viết phải là một chuỗi',
      'string.empty': 'Tiêu đề bài viết không được để trống',
      'string.min': 'Tiêu đề bài viết phải có ít nhất {#limit} ký tự',
      'any.required': 'Tiêu đề bài viết là bắt buộc',
    }),
  }),
};

module.exports = {
  createPost,
  getPostById,
  updatePost,
  deletePost,
  searchPostByTitle,
};
