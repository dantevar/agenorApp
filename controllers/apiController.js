const e = require('express');
const apiService = require('../services/apiService');

exports.getObjects = async (req, res) => {
    try {
        const objects = await apiService.getObjects();
        console.log('getObjects :', objects);
        res.json(objects);
    } catch (err) {
        console.error('Greška kod dohvata objekata:', err);
        res.status(500).json({ error: 'Database error' });
    }
}

exports.getPools = async (req, res) => {
    try {
        const pools = await apiService.getPools();
        console.log('Dohvaćeni bazeni:', pools);
        res.json(pools);
    } catch (err) {
        console.error('Greška kod dohvata bazena:', err);
        res.status(500).json({ error: 'Database error' });
    }
}

exports.getWaterAdditions = async (req, res) => {  
    
    const { objekt, godina, mjesec } = req.query;
    if (!objekt || !godina || !mjesec) {
        return res.status(400).json({ error: 'Missing parameters' });
    }

    try {
        // 1. Dohvati object_id iz naziva objekta
        
    // stupid(fix later) await apiService.getObjectIdByName(objekt);

      //  if (!objectRes) {
       //     return res.status(404).json({ error: 'Objekt nije pronađen' });
      //  }
     //   const objectId = objectRes.rows[0].object_id;
        objectId = objekt;
        console.log('Dohvaćeni objectId:', objectId);
        if (!objectId) {
            return res.status(404).json({ error: 'Objekt nije pronađen' });
        }

        // 2. Dohvati sve bazene za objekt
        const pools = await apiService.getPoolsByObjectId(objectId);


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
        
        const additions = await apiService.getWaterAdditions(poolIds, startDate, endDate);

        const poolsWithAdditions = pools.map(pool => {
            const dailyCapacities = Array(daysInMonth).fill(-1);
            const poolAdditions = additions.filter(add => add.pool_id === pool.pool_id);
            poolAdditions.forEach(add => {
                const date = new Date(add.addition_date);
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

}

exports.postWaterAdditions = async (req, res) => {
    const { additions } = req.body;
    if (!additions || !Array.isArray(additions)) {
        return res.status(400).json({ error: 'Invalid additions data' });
    }

    try {
        for (const addition of additions) {
            const { pool_id, visit_date, n_visitors } = addition;
            if (!pool_id || !visit_date || n_visitors === undefined) {
                continue; 
            }
            await apiService.addWaterAddition(pool_id, visit_date, n_visitors);
        }
        res.status(201).json({ message: 'Water additions successfully added' });
    } catch (err) {
        console.error('Greška kod dodavanja podataka o dodavanju vode:', err);
        res.status(500).json({ error: 'Database error' });
    }
}

exports.getPoolVisits = async (req, res) => {
   const { objekt, godina, mjesec } = req.query;
    if (!objekt || !godina || !mjesec) {
        return res.status(400).json({ error: 'Missing parameters' });
    }

    try {
        // 1. Dohvati object_id iz naziva objekta
        const objectRes = await apiService.getObjectIdByName(objekt);
        if (!objectRes) {
            return res.status(404).json({ error: 'Objekt nije pronađen' });
        }
       
        const objectId = objectRes;

        // 2. Dohvati sve bazene za objekt
        const poolsRes = await apiService.getPoolsByObjectId(objectId);
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

        const additionsRes = await apiService.getVisits(poolIds, startDate, endDate);

        const additions = additionsRes.rows;

        const poolsWithAdditions = pools.map(pool => {
        
            const dailyCapacities = Array(daysInMonth).fill(-1);

            const poolAdditions = additions.filter(add => add.pool_id === pool.pool_id);

            poolAdditions.forEach(add => {
                const date = new Date(add.visit_date);
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
}

exports.postPoolVisits = async (req, res) => {
    const { visits } = req.body;
    if (!visits || !Array.isArray(visits)) {
        return res.status(400).json({ error: 'Invalid visits data' });
    }

    try {
        for (const visit of visits) {
            const { pool_id, visit_date, n_visitors } = visit;
            if (!pool_id || !visit_date || n_visitors === undefined) {
                continue; 
            }
            await apiService.addVisit(pool_id, visit_date, n_visitors);
        }
        res.status(201).json({ message: 'Visits successfully added' });
    } catch (err) {
        console.error('Greška kod dodavanja posjeta bazenima:', err);
        res.status(500).json({ error: 'Database error' });
    }
}