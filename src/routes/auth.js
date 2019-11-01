const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const userModel = require('../model/userModel');

const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

router.post("/authtest", function(req, res) {
    res.status(200).send( { data: "Rodando ok" } );
}

router.post("/register", function(req, res) {
    const userToSave = req.body.user

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(userToSave.password, salt, (err, hash) => {
            if (err) {
                res.status(500).send( { message: err, code: 100 } );
            }
            userToSave.password = hash

            userModel.create({
                email: userToSave.email,
                password: userToSave.password
            }).then(savedUser => {
                res.status(200).send( { data: savedUser } );
            })
            .catch(err => {
                res.status(500).send( { message: err, code: 102 } );
            });
        });
    });
});

router.post('/login', function (req, res, next) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if ( err || !user ) {
            return res.status(400).json( { message: 'Wrong user or password' + err, code: 101 } );
        } 
        req.login(user, {session: false}, (err) => {

            if (err) {
               res.status(403).send({ message: err, code: 100 });
            }
        // generate a signed son web token with the contents of user object and return it in the response
            const token = jwt.sign(user.email, 'your_jwt_secret')
            const response = { user: user, token: token }

            return res.status(200).send(response);
        });
    })(req, res);
});

module.exports = router;