const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createPost = {
  body: Joi.object({
    title: Joi.string().min(10).required().messages({
      'string.base': 'Tiêu đề phải là chuỗi',
      'string.min': 'Tiêu đề phải có ít nhất 10 ký tự',
      'any.required': 'Tiêu đề là bắt buộc',
    }),
    content: Joi.string().min(20).required().messages({
      'string.min': 'Nội dung phải có ít nhất 20 ký tự',
      'any.required': 'Nội dung là bắt buộc',
    }),
    tags: Joi.array().items(Joi.string()).messages({
      'array.base': 'Tags phải là một mảng',
      'string.base': 'Mỗi tag phải là chuỗi',
    }),
  }),
};

const updatePost = {
  body: Joi.object({
    title: Joi.string().min(10).messages({
      'string.min': 'Tiêu đề phải có ít nhất 10 ký tự',
    }),
    content: Joi.string().min(20).messages({
      'string.min': 'Nội dung phải có ít nhất 20 ký tự',
    }),
    tags: Joi.array().items(Joi.string()).messages({
      'array.base': 'Tags phải là một mảng',
    }),
  })
    .min(1)
    .messages({
      'object.min': 'Yêu cầu cập nhật ít nhất một trường: title, content, tags',
    }),
};

const postId = {
  params: Joi.object({
    id: Joi.string().custom(objectId).required().messages({
      'any.required': 'id là bắt buộc',
      'string.base': 'id phải là chuỗi',
    }),
  }),
};

module.exports = {
  createPost,
  updatePost,
  postId,
};
