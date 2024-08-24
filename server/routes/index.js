const express = require('express');
const router = express.Router();
const employeeRoutes = require('./employee.routes');
const trainingRoutes = require('./training.routes');

const routes = [
    {
        path: '/employee',
        route: employeeRoutes,
    },
    {
        path: '/training',
        route: trainingRoutes,
    }
]

routes.map((obj) => {
    router.use(obj.path,obj.route);
});

module.exports = router;