const {LoginAs} = require('../../services/auth');
const {validationResult} = require('express-validator');

module.exports = async (req, res, next) => {
    try {
        const email = req.body.email;
        const errors = validationResult(req);

        // check for validation errors
        if (!errors.isEmpty()) {
            return res.json(errors.array());
        }
        console.log(email);
        const { user, token } = await LoginAs(email);
        return res.status(200).json({ user, token }).end();
    } catch (error) {
        console.log('Error in login as user: ', error);
        return res.json(error).status(500).end();
    }
};