const express = require('express');
const isAuth = require('../../middlewares/isAuth');
const attachCurrentUser = require('../../middlewares/attachCurrentUser');
const { addFixa, getFixas, deleteFixa, updateFixa,
    getNearbyFixas, searchFixas } = require('../../controllers/fixasController');
const { FIXAS_SEARCH, FIXAS_NEARBY, BASE } = require('../../constants/routes');

const fixasRouter = express.Router();

function router() {
    fixasRouter.route(BASE)
        .get(isAuth, attachCurrentUser, getFixas);
    fixasRouter.route(BASE).post(addFixa);
    fixasRouter.route(BASE)
        .delete(isAuth, attachCurrentUser, deleteFixa);
    fixasRouter.route(BASE)
        .put(isAuth, attachCurrentUser, updateFixa); // use one of these
    fixasRouter.route(BASE)
        .patch(isAuth, attachCurrentUser, updateFixa); // use one of these
    fixasRouter.route(FIXAS_SEARCH)
        .get(searchFixas);
    fixasRouter.route(FIXAS_NEARBY)
        .get(getNearbyFixas);

    return fixasRouter;
}

module.exports = router;

