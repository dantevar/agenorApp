const express = require('express');
const router = express.Router();
const db = require('../db/index');


apiController = require('../controllers/apiController');

router.get('/objects', apiController.getObjects);
router.get('/pools', apiController.getPools);


router.get('/water_additions', apiController.getWaterAdditions);
router.post('/water_additions', apiController.postWaterAdditions);

router.get('/pool_visits', apiController.getPoolVisits);
router.post('/pool_visits', apiController.postPoolVisits);


module.exports = router;