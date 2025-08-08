const express = require("express");
const router = express.Router();
const path = require("path"); 
const db = require('../db/index');


router.get("/all", async (req, res) => {
    try {
        result = await db.query(`
        select * from pool_filter_logs;
        `);
        res.json(result.rows)


    } catch (err) {
        console.error("Greška :", err);
        res.status(500).send("Greška");
    }
});


router.get("/filters", async (req, res) => {
    const objectId = req.query.object_id;
    const month = req.query.month;

    try {
        result = await db.query(
        "SELECT * FROM filters WHERE object_id = $1 and extract(month from log_date) as month = $2",
        [objectId], )
        res.json(result.rows)


    } catch (err) {
        console.error("Greška :", err);
        res.status(500).send("Greška");
    }
});



module.exports = router;