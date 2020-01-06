const express = require('express')
const debug = require('debug')('app:servicesRoute');
const servicesRoute = express.Router()

function router(service) {
    servicesRoute.route('/').get((req, res) => {
        debug(service);
        res.json({ welcome: 'we are in' })
    });
    return servicesRoute;
}

module.exports = router;