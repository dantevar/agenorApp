// routes/poolsRouter.js
// dropdown objekata u dropdown bazena za određeni objekt

const express = require("express");
const router = express.Router();
const poolsController = require('../controllers/poolsController');

router.get('/', poolsController.getPoolsByObject);
router.post('/cleaning_logs', poolsController.addCleaningLog);
router.get('/cleaning_logs', poolsController.getCleaningLogs);
router.get('/spa_pools/:objectId', poolsController.getSpaPools);
router.get('/object', poolsController.getObjects);

module.exports = router;