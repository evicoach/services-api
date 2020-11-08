const {Login} = require('../../services/auth');
const {validationResult} = require('express-validator');
module.exports = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        console.log(email, password);

        // check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json(errors.array());
        }
        const { user, token } = await Login(email, password);
        return res.status(200).json({ user, token }).end();
    } catch (error) {
        return res.json(error).status(500).end();
    }
};