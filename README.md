# MulltometroServer

Para colocar o servidor em produção é preciso criar um arquivo com o nome dbCredentials.js na pasta modules e colocar
o segunt codigo com as suas credenciais 

  const Sequelize = require('sequelize');

  const sequelize = new Sequelize('SCHEMA_PROD','USUARIO_DE_PROD', 'SENHA_DE_PROD', {
      host: "URL_PROD",
      dialect: 'mysql'
  });

  module.exports = sequelize;
