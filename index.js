const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const flash = require('connect-flash');

//routes files
const user = require('./routes/user');
const room = require('./routes/room');

const app = express();

//session
app.use(session({
    secret: "Mulltometro",
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

//middleware
app.use((req, res, next) => {
    res.locals.successMsg = req.flash("successMsg");
    res.locals.errorMsg = req.flash("errorMsg");
    next();
});

//bodyparser
app.use(bodyParser.urlencoded( { extended: true } ));
app.use(bodyParser.json());

//Routes
app.use('/user', user);

app.listen(8081, function(){
    console.log("PPQP");
});
