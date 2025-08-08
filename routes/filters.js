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
    console.log("a")

    try {
        result = await db.query(
        "SELECT * FROM pool_filter_logs WHERE filter_id = $1; ",
        [filter_id], )
        res.json(result.rows)


    } catch (err) {
        console.error("Greška :", err);
        res.status(500).send("Greška");
    }
});



module.exports = router;