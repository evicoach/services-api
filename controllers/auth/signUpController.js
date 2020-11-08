const {SignUp} = require('../../services/auth');
const {check, validationResult} = require('express-validator');
module.exports = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json(errors.array());
        }
        console.log(firstName, lastName, email, password);
        const { user, token } = await SignUp(firstName, lastName, email, password);
        return res.json({ user, token }).status(200).end();
    } catch (error) {
        return res.json(error).status(500).end();
    }
}