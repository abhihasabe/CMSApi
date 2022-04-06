const express = require('express');
const router = express.Router();

const companysController = require('../controllers/employees.controller');

const { employeeValidation } = require('../../validation/employee/employee.validation');

const checkAuth = require('../../helper/token/token_helper');

// create new company
router.post('/login', employeeValidation, companysController.createNewCompany);

module.exports = router;