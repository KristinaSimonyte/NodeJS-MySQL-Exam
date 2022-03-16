const { successResponse } = require('../helpers/dbHelper');

async function listGroups(req, res) {
  return successResponse(res, 'listGroups');
}
async function joinToGroup(req, res) {
  return successResponse(res, 'joinToGroup');
}

module.exports = {
  listGroups,
  joinToGroup,
};
