const express = require("express");
const router = express.Router();
const cleaningController = require('../controllers/cleaningController');

router.get('/logs', cleaningController.getLogs);
router.get('/plan', cleaningController.getPlan);
router.post('/setplan', cleaningController.setPlan);
router.post('/addlog', cleaningController.addLog);

module.exports = router;