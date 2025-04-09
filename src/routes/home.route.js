const express = require('express');

const homeController = require('../controllers/home.controller');

const router = express.Router();
const middleware = (req, res, next) => {
  // Thực hiện một số tác vụ
  console.log('Middleware được gọi');

  // Gọi hàm tiếp theo trong chuỗi middleware
  next(); // Nếu không gọi next(), yêu cầu sẽ bị treo
};

router.get('/', middleware, homeController.homePage);

module.exports = router;
