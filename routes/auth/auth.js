const { SignUp, Login, LoginAs } = require('../../services/auth')
const isAuth = require('../../middlewares/isAuth');
const attachCurrentUser = require('../../middlewares/attachCurrentUser');
const checkRole = require('../../middlewares/checkRole');
const express = require('express');
const { check, validationResult } = require('express-validator');
const authRoute = express.Router();

function router() {
    // authRoute.post('/login-as', isAuth, attachCurrentUser, checkRole('admin'), (req, res)=>{})
    authRoute.route('/login-as').post(
        check('email', 'User email is not valid')
            .isEmail(),
        isAuth,
        attachCurrentUser,
        checkRole('admin'),
        async (req, res) => {
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
        });

    authRoute.route('/login').post(
        [
            check('email').isEmail(),
            check('password').isLength({ min: 6 })
                .withMessage('password must be at least six characters')
        ], async (req, res) => {
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
        });

    authRoute.route('/signup').post(
        [
            check('name').isLength({ min: 3 }).withMessage('Name must be more than 3 characters. Please enter your full name')
                .isEmpty().withMessage('Name must not be empty'),
            check('email').isEmail().withMessage("Please enter a valid email"),
            check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
                .isEmpty().withMessage('Password must not be empty')
        ], async (req, res) => {
            try {
                const { name, email, password } = req.body;

                // check for validation errors
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.json(errors.array());
                }
                console.log(email, password, name)
                const { user, token } = await SignUp(email, password, name);
                return res.json({ user, token }).status(200).end();
            } catch (error) {
                return res.json(error).status(500).end();
            }
        });

    return authRoute;
}

module.exports = router;