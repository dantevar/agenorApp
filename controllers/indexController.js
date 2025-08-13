const path = require('path');
const apiService = require('../services/apiService');

exports.getObjects = async (_req, res) => {
  try {
    const result = await apiService.getObjects();
    res.json(result);
  } catch (err) {
    console.error('Greška prilikom dohvaćanja objekata:', err);
    res.status(500).send('Greška pri dohvaćanju objekata');
  }
};

exports.serveRoot = (_req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../public') });
};