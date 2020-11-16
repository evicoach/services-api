const Fixa = require('../../models/fixa');

module.exports = async (req, res, next)=>{
    Fixa.updateOne({fixaId: req.query.id},
        {}, (err, result)=>{
            if(err){
                console.log('error updating Fixer profile', err);
                res.json(err);
            }
            res.json({status: true, data: result});
        });
}