const express = require('express');
const router = express.Router();

const companysController = require('../controllers/company.controller');

const { addUserValidation } = require('../../validation/users/user.validation');

const checkAuth = require('../../helper/token/token_helper');

// create new company
router.post('/addCompany', addUserValidation, checkAuth, companysController.createNewCompany);

// show company
router.get('/showCompany',checkAuth, companysController.showCompany);

module.exports = router;