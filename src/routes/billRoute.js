const express = require('express');
const billController = require('../controllers/billController');
const { validateToken } = require('../helpers/middleware');

const billRoute = express.Router();

billRoute.post('/', validateToken, billController.createBill);
billRoute.get('/:groupId', validateToken, billController.listBill);

module.exports = billRoute;
