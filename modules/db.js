const Sequelize = require('sequelize');

const sequelize = new Sequelize('mulltometro','root', '123123', {
    host: "localhost",
    dialect: 'mysql'
});

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