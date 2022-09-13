const { getAllLaunches, httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunch } = require('./lauches.controller');

const router = require('express').Router();




router.route('/').get(httpGetAllLaunches).post(httpAddNewLaunch)
router.route('/:id').delete(httpAbortLaunch);

module.exports = router;