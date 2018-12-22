
const roomModel = require('../model/roomModel');
const userInRoom = require('../model/userInRoomModel');
const ruleModel = require('../model/ruleModel');
const queryRoom = require('../querysModels/queryRoom');

function createRoom(roomToSave, user) {
    
    return roomModel.create(roomToSave,{ include: [ruleModel] })
        .then(savedRoom => {
            const userSavedRoom = userInRoom.create({
                userType: user.type,
                enterDate: new Date(),
                mulltometroUserId: user.mulltometroUserId,
                roomId: savedRoom.id
            });
            return userSavedRoom;
        })
        .then(_userInRoom => {
            return roomModel.findById( _userInRoom.id, queryRoom.roomInformationFilter());
        })
        .catch(err => {
            return err;
        });
}

function getMyRooms(userId){
    return userInRoom.findAll(queryRoom.roomInformationFilterWhereId(userId))
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
    return roomModel.findByPk( room.id, queryRoom.roomInformationFilter())
        .then( room => {
            return room
        })
        .catch(err => {
            return err
        });
}

function enterRoom(userId, roomId) {
    
    return roomModel.findByPk(roomId, queryRoom.roomInformationFilter())
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
        .then((savedUserInRoom) => {
            return roomModel.findByPk(savedUserInRoom.roomId, queryRoom.roomInformationFilter())
        })
        .catch(err => {
            return err
        });
}

module.exports = { 
   createRoom: createRoom,
   getMyRooms: getMyRooms,
   getRoomById: getRoomById,
   enterRoom: enterRoom
}