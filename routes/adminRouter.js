const express = require("express");
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/newobject', adminController.createObject);
router.post('/newpool', adminController.createPool);

module.exports = router;
