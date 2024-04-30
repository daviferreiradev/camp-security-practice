// models/User.js
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../sequelize');

const User = sequelize.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
}, {
  hooks: {
    beforeCreate: async (user) => {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  }
});

module.exports = User;
