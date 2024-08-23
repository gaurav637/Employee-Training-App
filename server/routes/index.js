const express = require('express');
const router = express.Router();
const employeeRoutes = require('./employee.routes');

const routes = [
    {
        path: '/employee',
        route: employeeRoutes,
    }
]

routes.map((obj) => {
    router.use(obj.path,obj.route);
});

module.exports = router;