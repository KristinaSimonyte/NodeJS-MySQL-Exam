const express = require('express');
const billController = require('../controllers/billController');

const billRoute = express.Router();

billRoute.post('/', billController.create);
billRoute.get('/', billController.list);

module.exports = billRoute;
