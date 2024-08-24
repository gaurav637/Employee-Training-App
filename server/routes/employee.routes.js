const express = require('express');
const router = express.Router();
const {employeeController} = require('../controllers');
const authMiddleware = require('../middleware/authMiddleware');

router.post(
    "/signup",
    employeeController.registerEmployee
);

router.post(
    "/login",
    employeeController.loginEmployee
);

router.get(
    '/profile', 
    authMiddleware,
    employeeController.getEmployeeProfile
);

module.exports = router;