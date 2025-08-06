const express = require('express');
const router = express.Router();
const db = require('../db/index'); 
const pool = require('../db/index');

router.get('/objects', (req, res) => {

    console.log('Dohvaćanje objekata...');
  const sql = 'SELECT name FROM objects'; // 

    db.query(sql, (err, result) => {
    if (err) {
        console.error('Greška kod dohvata objekata:', err);
        return res.status(500).json({ error: 'Database error' });
    }

    const objekti = result.rows.map(row => row.name);
    res.json(objekti);
    });
});

router.get('/water_additions', async (req, res) => {
    const { objekt, godina, mjesec } = req.query;
    if (!objekt || !godina || !mjesec) {
        return res.status(400).json({ error: 'Missing parameters' });
    }

    try {
        // 1. Dohvati object_id iz naziva objekta
        const objectRes = await db.query('SELECT object_id FROM objects WHERE name = $1', [objekt]);
        if (objectRes.rows.length === 0) {
            return res.status(404).json({ error: 'Objekt nije pronađen' });
        }
       
        const objectId = objectRes.rows[0].object_id;
 
        
        // 2. Dohvati sve bazene za objekt
        const poolsRes = await db.query(
            'SELECT pool_id, pool_name, pool_capacity FROM pools WHERE object_id = $1',
            [objectId]
        );
        const pools = poolsRes.rows;

        console.log('Dohvaćeni bazeni:', pools);

        // 3. Generiraj sve datume u tom mjesecu
        const daysInMonth = new Date(godina, mjesec, 0).getDate(); // mjesec: 1-12
        const dates = Array.from({ length: daysInMonth }, (_, i) =>
            `${godina}-${String(mjesec).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`
        );

        // 4. Dohvati sve podatke o dodavanju vode za poolove i datume
        const poolIds = pools.map(p => p.pool_id);
        const startDate = `${godina}-${String(mjesec).padStart(2, '0')}-01`;
        const endDate = `${godina}-${String(mjesec).padStart(2, '0')}-${daysInMonth}`;
        
        const additionsRes = await db.query(
            `SELECT pool_id, date_of_water_addition, capacity 
             FROM water_additions 
             WHERE pool_id = ANY($1) AND date_of_water_addition BETWEEN $2 AND $3`,
            [poolIds, startDate, endDate]
        );

        const additions = additionsRes.rows;

        const poolsWithAdditions = pools.map(pool => {
        
            const dailyCapacities = Array(daysInMonth).fill(-1);

            const poolAdditions = additions.filter(add => add.pool_id === pool.pool_id);

            poolAdditions.forEach(add => {
                const date = new Date(add.date_of_water_addition);
                const day = date.getDate(); 
                dailyCapacities[day - 1] = add.capacity; 
            });

            return {
                pool_id: pool.pool_id,
                pool_name: pool.pool_name,
                pool_capacity: pool.pool_capacity,
                dailyCapacities 
            };
        });

        console.log('Dohvaćeni datumi:', poolsWithAdditions[1]);
        res.json(poolsWithAdditions);
    } catch (err) {
        console.error('Greška:', err);
        res.status(500).json({ error: 'Database error' });
    }

    
});

router.post('/water_additions', async (req, res) => {
  const { additions } = req.body;

  if (!Array.isArray(additions)) {
    return res.status(400).json({ error: 'Neispravan format podataka.' });
  }

  try {
    for (const add of additions) {
      const { pool_id, date, capacity } = add;

      // Provjeri postoji li već zapis
      const existing = await db.query(
        `SELECT 1 FROM water_additions WHERE pool_id = $1 AND date_of_water_addition = $2`,
        [pool_id, date]
      );

      if (existing.rows.length === 0) {
        // Ako ne postoji, umetni novi zapis
        await db.query(
          `INSERT INTO water_additions (pool_id, date_of_water_addition, capacity)
           VALUES ($1, $2, $3)`,
          [pool_id, date, capacity]
        );
      }
    }

    res.status(200).json({ message: 'Podaci spremljeni.' });
  } catch (err) {
    console.error(' Greška kod spremanja:', err);
    res.status(500).json({ error: 'Greška u bazi.' });
  }
});




