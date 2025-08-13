const db = require('../db/index');

exports.fetchAllFilterLogs = async () => {
  const result = await db.query('select * from pool_filter_logs;');
  return result.rows;
};

exports.fetchFiltersByObjectId = async (objectId) => {
  const result = await db.query('SELECT * FROM filters WHERE object_id = $1;', [objectId]);
  return result.rows;
};

exports.fetchFilterLogs = async (filterId, month, year) => {
  const result = await db.query(
    'SELECT * FROM filter_logs WHERE filter_id = $1 and substring(log_date, 6, 2) = $2 and  substring(log_date, 1, 4) = $3;',
    [filterId, month, year]
  );
  return result.rows;
};

exports.insertFilterLog = async ({ filter_id, date, note, operator }) => {
  const result = await db.query(
    `INSERT INTO filter_logs (
       filter_id, log_date, note, operator
     ) VALUES ($1, TO_DATE($2, 'YYYY-MM-DD'), $3, $4)
     RETURNING *;`,
    [filter_id, date, note, operator]
  );
  return result.rows[0];
};