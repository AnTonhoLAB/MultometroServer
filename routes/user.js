const userModel = require('../modules/userModel');
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

router.post("/create", function(req, res) {
    const userToSave = req.body.user

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(userToSave.password, salt, (err, hash) => {
            if (err) {

            }
            userToSave.password = hash

            userModel.create({
                userName: userToSave.userName, 
                email: userToSave.email,
                password: userToSave.password
            }).then(savedUser => {
                res.status(200).send( { data: savedUser } );
            })
            .catch(err => {
                res.status(500).send({ message: err});
            });
        });
    });

   
});

function encrypt(word){

}

module.exports = router