const adminService = require('../services/adminService');

exports.createObject = async (req, res) => {
  try {
    const name = req.body['name'];
    if (!name || typeof name !== 'string') return res.status(400).send('Invalid name.');
    const rows = await adminService.insertObject(name.trim());
    res.json(rows);
  } catch (err) {
    console.error('Greška prilikom slanja:', err);
    res.status(500).send('Greška pri slanju objekta');
  }
};

exports.createPool = async (req, res) => {
  try {
    const data = req.body;
    const { obj, name, capacity, spa, water } = data;

    if (!name || typeof name !== 'string') return res.status(400).send('Invalid pool name.');
    if (!obj || isNaN(Number(obj))) return res.status(400).send('Invalid object ID.');
    if (!capacity || isNaN(Number(capacity))) return res.status(400).send('Invalid capacity.');
    if (spa !== 'true' && spa !== 'false') return res.status(400).send('Invalid spa value.');

    const allowedWaterTypes = ['FRESH', 'SEA', 'MIX'];
    if (!allowedWaterTypes.includes(water)) return res.status(400).send('Invalid water type.');

    const objectId = Number(obj);
    const poolName = name.trim();
    const poolCapacity = Number(capacity);
    const isSpa = spa === 'true';

    const created = await adminService.insertPool({ objectId, poolName, poolCapacity, isSpa, water });
    res.status(201).json(created);
  } catch (err) {
    console.error('Greška prilikom dodavanja bazena:', err);
    res.status(500).send('Greška na serveru.');
  }
};