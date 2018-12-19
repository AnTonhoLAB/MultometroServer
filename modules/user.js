const db = require('./db');

const user = db.sequelize.define('multometroUser',{
    userName: db.Sequelize.STRING,
	email: db.Sequelize.STRING,
	photoURL: db.Sequelize.TEXT,
    firstTime: { 
        type: db.Sequelize.TINYINT,
        default: 1
    }
});

module.exports = user;