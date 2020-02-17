const argon2 = require('argon2');
const { randomBytes } = require('crypto')
const UserModel = require('../models/user.model')
const jwt = require('jsonwebtoken');

exports.SignUp = async (email, password, name) => {
    console.log('signup called')
    const salt = randomBytes(32);
    const passwordHashed = await argon2.hash(password, { salt });

    const userRecord = await UserModel.create({
        password: passwordHashed,
        email,
        salt: salt.toString('hex'),
        name
    });

    const token = generateJWT(userRecord)
    // MAKE SURE TO NEVER SEND BACK THE PASSWORD OR SALT
    return {
        user: {
            email: userRecord.email,
            name: userRecord.name,
        },
        token
    }
} // end of signUp function

exports.Login = async (email, password) => {
    const userRecord = await UserModel.findOne({ email });
    if (!userRecord) {
        throw new Error('User not found');
    } else {
        const correctPassword = argon2.verify(userRecord.password, password);
        if (!correctPassword) {
            throw new Error('Incorrect password');
        }

        return {
            user: {
                email: userRecord.email,
                name: userRecord.name
            },
            token: generateJWT(userRecord)
        }
    }
} // end of Login function


exports.LoginAs = async (email) => {
    const userRecord = await UserModel.findOne({ email });
    console.log('Finding user record...');
    if (!userRecord) {
        throw new Error('User not found');
    }
    return {
        user: {
            email: userRecord.email,
            name: userRecord.name,
        },
        token: generateJWT(userRecord)
    }
} // end of LoginAs function

/**Synchronously sign the given payload 
 * into a JSON Web Token string payload
 *  - Payload to sign, could be an literal,
 *  buffer or string secretOrPrivateKey 
 * - Either the secret for HMAC algorithms,
 *  or the PEM encoded private key for RSA 
 * and ECDSA. [options] - Options for the
 *  signature returns - The JSON Web Token 
 * string */
const generateJWT = (user) => {
    return jwt.sign({
        data: {
            _id: user._id,
            name: user.name,
            email: user.email
        }
    }, "eViS3kritKiy", { expiresIn: '24h' });
} // end of generateJWT function

