const { hashPass } = require('../helpers/helper');
const { insertUser } = require('../models/authModel');

async function register(req, res) {
  const { fullName, email, password } = req.body;
  const hashedPassword = hashPass(password);
  const insertResult = await insertUser(fullName, email, hashedPassword);
  return insertResult === false
    ? res.status(500)
    : res.json('user created');
}

module.exports = {
  register,
};
