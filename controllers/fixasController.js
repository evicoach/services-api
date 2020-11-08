const Fixa = require('../models/Fixa');
const addFixa = require('./fixas/addFixa');
const deleteFixa = require('./fixas/deleteFixa');
const updateFixa = require('./fixas/updateFixa');
const getFixas = require('./fixas/getFixas');
const getNearbyFixas = require('./fixas/getNearbyFixas');

module.exports.getFixas = getFixas;
module.exports.addFixa = addFixa;
module.exports.deleteFixa = deleteFixa;
module.exports.updateFixa = updateFixa;
module.exports.nearbyFixas = getNearbyFixas;