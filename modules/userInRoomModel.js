const db = require('./db');
// const user = require('./userModel');
// const room = require('./roomModel');

const userInRoom = db.sequelize.define('userInRooms',{
    userType: db.Sequelize.STRING,
    enterDate: db.Sequelize.DATE,
    mulltometroUserId: db.Sequelize.INTEGER,
    roomId: db.Sequelize.INTEGER
});

module.exports = userInRoom;