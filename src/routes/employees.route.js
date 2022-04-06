const express = require('express');
const router = express.Router();

const companysController = require('../controllers/employees.controller');

const { addUserValidation } = require('../../validation/users/user.validation');

const checkAuth = require('../../helper/token/token_helper');

// create new company
router.post('/addCompany', addUserValidation, checkAuth, companysController.createNewCompany);

module.exports = router;