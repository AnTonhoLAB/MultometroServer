const express = require("express");
const bodyParser = require("body-parser");
const user = require('./routes/user');

const userModel = require('./modules/userModel');

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.use('/user', user); 

// app.use(app.router);
// user.initialize(app);

app.get("/", function(req, res) {
    res.status(200).send( { message:  "Bem vindo ao server"} );
});

app.post("/createUser", function(req, res) {
    const userToSave = req.body.user

    userModel.create({
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
