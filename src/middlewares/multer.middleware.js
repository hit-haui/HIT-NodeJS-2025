const path = require('path');
const multer = require('multer');
const httpStatus = require('http-status-codes');

const limitSize = 5 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', '..', '/uploads'));
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop();
    cb(null, file.fieldname + '-' + Date.now() + '.' + ext);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new ApiError(httpStatus.BAD_REQUEST, 'Chỉ cho phép upload file hình ảnh'), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: limitSize,
  },
});

module.exports = upload;
