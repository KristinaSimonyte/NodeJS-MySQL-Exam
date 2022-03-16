const mysql = require('mysql2/promise');
const dbConfig = require('../dbConfig');

const tableName = 'bills';

async function insertBill(groupId, amount, description) {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = `
      INSERT INTO ${tableName} (group_id, amount, description)
      VALUES (?, ?, ?)
      `;
    const [insertResult] = await conn.execute(sql, [groupId, amount, description]);
    await conn.close();
    return insertResult;
  } catch (error) {
    return false;
  }
}

async function listBillByGroupId(groupId) {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = `
      SELECT * FROM ${tableName}
      WHERE group_id = ?
      `;
    const [billsFoundResult] = await conn.execute(sql, [groupId]);
    await conn.close();
    return billsFoundResult;
  } catch (error) {
    return false;
  }
}
module.exports = {
  insertBill,
  listBillByGroupId,
};
