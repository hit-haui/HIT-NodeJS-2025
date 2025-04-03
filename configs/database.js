const mongoose = require('mongoose');

class Database {
  constructor() {
    this.connect();
  }
  connect() {
    try {
      mongoose.connect(process.env.DATABASE);
      console.log('DB connection successful !');
    } catch (error) {
      console.log('DB connection failed !', error);
    }
  }
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;
