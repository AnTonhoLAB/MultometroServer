
const roomModel = require('../model/roomModel');
const userInRoom = require('../model/userInRoomModel');
const ruleModel = require('../model/ruleModel');
const appliedFeeModel = require('../model/appliedFeeModel');
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

function applyFee(appliedFeeToSave) {
    // -- apply fee in DB
    // insert into appliedFees(`appliedData`, `dueDate`, `paid`, `description`, `ruleId`,`mulltometroUserId`, `roomId`, `createdAt`, `updatedAt`)
    // values ('2018-12-22','2019-01-01', 0,"nao adianta fala com o cara", 1,1,2, '2018-12-22','2018-12-22' ); 

    // apply fee in model
    // appliedData: 
    // dueDate: 
    // paid: false
    // description: db.Sequelize.TEXT,

    // ruleId: db.Sequelize.INTEGER,
    // mulltometroUserId: db.Sequelize.INTEGER,
    // roomId: db.Sequelize.INTEGER,
    return appliedFeeModel.create(appliedFeeToSave) //, {include: appliedFeeModel}
        .then(appliedFee => {
            return roomModel.findByPk(appliedFee.roomId, queryRoom.roomInformationFilter());
        })
        .catch(err => { 
            return err;
        });
}

module.exports = { 
   createRoom: createRoom,
   getMyRooms: getMyRooms,
   getRoomById: getRoomById,
   enterRoom: enterRoom,
   applyFee: applyFee
}