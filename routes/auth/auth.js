const {SignUp, Login, LoginAs} = require('../../services/auth')
const isAuth = require('../../middlewares/isAuth');
const attachCurrentUser = require('../../middlewares/attachCurrentUser');
const checkRole = require('../../middlewares/checkRole');
const express = require('express');
const authRoute = express.Router();

function router() {
    authRoute.route('/login-as').post(isAuth, attachCurrentUser, checkRole('admin'), async (req, res) => {
        try {
            const email = req.currentUser.email;
            console.log(email);
            const { user, token } = await LoginAs(email);
            return res.status(200).json({ user, token }).end();
        } catch (error) {
            console.log('Error in login as user: ', error);
            return res.json(error).status(500).end();
        }
    });

    authRoute.route('/login').post(async (req, res) => {
        try {
            const email = req.body.email;
            const password = req.body.password;
            console.log(email, password)
            const { user, token } = await Login(email, password);
            return res.status(200).json({ user, token }).end();
        } catch (error) {
            return res.json(error).status(500).end();
        }
    });

    authRoute.route('/signup').post(async (req, res) => {
        try {
            const { name, email, password } = req.body;
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