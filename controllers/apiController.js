const apiService = require('../services/apiService');

// GET objekti
exports.getObjects = async (req, res) => {
    try {
        const objects = await apiService.getObjects();
        res.json(objects);
    } catch (err) {
        console.error('Greška kod dohvata objekata:', err);
        res.status(500).json({ error: 'Database error' });
    }
};

// GET svi bazeni
exports.getPools = async (req, res) => {
    try {
        const pools = await apiService.getPools();
        res.json(pools);
    } catch (err) {
        console.error('Greška kod dohvata bazena:', err);
        res.status(500).json({ error: 'Database error' });
    }
};

// ---------------- WATER ADDITIONS ----------------
exports.getWaterAdditions = async (req, res) => {  
    const { objekt, godina, mjesec } = req.query;
    if (!objekt || !godina || !mjesec) {
        return res.status(400).json({ error: 'Missing parameters' });
    }

    try {
        const objectId = objekt;
        const pools = await apiService.getPoolsByObjectId(objectId);

        const daysInMonth = new Date(godina, mjesec, 0).getDate();
        const poolIds = pools.map(p => p.pool_id);
        const startDate = `${godina}-${String(mjesec).padStart(2, '0')}-01`;
        const endDate = `${godina}-${String(mjesec).padStart(2, '0')}-${daysInMonth}`;
        
        const additions = await apiService.getWaterAdditions(poolIds, startDate, endDate);

        const poolsWithAdditions = pools.map(pool => {
            const dailyCapacities = Array(daysInMonth).fill(-1);
            additions
                .filter(add => add.pool_id === pool.pool_id)
                .forEach(add => {
                    const date = new Date(add.addition_date);
                    dailyCapacities[date.getDate() - 1] = add.capacity; 
                });
            return {
                pool_id: pool.pool_id,
                pool_name: pool.pool_name,
                pool_capacity: pool.pool_capacity,
                dailyCapacities 
            };
        });
        res.json(poolsWithAdditions);
    } catch (err) {
        console.error('Greška:', err);
        res.status(500).json({ error: 'Database error' });
    }
};

exports.postWaterAdditions = async (req, res) => {
    const { additions } = req.body;
    if (!additions || !Array.isArray(additions)) {
        return res.status(400).json({ error: 'Invalid additions data' });
    }

    let inserted = 0;
    try {
        for (const addition of additions) {
            const { pool_id, addition_date, capacity } = addition;
            if (!pool_id || !addition_date || capacity === undefined) continue;
            await apiService.addWaterAddition(pool_id, addition_date, capacity);
            inserted++;
        }
        if (!inserted) return res.status(400).json({ error: 'No valid additions to insert' });
        res.status(201).json({ message: 'Water additions successfully added' });
    } catch (err) {
        console.error('Greška kod dodavanja podataka o dodavanju vode:', err);
        res.status(500).json({ error: 'Database error' });
    }
};

// ---------------- POOL VISITS ----------------
exports.getPoolVisits = async (req, res) => {
    const { objekt, godina, mjesec } = req.query;
    if (!objekt || !godina || !mjesec) {
        return res.status(400).json({ error: 'Missing parameters' });
    }

    try {
        const objectId = objekt;
        const pools = await apiService.getPoolsByObjectId(objectId);

        const daysInMonth = new Date(godina, mjesec, 0).getDate();
        const poolIds = pools.map(p => p.pool_id);
        const startDate = `${godina}-${String(mjesec).padStart(2, '0')}-01`;
        const endDate = `${godina}-${String(mjesec).padStart(2, '0')}-${daysInMonth}`;

        const visits = await apiService.getVisits(poolIds, startDate, endDate);

        const poolsWithVisits = pools.map(pool => {
            const dailyCapacities = Array(daysInMonth).fill(-1);
            visits
                .filter(v => v.pool_id === pool.pool_id)
                .forEach(v => {
                    const date = new Date(v.visit_date);
                    dailyCapacities[date.getDate() - 1] = v.n_visitors;
                });
            return {
                pool_id: pool.pool_id,
                pool_name: pool.pool_name,
                pool_capacity: pool.pool_capacity,
                dailyCapacities 
            };
        });

        res.json(poolsWithVisits);
    } catch (err) {
        console.error('Greška:', err);
        res.status(500).json({ error: 'Database error' });
    }
};

exports.postPoolVisits = async (req, res) => {
    const { visits } = req.body;
    if (!visits || !Array.isArray(visits)) {
        return res.status(400).json({ error: 'Invalid visits data' });
    }

    let inserted = 0;
    try {
        for (const visit of visits) {
            const { pool_id, visit_date, n_visitors } = visit;
            if (!pool_id || !visit_date || n_visitors === undefined) continue;
            await apiService.addVisit(pool_id, visit_date, n_visitors);
            inserted++;
        }
        if (!inserted) return res.status(400).json({ error: 'No valid visits to insert' });
        res.status(201).json({ message: 'Visits successfully added' });
    } catch (err) {
        console.error('Greška kod dodavanja posjeta bazenima:', err);
        res.status(500).json({ error: 'Database error' });
    }
};
