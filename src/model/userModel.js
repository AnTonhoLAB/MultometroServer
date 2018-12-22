const db = require('../../modules/db');
const userInRoom = require('./userInRoomModel');

const user = db.sequelize.define('mulltometroUser',{
    userName: db.Sequelize.STRING,
	email: db.Sequelize.STRING,
	photoURL: db.Sequelize.TEXT,
    password: db.Sequelize.TEXT,
    bio: db.Sequelize.TEXT,
    firstTime: db.Sequelize.TINYINT
});

user.hasMany(userInRoom);
userInRoom.belongsTo(user);

module.exports = user;