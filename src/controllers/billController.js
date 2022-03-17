const { successResponse, failResponse } = require('../helpers/dbHelper');
const { insertBill, listBillByGroupId } = require('../models/billModel');

async function createBill(req, res) {
  const { groupId, amount, description } = req.body;

  const insertResult = await insertBill(groupId, amount, description);
  return insertResult === false
    ? failResponse(res)
    : successResponse(res, 'bill created');
}

async function listBill(req, res) {
  const { groupId } = req.params;
  const foundBills = await listBillByGroupId(groupId);

  return foundBills === false
    ? failResponse(res)
    : successResponse(res, foundBills);
}

module.exports = {
  createBill,
  listBill,
};
