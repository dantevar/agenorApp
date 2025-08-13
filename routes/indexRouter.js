const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const indexController = require("../controllers/indexController");

router.post('/', authController.login);
router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/signup', authController.register);

router.get('/objects', indexController.getObjects);
router.get('/', indexController.serveRoot);

module.exports = router;
