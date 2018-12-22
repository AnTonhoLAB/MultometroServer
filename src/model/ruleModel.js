const db = require('../../modules/db');
const appiedFeeModel = require('./appliedFeeModel');

const rule = db.sequelize.define('rule',{
    name: db.Sequelize.STRING,
    valuePerFee: db.Sequelize.DOUBLE,
    valueType: db.Sequelize.STRING,
    symbol: db.Sequelize.STRING,
    description: db.Sequelize.TEXT,
    roomId: db.Sequelize.INTEGER
});

rule.hasMany(appiedFeeModel);
appiedFeeModel.belongsTo(rule);

module.exports = rule;
