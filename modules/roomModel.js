const db = require('./db');

const room = db.sequelize.define('room',{

    name: db.Sequelize.STRING,
    duedate: db.Sequelize.INTEGER,


   
});

module.exports = user;