router.get('/pool_visits', async (req, res) => {
    const { objekt, godina, mjesec } = req.query;
    if (!objekt || !godina || !mjesec) {
        return res.status(400).json({ error: 'Missing parameters' });
    }

    try {
        // 1. Dohvati object_id iz naziva objekta
        const objectRes = await db.query('SELECT object_id FROM objects WHERE name = $1', [objekt]);
        if (objectRes.rows.length === 0) {
            return res.status(404).json({ error: 'Objekt nije pronađen' });
        }
       
        const objectId = objectRes.rows[0].object_id;
 
        
        // 2. Dohvati sve bazene za objekt
        const poolsRes = await db.query(
            'SELECT pool_id, pool_name, pool_capacity FROM pools WHERE object_id = $1',
            [objectId]
        );
        const pools = poolsRes.rows;

        console.log('Dohvaćeni bazeni:', pools);

        // 3. Generiraj sve datume u tom mjesecu
        const daysInMonth = new Date(godina, mjesec, 0).getDate(); // mjesec: 1-12
        const dates = Array.from({ length: daysInMonth }, (_, i) =>
            `${godina}-${String(mjesec).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`
        );

        // 4. Dohvati sve podatke o dodavanju vode za poolove i datume
        const poolIds = pools.map(p => p.pool_id);
        const startDate = `${godina}-${String(mjesec).padStart(2, '0')}-01`;
        const endDate = `${godina}-${String(mjesec).padStart(2, '0')}-${daysInMonth}`;
        
        const additionsRes = await db.query(
            `SELECT pool_id, date_of_visit, n_visitors 
             FROM pool_visits 
             WHERE pool_id = ANY($1) AND date_of_visit BETWEEN $2 AND $3`,
            [poolIds, startDate, endDate]
        );

        const additions = additionsRes.rows;

        const poolsWithAdditions = pools.map(pool => {
        
            const dailyCapacities = Array(daysInMonth).fill(-1);

            const poolAdditions = additions.filter(add => add.pool_id === pool.pool_id);

            poolAdditions.forEach(add => {
                const date = new Date(add.date_of_visit);
                const day = date.getDate(); 
                dailyCapacities[day - 1] = add.n_visitors;
            });

            return {
                pool_id: pool.pool_id,
                pool_name: pool.pool_name,
                pool_capacity: pool.pool_capacity,
                dailyCapacities 
            };
        });

        console.log('Dohvaćeni datumi:', poolsWithAdditions[1]);
        res.json(poolsWithAdditions);
    } catch (err) {
        console.error('Greška:', err);
        res.status(500).json({ error: 'Database error' });
    }

    
});

router.post('/pool_visits', async (req, res) => {
  const { additions } = req.body;

  if (!Array.isArray(additions)) {
    return res.status(400).json({ error: 'Neispravan format podataka.' });
  }

  try {
    for (const add of additions) {
      const { pool_id, date, visits } = add;

      // Provjeri postoji li već zapis
      const existing = await db.query(
        `SELECT 1 FROM pool_visits WHERE pool_id = $1 AND date_of_visit = $2`,
        [pool_id, date]
      );

       if (existing.rows.length === 0) {
        // Ako ne postoji, umetni novi zapis
        await db.query(
          `INSERT INTO pool_visits (pool_id, date_of_visit, n_visitors)
           VALUES ($1, $2, $3)`,
          [pool_id, date, visits]
        );
      }
    }

    res.status(200).json({ message: 'Podaci spremljeni.' });
  } catch (err) {
    console.error(' Greška kod spremanja:', err);
    res.status(500).json({ error: 'Greška u bazi.' });
  }
});

module.exports = router;