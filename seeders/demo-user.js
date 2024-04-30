const { QueryTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../sequelize');

module.exports = {
  up: async () => {
    const salt = await bcrypt.genSalt(10);
    for (let i = 0; i < 10; i++) {
      const passwordHash = await bcrypt.hash(`password${i}`, salt);
      await sequelize.query("INSERT INTO users (username, password, \"createdAt\", \"updatedAt\") VALUES (?, ?, NOW(), NOW())", {
        replacements: [`user${i}`, passwordHash],
        type: QueryTypes.INSERT
      });
    }
  },
  down: async () => {
    await sequelize.query("DELETE FROM users", { type: QueryTypes.DELETE });
  },
};
