const express = require('express');
const isAuth = require('../../middlewares/isAuth');
const attachCurrentUser = require('../../middlewares/attachCurrentUser');
const { addFixa, getFixas, deleteFixa, updateFixa, nearbyFixas } = require('../../controllers/fixasController');

const fixasRouter = express.Router();

function router() {
    fixasRouter.route('/')
        .get(isAuth, attachCurrentUser, getFixas);
    fixasRouter.route('/')
        .post(addFixa);
    fixasRouter.route('/')
        .delete(isAuth, attachCurrentUser, deleteFixa);
    fixasRouter.route('/')
        .put(isAuth, attachCurrentUser, updateFixa);
    fixasRouter.route('/')
        .patch(isAuth, attachCurrentUser, updateFixa);

    return fixasRouter;
}

module.exports = router;

