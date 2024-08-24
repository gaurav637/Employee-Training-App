const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {trainingController} = require('../controllers');

router.post(
    "/create",
    trainingController.createTraining,
);

router.get(
    "/get-all",
    //authMiddleware,
    trainingController.getAllTraining,
);

router.post(
    "/search",
    trainingController.searchTrainings,
);

module.exports = router;