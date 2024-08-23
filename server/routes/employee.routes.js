const express = require('express');
const router = express.Router();
const {employeeController} = require('../controllers');

router.post(
    "/signup",
    employeeController.registerEmployee
);

router.post(
    "/login",
    employeeController.loginEmployee
);

module.exports = router;