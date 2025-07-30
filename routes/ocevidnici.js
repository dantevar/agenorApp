const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/ocevidnik_01', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/ocevidnici/01.html'));
});

module.exports = router;
