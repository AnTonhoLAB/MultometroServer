const userModel = require('../model/userModel');
const roomModel = require('../model/roomModel');
const userInRoom = require('../model/userInRoomModel');
const db = require('../../modules/db');

function createRoom(roomToSave, user) {

    return roomModel.create({
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
        return roomModel.findById( _userInRoom.id, roomInformationFilter());
    })
    .catch(err => {
        return err;
    });
}

function getMyRooms(userId){
    return userInRoom.findAll(roomInformationFilterWhereId(userId))
        .then(rooms => {
            return rooms.map( room => {
                return room.room;
            }) ;
        })
        .catch(err => {
            return err;
        });
}

function getRoomById(room) {
    return roomModel.findById( room.id, roomInformationFilter())
        .then( room => {
            return room
        })
        .catch(err => {
            return err
        });
}

function enterRoom(userId, roomId) {
    
    return roomModel.findById(roomId, roomInformationFilter())
        .then(room => {
            for(var i = 0; i < room.userInRooms.length; i++) {
                if (room.userInRooms[i].mulltometroUserId == userId) {
                    throw new Error('Usuario ja pertence a esta sala');
                }
            }
            return userInRoom.create({
                userType: "USER",
                enterDate: new Date(),
                mulltometroUserId: userId,
                roomId: roomId
            });
        })
}

function roomInformationFilter() {
    return {
        attributes: ['id', 'name','dueDate', 'color', 'createdAt' ],
        include: [{    
            attributes: ['userType', 'enterDate','mulltometroUserId'],
            model: userInRoom,
            include:[ {
                    attributes: ['userName', 'email', 'photoURL'],
                    model: userModel,
                    // as: 'userDescription'
                }]
        }]
    } 
}

function roomInformationFilterWhereId(userId) {
    return {
        where: { mulltometroUserId: userId },

        // attributes: ['userType', 'enterDate','mulltometroUserId', 'roomId'],
        attributes: [],
        include: [{
            attributes: ['id', 'name','dueDate', 'color', 'createdAt'],
            model: roomModel,
            include: [{
                attributes: ['userType', 'enterDate','mulltometroUserId', 'roomId'],
                model: userInRoom,
                include: [{
                    attributes: ['userName', 'email', 'photoURL'],
                    model: userModel,
                }]
            }]
        }]
    }
}

module.exports = { 
   createRoom: createRoom,
   getMyRooms: getMyRooms,
   getRoomById: getRoomById,
   enterRoom: enterRoom
}