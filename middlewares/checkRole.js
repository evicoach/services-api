module.exports = (requiredRole) => {
    return (req, res, next) => {
        console.log('Required role?')
        if (req.currentUser.role !== requiredRole) {
            return res.status(401).end('You don\'t have enough permission to perform this action');
        } else {
            console.log('User meet required role, going to next middleware');
            return next();
        }
    }
}