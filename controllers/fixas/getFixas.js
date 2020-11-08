module.exports = async (req, res, next)=>{
    try{
        const fixas = await Fixa.find();
        return res.status(200).json({
            success: true,
            count: fixas.length,
            data: fixas
        });
    }catch(err){
        console.log(err);
        res.status(200).json({error: 'Server error'});
    }
};