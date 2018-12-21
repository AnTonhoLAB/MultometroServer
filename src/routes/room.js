const express = require('express');
const router = express.Router();

const roomModel = require('../model/roomModel');

const roomController = require('../controllers/roomController');


router.post("/create", (req, res) => {
    const roomToSave = req.body.room
    const user  = req.body.user

    roomController.createRoom(roomToSave, user)
        .then( room => {
            res.status(200).send( { room: room} );
        })
        .catch(err =>{
            res.status(500).send({ message: err });
        });
});

router.post("/getRoomById", (req, res) => {
    const room = req.body.room

    roomController.getRoomById(room)
        .then( room => {
            res.status(200).send( { room: room} );
        })
        .catch(err => {
            res.status(500).send({ message: err });
        });

    // roomModel.findById( room.id, roomInformationFilter)
    //     .then( room => {
    //         res.status(200).send( { room: room} );
    //     })
    //     .catch(err => {
    //         res.status(500).send({ message: err });
    //     });
});

module.exports = router;