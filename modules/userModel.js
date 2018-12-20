const db = require('./db');

const user = db.sequelize.define('multometroUser',{
    userName: db.Sequelize.STRING,
	email: db.Sequelize.STRING,
	photoURL: db.Sequelize.TEXT,
    password: db.Sequelize.TEXT,
    bio: db.Sequelize.TEXT,
    firstTime: db.Sequelize.TINYINT
});

module.exports = user;