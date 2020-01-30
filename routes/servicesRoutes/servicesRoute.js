const express = require('express');
const servicesRoute = express.Router();
const Services = require('../../models/service.model')

function router() {
    servicesRoute.route('/').get((req, res) => {
        Services.find()
            .then(services => {
                res.json(services);
            })
    });

    servicesRoute.route('/').post((req, res) => {
        let service = new Services({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            imageUrl: req.body.imageUrl
        });
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