const userModel = require('../modules/userModel');
const express = require('express');
const router = express.Router();
const roomModel = require('../modules/roomModel');

router.post("/create", (req, res) => {
    const roomToSave = req.body.room

    roomModel.create({
        name: roomToSave.name,
        dueDate: roomToSave.dueDate,
        color: roomToSave.color,
    }).then(savedRoom => {
        res.status(200).send( { data: savedRoom } );
    })
    .catch(err => {
        res.status(500).send({ message: err });
    });
});

module.exports = router;