const express = require('express');
const servicesRoute = express.Router();
const Services = require('../../models/service.model')
const cors = require('cors');

function router() {
    
    servicesRoute.route('/').get((req, res) => {
        Services.find()
            .then(services => {
                res.json(services);
            });
    });

    servicesRoute.route('/').post((req, res) => {
        console.log('request got here')
        let service = new Services({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            imageUrls: req.body.imageUrls
        });
        console.log('still executing');
        service.save()
            .then(service => {
                res.json(service);
                console.log('document saved successfully');
            })
            .catch(err => {
                console.log('something went wrong, service could not be saved', err);
            });
    })
    return servicesRoute;
}

module.exports = router;