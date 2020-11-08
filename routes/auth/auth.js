const isAuth = require('../../middlewares/isAuth');
const attachCurrentUser = require('../../middlewares/attachCurrentUser');
const checkRole = require('../../middlewares/checkRole');
const express = require('express');
const { signUpController, loginController, loginAsController } = require('../../controllers/authController');
const { check } = require('express-validator');
const authRoute = express.Router();

function router() {
    // authRoute.post('/login-as', isAuth, attachCurrentUser, checkRole('admin'), (req, res)=>{})
    authRoute.route('/login-as').post(
        [check('email', 'User email is not valid')
            .isEmail()],
        isAuth,
        attachCurrentUser,
        checkRole('admin'),
        loginAsController);

    authRoute.route('/login').post(
        [
            check('email').isEmail(),
            check('password').isLength({ min: 6 })
                .withMessage('password must be at least six characters')
        ],
         loginController);

    authRoute.route('/signup').post(
        [
            check('firstName')
                .isLength({ min: 3 })
                .withMessage('Name must be more than 3 characters. Please enter your full name'),
            check('lastName')
                .isLength({ min: 3 })
                .withMessage('Name must be more than 3 characters. Please enter your full name'),
            check('email')
                .isEmail()
                .withMessage("Please enter a valid email"),
            check('password')
                .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
            check('confirmPassword').custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Passwords confirmation does not match');
                }
                return true;
            })
        ], signUpController);

    return authRoute;
}

module.exports = router;