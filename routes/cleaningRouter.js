const express = require("express");
const router = express.Router();
const path = require("path"); 
const db = require('../db/index');


router.get("/", async (req, res) => {
    const {pool, year, month} = req.query;

    if (!pool || !year || !month) {
    return res.status(400).send("Missing parameter.");
    }
    
    try {
        result = await db.query(`

        select * from cleaning_logs
        where pool_id = $1
        and extract(year from cleaning_logs.cleaning_time) = $2
        and extract(month from cleaning_logs.cleaning_time) = $3
        ;`, [pool, year, month]);

        res.json(result.rows)


    } catch (err) {
        console.error("Greška :", err);
        res.status(500).send("Greška");
    }
});




module.exports = router;