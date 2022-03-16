const { successResponse, failResponse } = require('../helpers/dbHelper');
const { insertGroup } = require('../models/groupModel');

async function create(req, res) {
  console.log(req.userId);
  const { userId } = req;
  console.log(userId);
  const { groupName } = req.body;

  const insertResult = await insertGroup(groupName, userId);
  return insertResult === false
    ? failResponse(res)
    : successResponse(res, 'group created and added to user');
}

module.exports = {
  create,
};
