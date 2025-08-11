const db = require('../db/index'); 

exports.getObjects = async () => {
    const res = await db.query('SELECT * FROM objects');
    return res.rows;
};

exports.getPools = async () => {
    const res = await db.query('SELECT * FROM pools');
    return res.rows;
};

exports.getPoolsByObjectId = async (objectId) => {
    const res = await db.query(
        'SELECT pool_id, pool_name, pool_capacity FROM pools WHERE object_id = $1',
        [objectId]
    );
    return res.rows;
};

// ---------------- WATER ADDITIONS ----------------
exports.getWaterAdditions = async (poolIds, startDate, endDate) => {
    const res = await db.query(
        `SELECT pool_id, addition_date, capacity 
         FROM water_additions 
         WHERE pool_id = ANY($1) AND addition_date BETWEEN $2 AND $3`,
        [poolIds, startDate, endDate]
    );
    return res.rows;
};

exports.addWaterAddition = async (pool_id, addition_date, capacity) => {
    const existing = await db.query(
        `SELECT 1 FROM water_additions WHERE pool_id = $1 AND addition_date = $2`,
        [pool_id, addition_date]
    );

    if (existing.rows.length === 0) {
        await db.query(
            `INSERT INTO water_additions (pool_id, addition_date, capacity)
             VALUES ($1, $2, $3)`,
            [pool_id, addition_date, capacity]
        );
    } else {
        await db.query(
            `UPDATE water_additions SET capacity = $1 WHERE pool_id = $2 AND addition_date = $3`,
            [capacity, pool_id, addition_date]
        );
    }
};

// ---------------- POOL VISITS ----------------
exports.getVisits = async (poolIds, startDate, endDate) => {
    const res = await db.query(
        `SELECT pool_id, visit_date, n_visitors 
         FROM pool_visits 
         WHERE pool_id = ANY($1) AND visit_date BETWEEN $2 AND $3`,
        [poolIds, startDate, endDate]
    );
    return res.rows;
};

exports.addVisit = async (pool_id, visit_date, n_visitors) => {
    const existing = await db.query(
        `SELECT 1 FROM pool_visits WHERE pool_id = $1 AND visit_date = $2`,
        [pool_id, visit_date]
    );

    if (existing.rows.length === 0) {
        await db.query(
            `INSERT INTO pool_visits (pool_id, visit_date, n_visitors)
             VALUES ($1, $2, $3)`,
            [pool_id, visit_date, n_visitors]
        );
    } else {
        await db.query(
            `UPDATE pool_visits SET n_visitors = $1 WHERE pool_id = $2 AND visit_date = $3`,
            [n_visitors, pool_id, visit_date]
        );
    }
};
