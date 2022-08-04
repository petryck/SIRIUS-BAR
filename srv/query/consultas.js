const { getConnection } = require("../conexao/database");

const modulos = async (type) => {

    const conn = await getConnection();
    const results = await conn.query(`SELECT * FROM modulos WHERE type = '${type}'`);

    return results;
  };


  module.exports = {
    modulos,
  };