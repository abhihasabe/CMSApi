const express = require('express');
const router = express.Router();

const salaryController = require('../controllers/salary.controller');

const checkAuth = require('../../helper/token/token_helper');

const { addSalaryValidation } = require('../../validation/salary/salary.validation');

// create new Admin
router.post('/addSalary', checkAuth, addSalaryValidation, salaryController.createSalary);

module.exports = router;