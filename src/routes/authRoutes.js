const express = require('express');
const authController = require('../controllers/authController');

const authRoutes = express.Router();

authRoutes.post('/register', authController.register);

module.exports = authRoutes;
