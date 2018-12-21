const express = require('express');
const router = express.Router();

const userModel = require('../model/userModel');
const roomModel = require('../model/roomModel');
const userInRoom = require('../model/userInRoomModel');


router.post("/create", (req, res) => {
    const roomToSave = req.body.room
    const user  = req.body.user

    roomModel.create({
        name: roomToSave.name,
        dueDate: roomToSave.dueDate,
        color: roomToSave.color,
    }).then(savedRoom => {
        const userSavedRoom = userInRoom.create({
            userType: user.type,
            enterDate: new Date(),
            mulltometroUserId: user.mulltometroUserId,
            roomId: savedRoom.id
        });

        return userSavedRoom;
    })
    .then(_userInRoom => {
        return roomModel.findById( _userInRoom.id, roomInformationFilter);
    })
    .then( room => {
        const abc = room.userInRooms[0].mulltometroUser
        res.status(200).send( { room: room} );
    })
    .catch(err => {
        res.status(500).send({ message: err });
    });
});

router.post("/getRoomById", (req, res) => {
    const room = req.body.room

    roomModel.findById( room.id, roomInformationFilter)
        .then( room => {
            res.status(200).send( { room: room} );
        })
        .catch(err => {
            res.status(500).send({ message: err });
        });
});

const roomInformationFilter = {
    attributes: ['id', 'name','dueDate', 'color', 'createdAt' ],
    include: [{    
            attributes: ['userType', 'enterDate','mulltometroUserId' ],
            model: userInRoom, 
            include:[ {
                    attributes: ['userName', 'email', 'photoURL' ], 
                    model:   userModel 
                }]
        }]
} 

module.exports = router;