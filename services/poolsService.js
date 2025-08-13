const db = require('../db/index');

exports.fetchPoolsByObjectId = async (objectId) => {
  const result = await db.query('SELECT * FROM pools where object_id = $1 ;', [objectId]);
  return result.rows;
};

exports.insertCleaningLog = async ({ pool_id, cleaning_time, cleaned_area, cleaner }) => {
  await db.query(
    'INSERT INTO cleaning_logs (pool_id, cleaning_time, cleaned_area, cleaner) VALUES ($1, $2, $3, $4)',
    [pool_id, cleaning_time, cleaned_area, cleaner]
  );
};

exports.fetchAllCleaningLogs = async () => {
  const result = await db.query('SELECT * from cleaning_logs');
  return result.rows;
};

exports.fetchSpaPoolsByObject = async (objectId) => {
  const result = await db.query('SELECT * FROM pools WHERE is_spa = true AND object_id = $1', [objectId]);
  return result.rows;
};

exports.fetchObjects = async () => {
  const result = await db.query('SELECT * FROM objects');
  return result.rows;
};