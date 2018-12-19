import Sequelize from 'sequelize';

const sequelize = new Sequelize('mulltometro','root', '123123', {
    host: "localhost",
    dialect: 'mysql'
});

// sequelize.authenticate()
//     .then(() => {
//         console.log("Success");
//     })
//     .catch(err => {
//         console.log("Fail " + err);
//     });

export const Sequelize = Sequelize;
export const sequelize = sequelize;