const userModel = require('../model/userModel');
const roomModel = require('../model/roomModel');
const userInRoom = require('../model/userInRoomModel');
const ruleModel = require('../model/ruleModel');

const roomAtributes = ['id', 'name','dueDate', 'color', 'createdAt']
const userAtributes = ['userName', 'email', 'photoURL']
const userInRoomAtributes = ['userType', 'enterDate','mulltometroUserId']

function roomInformationFilter() {
    return {
        attributes: roomAtributes,
        include: [{    
            attributes: userInRoomAtributes,
            model: userInRoom,
            include:[ {
                    attributes: userAtributes,
                    model: userModel
                }]
        },{
            model: ruleModel
        }]
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
                }]
            },{
                model: ruleModel
            }]
        }]
    }
}

module.exports = {
    roomInformationFilter: roomInformationFilter,
    roomInformationFilterWhereId: roomInformationFilterWhereId
}