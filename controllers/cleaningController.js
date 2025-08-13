const cleaningService = require('../services/cleaningService');

exports.getLogs = async (req, res) => {
  const { pool, year, month } = req.query;
  if (!pool || !year || !month) return res.status(400).send('Missing parameter.');
  try {
    const rows = await cleaningService.fetchCleaningLogs(Number(pool), Number(year), Number(month));
    res.json(rows);
  } catch (err) {
    console.error('Greška :', err);
    res.status(500).send('Greška');
  }
};

exports.getPlan = async (req, res) => {
  const { pool } = req.query;
  if (!pool) return res.status(400).send('Missing parameter.');
  try {
    const rows = await cleaningService.fetchCleaningPlan(Number(pool));
    res.status(200).json(rows);
  } catch (err) {
    console.error('Greška :', err);
    res.status(500).send('Greška');
  }
};

exports.setPlan = async (req, res) => {
  const { pool_id, area, substance, substance_conc, process_desc, frequency } = req.body;
  if (!pool_id || !area) return res.status(400).send('Missing pool_id or area.');
  try {
    const updated = await cleaningService.updateOrInsertCleaningPlan({
      pool_id,
      area,
      substance,
      substance_conc,
      process_desc,
      frequency,
    });
    if (updated === 'updated') return res.status(200).send('Updated!');
    res.json({ message: 'Plan updated.', updated });
  } catch (err) {
    console.error('Greška :', err);
    res.status(500).send('Greška');
  }
};

exports.addLog = async (req, res) => {
  const { pool_id, time, area, date, operator } = req.body;
  if (!pool_id || !time || !area || !date || !operator) return res.status(400).send('Missing data.');
  try {
    const [year, month, day] = date.split('-').map(Number);
    const [hours, minutes] = time.split(':').map(Number);
    const timestamp = new Date(Date.UTC(year, month - 1, day, hours, minutes));
    if (isNaN(timestamp.getTime())) return res.status(400).send('Invalid date or time.');

    const updated = await cleaningService.insertCleaningLog({
      pool_id,
      area,
      cleaning_time: timestamp,
      cleaner: operator,
    });

    res.json({ message: 'Logs updated.', updated });
  } catch (err) {
    console.error('Greška :', err);
    res.status(500).send('Greška');
  }
};