const filtersService = require('../services/filtersService');

exports.getAll = async (_req, res) => {
  try {
    const rows = await filtersService.fetchAllFilterLogs();
    res.json(rows);
  } catch (err) {
    console.error('Greška :', err);
    res.status(500).send('Greška');
  }
};

exports.getFilters = async (req, res) => {
  const objectId = req.query.object_id;
  try {
    if (!objectId) return res.status(200).json([]);
    const rows = await filtersService.fetchFiltersByObjectId(Number(objectId));
    res.json(rows);
  } catch (err) {
    console.error('Greška :', err);
    res.status(500).send('Greška');
  }
};

exports.getLogs = async (req, res) => {
  const filter_id = req.query.filter_id;
  const dateObj = req.query.date;
  try {
    if (!filter_id || !dateObj) return res.status(200).json([]);
    const year = parseInt(dateObj.substring(0, 4));
    const month = dateObj.substring(5, 7);
    const rows = await filtersService.fetchFilterLogs(Number(filter_id), month, year);
    res.json(rows);
  } catch (err) {
    console.error('Greška :', err);
    res.status(500).send('Greška');
  }
};

exports.postLog = async (req, res) => {
  const { filter_id, date, note, operator } = req.body;
  if (!filter_id || !date || !note || !operator) return res.status(400).send('Missing info.');
  try {
    const updated = await filtersService.insertFilterLog({ filter_id, date, note, operator });
    res.json({ message: 'Plan updated.', updated });
  } catch (err) {
    console.error('Greška :', err);
    res.status(500).send('Greška');
  }
};