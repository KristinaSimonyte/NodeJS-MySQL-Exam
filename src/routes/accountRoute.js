const express = require('express');
const accountController = require('../controllers/accountController');

const accountRoute = express.Router();

accountRoute.get('/', accountController.listGroups);
accountRoute.post('/', accountController.joinToGroup);

module.exports = accountRoute;
