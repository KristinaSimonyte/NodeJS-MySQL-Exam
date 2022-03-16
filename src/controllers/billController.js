const { successResponse } = require('../helpers/dbHelper');

function create(req, res) {
  return successResponse(res, 'moks createBill');
}

function list(req, res) {
  return successResponse(res, 'moks listBill');
}
module.exports = {
  create,
  list,
};
