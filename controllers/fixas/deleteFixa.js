const Fixa = require('../../models/fixa');

module.exports = async (req, res, next)=>{
    await Fixa.findOneAndDeleted({fixaId: req.query.id}, 
        (err, result)=>{
            if(err) res.json(err);
            res.json({'status': true, 
            message: 'Fixer deleted successfully', data: result});
        });
    
};