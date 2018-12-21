const db = require('./db');
const userInRoom = require('./userInRoomModel');

const room = db.sequelize.define('rooms',{
    name: db.Sequelize.STRING,
    dueDate: db.Sequelize.INTEGER,
    color: db.Sequelize.STRING,
}, {
    instanceMethods: {
        getOnlyMany: function() {
           console.log(true);
        }
    }
});

room.hasMany(userInRoom);
userInRoom.belongsTo(room);

module.exports = room;