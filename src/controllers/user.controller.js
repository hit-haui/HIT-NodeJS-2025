const { v4: uuidv4 } = require('uuid');
const httpStatus = require('http-status-codes');

const users = [
  {
    id: '1',
    first_name: 'Andris',
    last_name: 'Capelen',
    email: 'acapelen0@cornell.edu',
    isVerified: true,
  },
  {
    id: '2',
    first_name: 'Jeffy',
    last_name: 'Barthropp',
    email: 'jbarthropp1@howstuffworks.com',
    isVerified: true,
  },
  {
    id: '3',
    first_name: 'Dana',
    last_name: 'Yegorkov',
    email: 'dyegorkov2@plala.or.jp',
    isVerified: false,
  },
  {
    id: '4',
    first_name: 'Noak',
    last_name: 'Croot',
    email: 'ncroot3@ca.gov',
    isVerified: true,
  },
  {
    id: '5',
    first_name: 'Joannes',
    last_name: 'Castelletti',
    email: 'jcastelletti4@123-reg.co.uk',
    isVerified: false,
  },
];

//GET USERS
const getUsers = (req, res) => {
  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    message: 'Lấy danh sách người dùng thành công',
    data: {
      users,
    },
  });
};

const getUserById = (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(httpStatus.NOT_FOUND).json({
      statusCode: httpStatus.NOT_FOUND,
      message: 'Không tìm thấy người dùng',
    });
  }

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    message: 'Lấy thông tin người dùng thành công',
    data: {
      user,
    },
  });
};

//CREATE
const createUser = (req, res) => {
  const { first_name, last_name, email } = req.body;

  if (users.find((user) => user.email === email)) {
    return res.status(httpStatus.BAD_REQUEST).json({
      statusCode: httpStatus.BAD_REQUEST,
      message: 'Email đã tồn tại',
    });
  }

  const user = {
    id: uuidv4(),
    first_name,
    last_name,
    email,
    isVerified: false,
  };
  users.push(user);

  res.status(httpStatus.CREATED).json({
    statusCode: httpStatus.CREATED,
    message: 'Tạo người dùng thành công',
    data: {
      user,
    },
  });
};

//UPDATE
const updateUser = (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return res.status(httpStatus.NOT_FOUND).json({
      statusCode: httpStatus.NOT_FOUND,
      message: 'Không tìm thấy người dùng có id là {id}!',
    });
  }

  const { first_name, last_name, email, isVerified } = req.body;

  //Cập nhật thông tin người dùng
  if (first_name) users[userIndex].first_name = first_name;
  if (last_name) users[userIndex].last_name = last_name;
  if (email) {
    //Check xem có trùng ID ko
    if (users.find((user) => user.email === email && user.id !== id)) {
      return res.status(httpStatus.BAD_REQUEST).json({
        statusCode: httpStatus.BAD_REQUEST,
        message: 'Email đã tồn tại',
      });
    }
    users[userIndex].email = email;
  }
  if (isVerified !== undefined) users[userIndex].isVerified = isVerified;

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    message: 'Cập nhật thông tin người dùng thành công!',
    data: {
      user: users[userIndex],
    },
  });
};

//DELETE
const deleteUser = (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return res.status(httpStatus.NOT_FOUND).json({
      statusCode: httpStatus.NOT_FOUND,
      message: 'Không tìm thấy người dùng có id là {id}!',
    });
  }

  //Xóa người dùng
  users.splice(userIndex, 1);

  res.status(httpStatus.NO_CONTENT).json({
    statusCode: httpStatus.NO_CONTENT,
    message: 'Xóa người dùng thành công!',
  });
};

//VERIFY: Xác thực người dùng
const verifyUser = (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === id);
  if (!user) {
    return res.status(httpStatus.NOT_FOUND).json({
      statusCode: httpStatus.NOT_FOUND,
      message: 'Không tìm thấy người dùng có id là {id}!',
    });
  }

  //Cập nhật xác thực
  user.isVerified = true;
  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    message: 'Xác thực người dùng thành công!',
    data: {
      user,
    },
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  verifyUser,
};
