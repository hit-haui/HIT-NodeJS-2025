const { v4: uuidv4 } = require('uuid');
const httpStatus = require('http-status-codes');
const { checkout } = require('../routes/home.route');

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
  const { first_name, last_name, email } = req.body;
  const userIndex = users.findIndex((user) => user.id === id);

  // Kiểm tra người dùng tồn tại
  if (userIndex === -1) {
    return res.status(httpStatus.NOT_FOUND).json({
      statusCode: httpStatus.NOT_FOUND,
      message: "Không tìm thấy người dùng",
    })
  }

  // Kiểm tra email trùng (nếu có email mới)
  if (email) {
    let checkEmail = false;
    for (let j = 0; j < users.length; ++j) {
      if (email === users[j].email && id !== users[j].id) { 
        checkEmail = true;
        break;
      }
    }

    if (checkEmail) {
      return res.status(httpStatus.BAD_REQUEST).json({
        statusCode: httpStatus.BAD_REQUEST,
        message: "Email đã tồn tại",
      })
    }
  }

  // Cập nhật thông tin
  const userToUpdate = users[userIndex];
  userToUpdate.first_name = first_name || userToUpdate.first_name;
  userToUpdate.last_name = last_name || userToUpdate.last_name;
  userToUpdate.email = email || userToUpdate.email;

  // Phản hồi
  return res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    message: "Cập nhật thành công",
    data: {
      user: userToUpdate,
    },
  });
}

const deleteUser = (req, res)=>{
  const { id } = req.params;
  const userIndex = users.findIndex((user) => user.id === id)

  if(userIndex === -1){
    return res.status(httpStatus.NOT_FOUND).json({
      statusCode: httpStatus.NOT_FOUND,
      message: 'khong tim thay nguoi dung nay'
    })
  }

  users.splice(userIndex,1)

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    message: 'Da xoa nguoi dung nay'
  })
}

const verifyUser =(req, res)=>{
  const {id} = req.params
  const userIndex = users.findIndex((user) => user.id ===id)
  console.log(userIndex)
  //kiem tra nguoi dung co ton tai hay khong
  if(userIndex == -1){
    return res.status(httpStatus.NOT_FOUND).json({
      statusCode: httpStatus.OK,
      message: 'khong tim thay nguoi dung nay'
    })
  }
  const user = users[userIndex];
  console.log(user.isVerified)

  //kiem tra xem nguoi dung da xac thuc chua
  if (user.isVerified === true){
    return res.status(httpStatus.BAD_REQUEST).json({
      statusCode: httpStatus.BAD_REQUEST,
      message: 'nguoi dung da xac minh'
    })
  }

  user.isVerified = true

  users[userIndex] = user,

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    message: 'Xac  thuc thanh cong',
    data: {
      user
    }
  })

}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  verifyUser
};
