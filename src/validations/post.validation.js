const joi = require('joi');

const { objectId } = require('./custom.validation');
const { get } = require('../routes/post.route');

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

const getAllPosts = {
    query: joi.object({
      page: joi.number().integer().min(1).default(1).messages({
        'number.base': 'Trang phải là một số nguyên.',
        'number.min': 'Trang phải lớn hơn hoặc bằng 1.',
      }),
      limit: joi.number().integer().min(1).max(100).default(10).messages({
        'number.base': 'Giới hạn phải là một số nguyên.',
        'number.min': 'Giới hạn phải lớn hơn hoặc bằng 1.',
        'number.max': 'Giới hạn không được vượt quá 100.',
      }),
      search: joi.string().allow('').messages({
        'string.base': 'Từ khóa tìm kiếm phải là một chuỗi.',
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

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,

};