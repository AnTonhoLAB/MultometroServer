const  db = require('../../modules/db');
const userModel = require('../model/userModel');
const roomModel = require('../model/roomModel');
const userInRoom = require('../model/userInRoomModel');
const ruleModel = require('../model/ruleModel');
const appliedFeeModel = require('../model/appliedFeeModel');

const roomAtributes = ['id', 'name','dueDate', 'color', 'createdAt']
const userAtributes = ['id', 'userName', 'email', 'photoURL']
const userInRoomAtributes = ['userType', 'enterDate','mulltometroUserId', 'roomId']
const appliedFeeAtributes = ['appliedData', 'dueDate', 'paid', 'paidDate', 'description','ruleId','mulltometroUserId', 'roomId']

const Op = db.Sequelize.Op;

function roomInformationFilter() {
    return {
        attributes: roomAtributes,
        include: [{    
            attributes: userInRoomAtributes,
            model: userInRoom,
            include:[ {
                    attributes: userAtributes,
                    model: userModel,
                    include: [{
                        model: appliedFeeModel,
                        attributes:appliedFeeAtributes,
                        // where: { roomId: { $col: 'userInRooms.roomId' }},
                        where: { roomId: { [Op.eq]: 1}},//'userInRoom.roomId' }},
                        include:[{
                            model: ruleModel
                        }]
                    }]
                }]
        },{
            model: ruleModel
        },{
            attributes: appliedFeeAtributes,
            model: appliedFeeModel,
            include:[{
                model: ruleModel
            }]
        }
    ]
    } 
}

function roomInformationFilterWhereId(userId) {
    return {
        where: { mulltometroUserId: userId },
        attributes: [],
        include: [{
            attributes: roomAtributes,
            model: roomModel,
            include: [{
                attributes: userInRoomAtributes,
                model: userInRoom,
                include: [{
                    attributes: userAtributes,
                    model: userModel,
                    // include: [{
                        // model: appliedFeeModel,
                        // attributes:appliedFeeAtributes,
                        // // where: { roomId: { $col: 'userInRooms.roomId' }},
                        // where: { roomId: { [Op.eq]: 1}},//'userInRoom.roomId' }},
                        // include:[{
                        //     model: ruleModel
                        // }]
                    // }]
                }]
            },{
                model: ruleModel
            },{
                attributes: appliedFeeAtributes,
                model: appliedFeeModel,
                include:[{
                    model: ruleModel
                }]
            }]
        }]
    }
}

module.exports = {
    roomInformationFilter: roomInformationFilter,
    roomInformationFilterWhereId: roomInformationFilterWhereId
}