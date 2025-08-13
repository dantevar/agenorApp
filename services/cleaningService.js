const db = require('../db/index');

exports.fetchCleaningLogs = async (poolId, year, month) => {
  const result = await db.query(
    `select * from cleaning_logs
     where pool_id = $1
     and extract(year from cleaning_logs.cleaning_time) = $2
     and extract(month from cleaning_logs.cleaning_time) = $3;`,
    [poolId, year, month]
  );
  return result.rows;
};

exports.fetchCleaningPlan = async (poolId) => {
  const result = await db.query(
    `select * from cleaning_plans where pool_id = $1;`,
    [poolId]
  );
  return result.rows;
};

exports.updateOrInsertCleaningPlan = async ({ pool_id, area, substance, substance_conc, process_desc, frequency }) => {
  let result = await db.query(
    `UPDATE cleaning_plans
       SET substance = $1,
           substance_conc = $2,
           process_desc = $3,
           frequency = $4
     WHERE pool_id = $5 AND area = $6
     RETURNING *;`,
    [substance, substance_conc, process_desc, frequency, pool_id, area]
  );
  if (result.rowCount !== 0) return 'updated';

  result = await db.query(
    `INSERT INTO cleaning_plans (
       pool_id, area, substance, substance_conc, process_desc, frequency
     ) VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *;`,
    [pool_id, area, substance, substance_conc, process_desc, frequency]
  );
  return result.rows[0];
};

exports.insertCleaningLog = async ({ pool_id, area, cleaning_time, cleaner }) => {
  const result = await db.query(
    `INSERT INTO cleaning_logs (
       pool_id, cleaned_area, cleaning_time, cleaner
     ) VALUES ($1, $2, $3, $4)
     RETURNING *;`,
    [pool_id, area, cleaning_time, cleaner]
  );
  return result.rows[0];
};