const express = require("express");
const router = express.Router();
const filtersController = require('../controllers/filtersController');

router.get('/all', filtersController.getAll);
router.get('/filters', filtersController.getFilters);
router.get('/logs', filtersController.getLogs);
router.post('/log', filtersController.postLog);

module.exports = router;