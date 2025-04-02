const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const PATH_FILE_USERS = path.join(__dirname, '../database/users.json');

const getData = () => {
  const data = fs.readFileSync(PATH_FILE_USERS, 'utf-8');
  return JSON.parse(data);
};

const saveData = (data) => {
  fs.writeFileSync(PATH_FILE_USERS, JSON.stringify(data));
};

const getAll = () => {
  const users = getData();
  return users;
};

const getById = (id) => {
  const users = getData();
  return users.find((user) => user.id === id) || undefined;
};

const create = (user) => {
  const users = getData();
  users.push({
    ...user,
    id: uuidv4(),
  });
  saveData(users);
};

const updateById = (id, user) => {
  const users = getData();
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) return;
  users[index] = { ...users[index], ...user };
  saveData(users);
};

const deleteById = (id) => {
  const users = getData();
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) return;
  users.splice(index, 1);
  saveData(users);
};

module.exports = {
  getData,
  saveData,
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
