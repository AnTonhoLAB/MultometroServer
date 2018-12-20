const db = require('./db');

const userInRoom = db.sequelize.define('userInRooms',{
    userType: db.Sequelize.STRING,
    enterDate: db.Sequelize.DATE,
    idUser: db.Sequelize.INTEGER,
    idRoom: db.Sequelize.INTEGER
});

module.exports = userInRoom;