const mongoose = require('mongoose');
const Fixa = require('../../models/fixa');
module.exports = async (req, res, next)=>{
    try{
        let fixa = new Fixa({
            fixaId: mongoose.Types.ObjectId(),
             address: req.body.address,
            location:{
                type: 'Point',
                coordinates:[req.body.longitude, req.body.latitude],
                // any other data can be added to the location
            }
        });

        res.json({data: fixa});


        // console.log(req.body);
        // const fixa = await Fixa.create(req.body);
        // return res.status(200).json({
        //     success: true,
        //     data: fixa
        // })
    }catch(err){
        console.log(err);
        if(err.code===11000){
            return res.status(400).json({error: 'This fixer already exist'})
        }
        res.status(200).json({error: 'Server error'});
    }
};