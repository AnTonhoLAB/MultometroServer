const express = require("express");
const bodyParser = require("body-parser");
const user = require('./modules/user');

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

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
