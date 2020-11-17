const { json, text, response } = require('express');
const Fixa = require('../../models/fixa');
const isFixasEqual = require('../../utils/isFixasEqual');
module.exports = async (req, res, next) => {


    /**
     * First do text search
     * Then do geo search
     * Filter the two
     * And get the ones that exists in both
     */
    Fixa.find({ $text: { $search: req.query.keywords } })
        .then((docs) => {
            Fixa.aggregate([
                {
                  $geoNear: {
                     near: {
                    type: "Point",
                     coordinates: [ parseFloat(req.query.lng), parseFloat(req.query.lat)] },
                     key: 'location',
                     distanceField: "dist.calculated",
                    //  maxDistance: req.query.maxDistance?req.query.maxDistance: 2000,
                     includeLocs: "dist.location",
                     spherical: true
                  }
                }
             ]).then((results)=>{

                let nearbySearchedFixas = [];
                results.forEach((geoResult, index)=>{
                    docs.forEach((textSearchResult, index)=>{
                        if(isFixasEqual(geoResult, textSearchResult)){
                            nearbySearchedFixas.push(geoResult);
                        }
                    });
                });
                res.json(nearbySearchedFixas);
            });
        }
        );
}