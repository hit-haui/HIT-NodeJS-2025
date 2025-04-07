const Joi = require('joi');
const httpStatus = require('http-status-codes');
const userCreatePost = (req, res, next) => {
  const schema = Joi.object({
    fullName: Joi.string().required().max(50).message({
      'string.empty': 'Vui lòng tên',
      'string.max': 'Tên không được dài quá 50 ký tự',
    }),
    password: Joi.string()
      .required()
      .min(8)
      .custom((value, helpers) => {
        if (!/[A-Z]/.test(value)) {
          return helpers.error('password.uppercase');
        }
        if (!/[a-z]/.test(value)) {
          return helpers.error('password.lowercase');
        }
        if (!/\d/.test(value)) {
          return helpers.error('password.digit');
        }
        if (!/[@$!%*?&]/.test(value)) {
          return helpers.error('password.special');
        }
        return value;
      })
      .messages({
        'string.empty': 'Vui lòng nhập mật khẩu',
        'string.min': 'Mật khẩu phải chứa ít nhất 8 ký tự!',
        'password.uppercase': 'Mật khẩu phải chứa ít nhất một chữ cái in hoa!',
        'password.lowercase': 'Mật khẩu phải chứa ít nhất một chữ cái thường!',
        'password.digit': 'Mật khẩu phải chứa ít nhất một chữ số!',
        'password.special': 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt!',
      }),
    email: Joi.string().required().email().messages({
      'string.empty': 'Vui lòng nhập email',
      'string.email': 'Email không đúng định dạng!',
    }),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    const errorMessage = error.details[0].message;
    res.status(httpStatus.BAD_REQUEST).json({
      status: httpStatus.BAD_REQUEST,
      message: errorMessage,
    });
    return;
  }

  next();
};
module.exports = { userCreatePost };
