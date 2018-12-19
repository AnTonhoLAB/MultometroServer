const express = require("express");
const bodyParser = require("body-parser");
const user = require('./routes/user');

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get("/", function(req, res) {
    res.status(200).send( { message:  "Bem vindo ao server"} );
});

app.use('/user', user); 



app.listen(8081, function(){
    console.log("PPQP");
});
