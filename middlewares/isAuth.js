const jwt = require('express-jwt');

const getTokenFromHeader = (req) => {
    console.log('Token from request', req.body.token);
    return req.body.token;
}

// decode the currently sent token in req and make it available at req.token.data
module.exports = jwt({
    secret: "eViS3kritKiy", // Has to be the same that we used to sign the JWT
    userProperty: 'token', // this is where the next middleware can find the encoded data generated in services/auth:generateToken
    getToken: getTokenFromHeader, // A function to get the auth token from the request
    algorithms:['sha1', 'RS256', 'HS256']
});