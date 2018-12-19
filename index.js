const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
// require('./config/auth')(passport);
require('./config/passport');

//routes files
const auth = require('./routes/auth');
const user = require('./routes/user');

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
// app.use('/user', user);

app.use('/user', passport.authenticate('jwt', {session: false}), user);

app.listen(8081, function(){
    console.log("PPQP");
});
