const express = require("express");
const router = express.Router();
const path = require("path"); 
const db = require('../db/index');


router.get("/logs", async (req, res) => {
    const {pool, year, month} = req.query;

    if (!pool || !year || !month) {
    return res.status(400).send("Missing parameter.");
    }
    
    try {
        result = await db.query(`

        select * from measured_results as mr join measured_values as mv on (mv.measured_id = mr.measured_id)

        where pool_id = $1
        and extract(year from mr.measured_time) = $2
        and extract(month from mr.measured_time) = $3
        ORDER BY measured_time, measured_type;
        ;`, [pool, year, month]);

        res.json(result.rows)


    } catch (err) {
        console.error("Greška :", err);
        res.status(500).send("Greška");
    }
});



module.exports = router;