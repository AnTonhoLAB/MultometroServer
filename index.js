const express = require("express");
const bodyParser = require("body-parser");
const Sequelize = require('sequelize');

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

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

const user = sequelize.define('multometroUser',{
    userName: Sequelize.STRING,
	email: Sequelize.STRING,
	photoURL: Sequelize.TEXT,
    firstTime: { 
        type: Sequelize.TINYINT,
        default: 1
    }
});

app.get("/", function(req, res) {
    res.status(200).send( { message:  "Bem vindo ao server"} );
});

app.post("/createUser", function(req, res) {
    const userToSave = req.body.user

    user.create({
        userName: userToSave.userName, 
        email: userToSave.email
    }).then(() => {
        res.status(200).send( { message:  req.body} );
    })
    .catch(err => {
        res.status(500).send({ message: err});
    });
});

app.listen(8081, function(){
    console.log("PPQP");
});
