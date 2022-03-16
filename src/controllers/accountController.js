const { successResponse } = require('../helpers/dbHelper');

async function listGroups(req, res) {
  return successResponse(res, 'moks listGroups');
}
async function joinToGroup(req, res) {
  return successResponse(res, 'moks joinToGroup');
}

module.exports = {
  listGroups,
  joinToGroup,
};
