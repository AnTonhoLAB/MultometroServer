const Sequelize = require('sequelize');

const sequelize = new Sequelize('heroku_343c56030cd59ea','b4defcec75d888', 'f579f2e3', {
    host: "us-cdbr-iron-east-01.cleardb.net",
    dialect: 'mysql'
});

module.exports = sequelize;