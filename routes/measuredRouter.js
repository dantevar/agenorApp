const express = require("express");
const router = express.Router();
const measuredController = require('../controllers/measuredController');

router.get('/logs', measuredController.getLogs);

module.exports = router;