const { httpGetAllPlanets } = require('./planet.controller');

const router = require('express').Router();



router.route("/").get(httpGetAllPlanets);



module.exports = router;









