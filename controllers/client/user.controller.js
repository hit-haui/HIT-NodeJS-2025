const { v4: uuidv4 } = require('uuid');
const httpStatus = require('http-status-codes');
const { use } = require('../../routes/client/home.route');
const e = require('express');

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

// GET: getUser
const getUser = (req, res) => {
  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    message: 'Get list of users successsfully',
    data: {
      users,
    },
  });
};

// GET: getUserById
const getUserById = (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(httpStatus.NOT_FOUND).json({
      statusCode: httpStatus.NOT_FOUND,
      message: 'User id not found',
    });
  }

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    message: 'Get user information succesfully',
    data: {
      user,
    },
  });
};
// POST: createUser
const createUser = (req, res) => {
  const { first_name, last_name, email, isVerified } = req.body;
  if (users.find((user) => user.email === email)) {
    return res.status(httpStatus.BAD_REQUEST).json({
      statusCode: httpStatus.BAD_REQUEST,
    });
  }

  const user = {
    id: uuidv4(),
    first_name,
    last_name,
    email,
    isVerified,
  };
  users.push(user);

  res.status(httpStatus.CREATED).json({
    statusCode: httpStatus.CREATED,
    message: 'Create successful users',
    data: {
      user,
    },
  });
};
// PUT: updateUser
const updateUser = (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === id);
  const { first_name, last_name, email } = req.body;

  if (!user) {
    return res.status(httpStatus.NOT_FOUND).json({
      statusCode: httpStatus.NOT_FOUND,
      message: 'User id not found',
    });
  }
  // cap nhat
  if (first_name) user.first_name = first_name;
  if (last_name) user.last_name = last_name;
  if (email) user.email = email;

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    message: 'User updated successfully',
    data: { user },
  });
};
// DELETE: deleteUser
const deleteUser = (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(httpStatus.NOT_FOUND).json({
      statusCode: httpStatus.NOT_FOUND,
      message: 'User id not found',
    });
  }
  // xoa
  const delUser = users.filter((user) => user.id !== id);

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    message: 'User deleted successfully',
    data: { delUser },
  });
};
// GET: verifyUser
const verifyUser = (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(httpStatus.NOT_FOUND).json({
      statusCode: httpStatus.NOT_FOUND,
      message: 'User id not found',
      data: { user },
    });
  }
  user.isVerified = true;

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    messgae: 'User authentication successful',
  });
};

module.exports = { getUser, getUserById, createUser, updateUser, deleteUser, verifyUser };
