const db = require('../../modules/db');

const userInRoom = db.sequelize.define('userInRooms',{
    userType: db.Sequelize.STRING,
    enterDate: db.Sequelize.DATE,
    mulltometroUserId: db.Sequelize.INTEGER,
    roomId: db.Sequelize.INTEGER
});

module.exports = userInRoom;