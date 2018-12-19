const userModel = require('../modules/userModel');
const express = require('express');
const router = express.Router();

router.post("/create", function(req, res) {
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

module.exports = router