const Sequelize = require('sequelize');
const prodSequelize = require('./dbCredentials');

var sequelize

if(process.env.NODE_ENV == "production") {
    sequelize = new Sequelize('heroku_343c56030cd59ea','b4defcec75d888', 'f579f2e3', {
        host: "us-cdbr-iron-east-01.cleardb.net",
        dialect: 'mysql'
    });
} else {
    sequelize = new Sequelize('mulltometro','root', '123123', {
        host: "localhost",
        dialect: 'mysql'
    });
}

sequelize.authenticate()
    .then(() => {
        console.log("Success");
    })
    .catch(err => {
        console.log("Fail " + err);
    });
    
module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}