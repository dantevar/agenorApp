const express = require('express');
const router = express.Router();
const db = require('../db/index');


// Kreiraj tablicu ako ne postoji
db.query(`
  CREATE TABLE IF NOT EXISTS ukl_nedostataka (
    id SERIAL PRIMARY KEY,
    DATUM DATE,
    MB1 TEXT,
    KEM1 TEXT,
    TN TEXT,
    RADNJE TEXT,
    MB2 TEXT,
    KEM2 TEXT,
    IZVRSITELJ TEXT,
    VODITELJ TEXT
  )
`);

apiController = require('../controllers/apiController');
evidencijaController = require('../controllers/evidencijaController');

router.get('/objects', apiController.getObjects);
router.get('/pools', apiController.getPools);


router.get('/water_additions', apiController.getWaterAdditions);
router.post('/water_additions', apiController.postWaterAdditions);

router.get('/pool_visits', apiController.getPoolVisits);
router.post('/pool_visits', apiController.postPoolVisits);

router.get('/ukl_nedostataka', evidencijaController.getUklNedostataka);
router.post('/ukl_nedostataka', evidencijaController.postUklNedostataka);

module.exports = router;