const Sequelize = require('sequelize');
const prodSequelize = require('./dbCredentials');

var sequelize

if(process.env.NODE_ENV == "production") {
    sequilize = prodSequelize
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