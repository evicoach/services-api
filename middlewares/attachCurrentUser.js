const UserModel = require('../models/user.model');

module.exports = async (req, res, next) => {
    try {
        const decodedUser = req.token.data; // get decoded token
        console.log(decodedUser);
        const user = await UserModel.findOne({ _id: decodedUser._id });
        if (!user) {
            res.status(401).end('User not found') // user not found
        }
        req.currentUser = user; // set an new property on the req object
        return next();
    } catch (exception) {
        return res.json(exception).status(500);
    }
}