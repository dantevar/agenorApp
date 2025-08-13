const poolsService = require('../services/poolsService');

exports.getPoolsByObject = async (req, res) => {
  try {
    const obj = req.query.object_id;
    if (!obj) return res.status(400).send('Invalid obj.');
    const rows = await poolsService.fetchPoolsByObjectId(Number(obj));
    res.json(rows);
  } catch (err) {
    console.error('Greška prilikom slanja:', err);
    res.status(500).send('Greška pri slanju objekta');
  }
};

exports.addCleaningLog = async (req, res) => {
  const { pool_id, cleaning_time, cleaned_area, cleaner } = req.body;
  try {
    await poolsService.insertCleaningLog({ pool_id, cleaning_time, cleaned_area, cleaner });
    res.status(201).json({ message: 'Cleaning log uspješno dodan' });
  } catch (err) {
    console.error('Error details:', err);
    res.status(500).send('Greška na serveru prilikom pokušaja unsa cleaning log-a');
  }
};

exports.getCleaningLogs = async (_req, res) => {
  try {
    const rows = await poolsService.fetchAllCleaningLogs();
    const cleanedData = rows.map((row) => ({
      DAN: new Date(row.cleaning_time).getDay(),
      PROSTOR: row.cleaned_area,
      VRIJEME: new Date(row.cleaning_time).toLocaleString(),
      OSOBA: row.cleaner,
      BAZEN: row.pool_name,
    }));
    res.json(cleanedData);
  } catch (err) {
    console.error('Greška pri dohvaćanju cleaning logova:', err);
    res.status(500).send('Greška pri dohvaćanju cleaning logova');
  }
};

exports.getSpaPools = async (req, res) => {
  const { objectId } = req.params;
  try {
    const rows = await poolsService.fetchSpaPoolsByObject(Number(objectId));
    res.json(rows);
  } catch (err) {
    console.error('Greška pri dohvaćanju spa bazena:', err);
    res.status(500).send('Greška pri dohvaćanju spa bazena');
  }
};

exports.getObjects = async (_req, res) => {
  try {
    const rows = await poolsService.fetchObjects();
    res.json(rows);
  } catch (err) {
    console.error('Greška pri dohvaćanju objekata:', err);
    res.status(500).send('Greška pri dohvaćanju objekata');
  }
};