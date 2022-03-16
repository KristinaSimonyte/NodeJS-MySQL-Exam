const { successResponse } = require('../helpers/dbHelper');

function create(req, res) {
  return successResponse(res, '');
}

function list(req, res) {
  return successResponse(res, '');
}
module.exports = {
  create,
  list,
};
