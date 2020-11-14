const express = require('express');
const servicesRoute = express.Router();
const Services = require('../../models/service.model')
const isAuth = require('../../middlewares/isAuth');
const attacthCurrentUser = require('../../middlewares/attachCurrentUser');

function router() {

    servicesRoute.route('/').get((req, res) => {
        Services.find()
            .then(services => {
                res.json(services);
            });
    });

    servicesRoute.route('/').post(

        // check('description').isLength({ min: 150, max: 400 }),
        // check('title').isLength({ min: 4 }),
        // check('price').isString(),
        // check('imageUrls').isArray(),

        isAuth, attacthCurrentUser, (req, res) => {
            // // check for validation errors
            // const errors = validationResult(req);
            // if (!errors.isEmpty()) {
            //     return res.json(errors.array());
            // }
            let service = new Services({
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                imageUrls: req.body.imageUrls
            });
            service.save()
                .then(service => {
                    res.json(service);
                    console.log('document saved successfully');
                })
                .catch(err => {
                    console.log('something went wrong, service could not be saved', err);
                });
        });

    servicesRoute.route('/personal-services').get(isAuth, attacthCurrentUser, async (req, res) => {
        // get services where the owner property of the service is equal to the id of the current user
        console.log(req.currentUser)
    });

    servicesRoute.route('/:id').get(isAuth, attacthCurrentUser, async (req, res) => {
        const id = req.params.id;
        Services.findById(id)
            .then(service => res.json(service));
    });

    servicesRoute.route('/remove/:id').delete(isAuth, attacthCurrentUser, async (req, res) => {
        Services.findByIdAndDelete(req.params.id)
            .then(response => {
                res.json(response);
            });
    });

    // update the service in such a way that it modifies only what 
    // was supplied
    servicesRoute.route('/update/:id').put(isAuth, attacthCurrentUser, async (req, res) => {
        const serviceId = req.params.id;

        Services.findById(serviceId)
            .then(service => {
                // loop thru the supplied props and update the service accordingly
                /** write front end code to ensure images are modified one by one 
                 * and sent as an array that can include both old and new photos 
                 * of services. To prevent overwritting the former service photos
                 */
                Object.keys(req.body.serviceUpdate).forEach((key, index) => {
                    // manual validation done here
                    if (key === "imageUrls") {
                        const errors = [];
                        let valid = req.body.serviceUpdate[key].map(imageUrl => {
                            // check if the strings are valid urls
                            const regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm
                            return imageUrl.match(regex);
                        });
                        valid.forEach(valid => {
                            if (!valid) {
                                return errors.push("Invalid image urls")
                            }
                        });
                        if (errors.length > 0) {
                            res.json(errors);
                        }
                    } else {
                        service[key] = req.body.serviceUpdate[key]
                    }
                });
                // this should be hashed for security and privacy purposes
                // service.owner = req.currentUser.id;
                service.save();
                // send updated service as response
                // copying service to hide the owner id
                const serviceCopy = JSON.parse(JSON.stringify(service));
                serviceCopy.owner = "";
                res.json(serviceCopy);
            })
    });
    return servicesRoute;
}
module.exports = router;