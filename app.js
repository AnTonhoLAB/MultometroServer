const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
require('./config/passport');

//routes files
const auth = require('./src/routes/auth');
const user = require('./src/routes/user');
const room = require('./src/routes/room');

const app = express();

//session
app.use(session({
    secret: "Mulltometro",
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//middleware

// app.use((req, res, next) => {
//     res.locals.successMsg = req.flash("successMsg");
//     res.locals.errorMsg = req.flash("errorMsg");
//     next();
// });

//bodyparser
app.use(bodyParser.urlencoded( { extended: true } ));
app.use(bodyParser.json());

app.use('/auth', auth);

app.use('/user', passport.authenticate('jwt', {session: false}), user);
app.use('/room', passport.authenticate('jwt', {session: false}), room);

const PORT = process.env.PORT || 8081 
app.listen(PORT, ()=> {
    console.log("PPQP");
});
