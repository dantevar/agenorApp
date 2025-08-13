const db = require('../db/index');

exports.insertObject = async (name) => {
  const result = await db.query('INSERT INTO objects (name) values ($1) RETURNING *;', [name]);
  return result.rows;
};

exports.insertPool = async ({ objectId, poolName, poolCapacity, isSpa, water }) => {
  const result = await db.query(
    `INSERT INTO pools (object_id, pool_name, pool_capacity, is_spa, water_type)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [objectId, poolName, poolCapacity, isSpa, water]
  );
  return result.rows[0];
};