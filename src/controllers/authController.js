const { failResponse, successResponse } = require('../helpers/dbHelper');
const { hashPass, verifyHash, generateJwtToken } = require('../helpers/helper');
const { insertUser, findUserByEmail } = require('../models/authModel');

async function register(req, res) {
  const { fullName, email, password } = req.body;
  const hashedPassword = hashPass(password);
  const insertResult = await insertUser(fullName, email, hashedPassword);
  return insertResult === false
    ? failResponse(res)
    : successResponse(res, 'user created');
}
async function login(req, res) {
  const { email, password } = req.body;
  const findResults = await findUserByEmail(email);
  if (findResults === false) return failResponse(res);
  if (!findResults.length) return failResponse(res, 'Email or password does not match');
  const foundUserObj = findResults[0];
  if (!verifyHash(password, foundUserObj)) {
    return failResponse(res, 'Email or password does not match');
  }
  const token = generateJwtToken(foundUserObj);
  return successResponse(res, token);
}

module.exports = {
  register,
  login,
};
