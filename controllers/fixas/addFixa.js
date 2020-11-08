module.exports = async (req, res, next)=>{
    try{
        console.log(req.body);
        const fixa = await Fixa.create(req.body);
        return res.status(200).json({
            success: true,
            data: fixa
        })
    }catch(err){
        console.log(err);
        if(err.code===11000){
            return res.status(400).json({error: 'This fixer already exist'})
        }
        res.status(200).json({error: 'Server error'});
    }
};