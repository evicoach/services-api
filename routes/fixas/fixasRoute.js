const express = require('express');
const isAuth = require('../../middlewares/isAuth');
const attachCurrentUser = require('../../middlewares/attachCurrentUser');
const { addFixa, getFixas, deleteFixa, updateFixa,
    getNearbyFixas, searchFixas } = require('../../controllers/fixasController');

const fixasRouter = express.Router();

function router() {
    fixasRouter.route('/')
        .get(isAuth, attachCurrentUser, getFixas);
    fixasRouter.route('/').post(addFixa);
    fixasRouter.route('/')
        .delete(isAuth, attachCurrentUser, deleteFixa);
    fixasRouter.route('/')
        .put(isAuth, attachCurrentUser, updateFixa); // use one of these
    fixasRouter.route('/')
        .patch(isAuth, attachCurrentUser, updateFixa); // use one of these
    fixasRouter.route('/search')
        .get(searchFixas);
    fixasRouter.route('/nearby')
        .get(getNearbyFixas);

    return fixasRouter;
}

module.exports = router;

