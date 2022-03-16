const { successResponse } = require('../helpers/dbHelper');

async function listGroups(req, res) {
  return successResponse(res, '');
}
async function joinToGroup(req, res) {
  return successResponse(res, '');
}

module.exports = {
  listGroups,
  joinToGroup,
};
