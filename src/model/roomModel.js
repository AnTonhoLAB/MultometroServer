const db = require('../../modules/db');
const userInRoom = require('./userInRoomModel');

const room = db.sequelize.define('rooms',{
    name: db.Sequelize.STRING,
    dueDate: db.Sequelize.INTEGER,
    color: db.Sequelize.STRING,
});

room.hasMany(userInRoom);
userInRoom.belongsTo(room);

module.exports = room;