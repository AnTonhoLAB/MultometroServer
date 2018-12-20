const userModel = require('../modules/userModel');
const express = require('express');
const router = express.Router();
const roomModel = require('../modules/roomModel');
const userInRoom = require('../modules/userInRoomModel');

router.post("/create", (req, res) => {
    const roomToSave = req.body.room
    const user  = req.body.user

    roomModel.create({
        name: roomToSave.name,
        dueDate: roomToSave.dueDate,
        color: roomToSave.color,
    }).then(savedRoom => {
        return userInRoom.create({
            userType: "ADMIN",
            enterDate: new Date(),
            idUser: user.id,
            idRoom: savedRoom.id
        });
    })
    .then(saved => {
        res.status(200).send( { data: saved } );
    })
    .catch(err => {
        res.status(500).send({ message: err });
    });
});

module.exports = router;