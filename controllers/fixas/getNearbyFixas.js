const Fixa = require('../../models/fixa');
module.exports = async (req, res, next)=>{
    var foundFixas = Fixa.aggregate([
        {
            "$geoNear": {
                "$near": {
                    "type": "Point",
                    "coordinates": [ req.body.long, req.body.lat]
                },
                "spherical": true,
                "distanceField": "dist.calculated"
            }
        }
    ]);

    res.json({data: foundFixas});
};