const express = require('express');
const router = express.Router();

appliedFeeModel = require('../model/appliedFeeModel');

const roomController = require('../controllers/roomController');

router.post("/create", (req, res) => {
    const roomToSave = req.body.room
    const user  = req.body.user

    roomController.createRoom(roomToSave, user)
        .then( room => {
            res.status(200).send( { room: room } );
        })
        .catch(err =>{
            res.status(500).send({ message: err });
        });
});

router.post("/getMyRooms", (req, res)=> {
    const userId = req.body.id;

    roomController.getMyRooms(userId)
        .then( rooms => {
            res.status(200).send( { rooms: rooms } );
        })
        .catch(err =>{
            res.status(500).send({ message: err });
        });
});

router.post("/enterRoom", (req, res)=> {
    const userId = req.body.userId;
    const roomId = req.body.roomId;
    
    roomController.enterRoom(userId, roomId) 
        .then( room => {
            res.status(200).send( { room: room } );
        })
        .catch(err =>{
            console.log("Erro aqui " + err);
            
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
});

router.post("/applyFee", (req, res) => {
    const appliedFee = req.body.applyFee;

    roomController.applyFee(appliedFee)
        .then( room => {
            res.status(200).send( { room: room} );
        })
        .catch(err => {
            res.status(500).send({ message: err });
        });
});

router.post("/test", (req, res) => {
    res.status(200).send( { working: true } );
});

module.exports = router;