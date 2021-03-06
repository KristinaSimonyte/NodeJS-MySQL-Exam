const express = require('express');
const groupController = require('../controllers/groupController');
const { validateToken } = require('../helpers/middleware');

const groupRoute = express.Router();

groupRoute.post('/', validateToken, groupController.createGroup);

module.exports = groupRoute;
