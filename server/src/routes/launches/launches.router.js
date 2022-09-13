const { getAllLaunches, httpGetAllLaunches, httpAddNewLaunch } = require('./lauches.controller');

const router = require('express').Router();




router.route('/').get(httpGetAllLaunches).post(httpAddNewLaunch)


module.exports = router;