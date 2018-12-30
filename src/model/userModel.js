const db = require('../../modules/db');
const userInRoom = require('./userInRoomModel');
const appiedFeeModel = require('./appliedFeeModel');

const user = db.sequelize.define('mulltometroUser',{
    userName: db.Sequelize.STRING,
	email: db.Sequelize.STRING,
	photoURL: db.Sequelize.TEXT,
    password: db.Sequelize.TEXT,
    bio: db.Sequelize.TEXT,
    firstTime: db.Sequelize.BOOLEAN
});

user.hasMany(userInRoom);
userInRoom.belongsTo(user);

user.hasMany(appiedFeeModel);
appiedFeeModel.belongsTo(user);

module.exports = user;