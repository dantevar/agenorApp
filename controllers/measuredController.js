const measuredService = require('../services/measuredService');

exports.getLogs = async (req, res) => {
  const { pool, year, month } = req.query;
  if (!pool || !year || !month) return res.status(400).send('Missing parameter.');
  try {
    const rows = await measuredService.fetchMeasuredLogs(Number(pool), Number(year), Number(month));
    res.json(rows);
  } catch (err) {
    console.error('Greška :', err);
    res.status(500).send('Greška');
  }
};