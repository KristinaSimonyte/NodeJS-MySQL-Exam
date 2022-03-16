const express = require('express');
const groupController = require('../controllers/groupController');

const groupRoute = express.Router();

groupRoute.post('/', groupController.create);

module.exports = groupRoute;
