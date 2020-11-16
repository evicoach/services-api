/**
 * This controller accepts an array of Fixer's IDs to delete
 */

const Fixa = require('../../models/fixa');
module.exports = async (req, res, next)=>{
    Fixa.deleteMany({fixaId: {$in : [...req.body.deleteIds]}}, (err, result)=>{
        if(err) res.json(err);
        res.json({status: true, data: result});
    });
}