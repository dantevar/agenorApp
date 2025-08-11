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


router.get("/plan", async (req, res) => {
    const {pool} = req.query;

    if (!pool) {
    return res.status(400).send("Missing parameter.");
    }
    
    try {
        result = await db.query(`

        select * from cleaning_plans
        where pool_id = $1
        ;`, [pool]);

        res.status(200).json(result.rows)


    } catch (err) {
        console.error("Greška :", err);
        res.status(500).send("Greška");
    }
});

router.post("/setplan", async (req, res) => {
    const { pool_id, area, substance, substance_conc, process_desc, frequency } = req.body;
    
    if (!pool_id || !area) {
    return res.status(400).send("Missing pool_id or area.");
    }

    try {
    let result = await db.query(
      `
      UPDATE cleaning_plans
      SET
        substance = $1,
        substance_conc = $2,
        process_desc = $3,
        frequency = $4
      WHERE pool_id = $5 AND area = $6
      RETURNING *;
      `,
      [substance, substance_conc, process_desc, frequency, pool_id, area]
    );

    
    if (result.rowCount != 0) {
       return res.status(200).send("Updated!");
    }

    result = await db.query(
      `
    INSERT INTO cleaning_plans (
    pool_id,
    area,
    substance,
    substance_conc,
    process_desc,
    frequency
    ) VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
      `,
      [pool_id, area, substance, substance_conc, process_desc, frequency]
    );
    console.log("go")



     res.json({ message: "Plan updated.", updated: result.rows[0] });

    } catch (err) {
        console.error("Greška :", err);
        res.status(500).send("Greška");
    }
});



router.post("/addlog", async (req, res) => {
    const { pool_id, time, area, date, operator } = req.body;
    
    if (!pool_id || !time || !area || !date || !operator){
    return res.status(400).send("Missing data.");
    }

    try {
      const [year, month, day] = date.split('-').map(Number);
      const [hours, minutes] = time.split(':').map(Number);
      const timestamp = new Date(Date.UTC(year, month - 1, day, hours, minutes));
      if (isNaN(timestamp.getTime())) {
        return res.status(400).send("Invalid date or time.");
      }

      result = await db.query(
        `
      INSERT INTO cleaning_logs (
      pool_id,
      cleaned_area,
      cleaning_time,
      cleaner
      ) VALUES ($1, $2, $3, $4)
      RETURNING *;
        `,
        [pool_id,  area, timestamp, operator]
      );
      console.log("go")



      res.json({ message: "Logs updated.", updated: result.rows[0] });

      } catch (err) {
          console.error("Greška :", err);
          res.status(500).send("Greška");
      }
});




module.exports = router;