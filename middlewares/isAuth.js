const jwt = require('express-jwt');

const getTokenFromHeader = (req) => {
    // if (req.headers.authorization && req.headers.authorization
    //     .split(' ')[0] === 'Bearer') {
    //     return req.headers.authorization.split(' ')[1];
    // }

    return req.body.token;
}

// decode the current sent token in req and make it available at req.token.data
module.exports = jwt({
    secret: "eViS3kritKiy", // Has to be the same that we used to sign the JWT
    userProperty: 'token', // this is where the next middleware can find the encoded data generated in services/auth:generateToken
    getToken: getTokenFromHeader // A function to get the auth token from the request
});