const db = require('../../modules/db');
const userInRoom = require('./userInRoomModel');
const ruleModel = require("./ruleModel");

const room = db.sequelize.define('rooms',{
    name: db.Sequelize.STRING,
    dueDate: db.Sequelize.INTEGER,
    color: db.Sequelize.STRING,
});

room.hasMany(userInRoom);
userInRoom.belongsTo(room);

// room.ruleModel = room.belongsTo(ruleModel)
// ruleModel.room = ruleModel.belongsTo(room);
room.hasMany(ruleModel);
ruleModel.belongsTo(room);

module.exports = room;