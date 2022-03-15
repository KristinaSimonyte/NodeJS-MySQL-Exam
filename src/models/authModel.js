const mysql = require('mysql2/promise');
const dbConfig = require('../dbConfig');

const tableName = 'users';

async function insertUser(fullName, email, pass) {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = `
    INSERT INTO ${tableName} (full_name, email, password)
    VALUES (?, ?, ?)
    `;
    const [insertResult] = await (await conn).execute(sql, [fullName, email, pass]);
    await conn.close();
    return insertResult;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  insertUser,
};
