const Fixa = require('../../models/fixa');
module.exports = async (req, res, next)=>{
    Fixa.aggregate([
        {
          $geoNear: {
             near: {
            type: "Point",
             coordinates: [ parseFloat(req.query.lng), parseFloat(req.query.lat)] },
             key: 'location',
             distanceField: "dist.calculated",
             maxDistance: req.query.maxDistance?req.query.maxDistance: 2000,
             includeLocs: "dist.location",
             spherical: true
          }
        }
        // ,{
        //     $limit: 5
        // }
     ]).then((results)=>{
         res.json(results);
    });
};