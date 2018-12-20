const db = require('./db');

const room = db.sequelize.define('room',{

    name: db.Sequelize.STRING,
    dueDate: db.Sequelize.INTEGER,
    color: db.Sequelize.STRING,
});

module.exports = room;