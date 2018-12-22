const db = require('../../modules/db');

const appliedFee = db.sequelize.define('appliedFees',{
    
    appliedData: db.Sequelize.DATE,
    dueDate: db.Sequelize.DATE,
    paid: db.Sequelize.BOOLEAN,
    paidDate: db.Sequelize.DATE,
    description: db.Sequelize.TEXT,

    ruleId: db.Sequelize.INTEGER,
    mulltometroUserId: db.Sequelize.INTEGER,
    roomId: db.Sequelize.INTEGER,
});

// appliedFee.sync({force: true});

module.exports = appliedFee;








