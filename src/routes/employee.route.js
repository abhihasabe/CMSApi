const express = require('express');
const router = express.Router();

const employeeController = require('../controllers/employee.controller');

const checkAuth = require('../../helper/token/token_helper');

const { addEmployeeValidation } = require('../../validation/employee/employee.validation');

// create new company
//router.post('/addEmployee',checkAuth, addEmployeeValidation, employeeController.createNewEmployee);

// Login
router.post('/login',employeeController.authentication);

// Refresh Token
//router.post('/refreshToken',employeeController.refreshToken);

module.exports = router;