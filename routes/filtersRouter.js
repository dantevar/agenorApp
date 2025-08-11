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
    console.log("a")

    try {
        result = await db.query(
        "SELECT * FROM filters WHERE object_id = $1; ",
        [objectId], )
        res.json(result.rows)


    } catch (err) {
        console.error("Greška :", err);
        res.status(500).send("Greška");
    }
});


// za sad dohvaca sve sve filtere 
router.get("/logs", async (req, res) => {
    const filter_id = req.query.filter_id;
    const dateObj = req.query.date;

    if (!filter_id || !dateObj) {
        return res.status(400).json({ error: "Missing filter_id or date" });
    }

    const year = parseInt(dateObj.substring(0,4));
    const month = (dateObj.substring(5,7))
    console.log(month)

    try {
        console.log(dateObj)
        result = await db.query(
        "SELECT * FROM filter_logs WHERE filter_id = $1 and substring(log_date, 6, 2) = $2 and  substring(log_date, 1, 4) = $3; ",
        [filter_id, month, year])
        
        res.json(result.rows)

    } catch (err) {
        console.error("Greška :", err);
        res.status(500).send("Greška");
    }
});


router.post("/log", async (req, res) => {
    const { filter_id, date, note, operator } = req.body;
    
    if (!filter_id || !date || !note || !operator) {
    return res.status(400).send("Missing info.");
    }

    try {

        console.log(date)
        // return
    result = await db.query(
      `
    INSERT INTO filter_logs (
    filter_id,
    log_date,
    note,
    operator
    ) VALUES ($1, TO_DATE($2, 'YYYY-MM-DD'), $3, $4)
    RETURNING *;
      `,
      [filter_id, date, note, operator]
    );

    res.json({ message: "Plan updated.", updated: result.rows[0] });

    } catch (err) {
        console.error("Greška :", err);
        res.status(500).send("Greška");
    }
});


module.exports = router;