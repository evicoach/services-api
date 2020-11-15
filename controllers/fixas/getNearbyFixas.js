const Fixa = require('../../models/fixa');
module.exports = async (req, res, next)=>{
    var foundFixas = Fixa.aggregate([
        {
          $geoNear: {
             near: { type: "Point", 
             coordinates: [ -73.99279 , 40.719296 ] },
             key: 'location',
             distanceField: "dist.calculated",
            //  maxDistance: 2,
            //  query: { category: "Parks" },
             includeLocs: "dist.location",
             spherical: true
          }
        }
     ]).then((results)=>{
         res.json(results);
     })
};