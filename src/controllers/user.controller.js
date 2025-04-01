const { v4: uuidv4 } = require('uuid');
const httpStatus = require('http-status-codes');

const users = [
  {
    id: 'eea8d8db-6040-46c4-9329-349bbb5d52e9',
    first_name: 'Andris',
    last_name: 'Capelen',
    email: 'acapelen0@cornell.edu',
    isVerified: true,
  },
  {
    id: 'b888cf0f-b662-4651-8c73-975a6fc4f0a8',
    first_name: 'Jeffy',
    last_name: 'Barthropp',
    email: 'jbarthropp1@howstuffworks.com',
    isVerified: true,
  },
  {
    id: 'f4e1e075-e347-4d43-952d-887d20bd1ea5',
    first_name: 'Dana',
    last_name: 'Yegorkov',
    email: 'dyegorkov2@plala.or.jp',
    isVerified: false,
  },
  {
    id: '3878f6b6-d792-4080-a7df-736ad11784e5',
    first_name: 'Noak',
    last_name: 'Croot',
    email: 'ncroot3@ca.gov',
    isVerified: true,
  },
  {
    id: '1d04ca3e-ce16-4e2a-bf59-4e1e6869dd3d',
    first_name: 'Joannes',
    last_name: 'Castelletti',
    email: 'jcastelletti4@123-reg.co.uk',
    isVerified: false,
  },
];

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

const updateUser = (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, isVerified } = req.body;

  const index = users.findIndex((user) => user.id === id);
  if (index === undefined) {
    return res.status(httpStatus.NOT_FOUND).json({
      statusCode: httpStatus.NOT_FOUND,
      message: 'Không tìm thấy người dùng',
    });
  }

  users[index] = {
    ...users[index],
    first_name,
    last_name,
    email,
    isVerified,
  };

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    message: 'Cập nhật thông tin người dùng thành công',
    data: users[index],
  });
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return res.status(httpStatus.NOT_FOUND).json({ error:
      'Không tìm thấy người dùng' });
      
  }
  users.splice(index, 1);

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    message: 'Xóa người dùng thành công',
  });
};

const verifyUser = (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === id);
  if (!user) {
    return res.status(httpStatus.NOT_FOUND).json({
      statusCode: httpStatus.NOT_FOUND,
      message: 'Không tìm thấy người dùng',
    });
  }

  if (user.isVerified === true) {
    return res.status(httpStatus.BAD_REQUEST).json({
      statusCode: httpStatus.BAD_REQUEST,
      message: 'Người dùng đã đã xác nhận',
    });
  } else {
    return res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      message: 'Xác nhận người dùng thành công',
      data: {
        id,
        first_name,
        last_name,
        email,
        isVerified: true,
      },
    });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  verifyUser,
};
