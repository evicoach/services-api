const { json } = require('express');
const Fixa = require('../../models/fixa');
module.exports = async (req, res, next) => {

    let query = {}
    Fixa.find({ $text: { $search: req.query.keywords } })
        .then((docs) => {
            console.log('it is working here', docs);
            query._id = { $in: docs.map(doc => doc._id) };
            query.$nearSphere = {
                near: {
                    type: "Point",
                    coordinates: [
                        parseFloat(req.query.lng), parseFloat(req.query.lat)
                    ]
                },
                key: 'location',
            }

        }
        );

    Fixa.find(query).then((docs) => {
        res.json(docs)
    });
}