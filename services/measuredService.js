const db = require('../db/index');

exports.fetchMeasuredLogs = async (poolId, year, month) => {
  const result = await db.query(
    `select * from measured_results as mr join measured_values as mv on (mv.measured_id = mr.measured_id)
     where pool_id = $1 and extract(year from mr.measured_time) = $2 and extract(month from mr.measured_time) = $3
     ORDER BY measured_time, measured_type;`,
    [poolId, year, month]
  );
  return result.rows;
};