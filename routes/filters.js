const express = require("express");
const router = express.Router();
const path = require("path"); 
const db = require('../db/index');


router.get("/all", async (req, res) => {
    try {
        result = await db.query(`
        select * from pool_filters_logs
        `);
        rows = result.rows;


    } catch (err) {
        console.error("Greška :", err);
        res.status(500).send("Greška");
    }
});


// router.post("menu/submit", async (req, res) => {
//   const { objekt, godina, mjesec } = req.body;

//   try {
//     await db.query(`
//       CREATE TABLE IF NOT EXISTS dodana_voda (
//         id SERIAL PRIMARY KEY,
//         objekt VARCHAR(255),
//         godina INTEGER,
//         mjesec VARCHAR(10)
//       )
//     `);

//     await db.query(
//       "INSERT INTO dodana_voda (objekt, godina, mjesec) VALUES ($1, $2, $3)",
//       [objekt, godina, mjesec]
//     );

//     res.status(200).send("Podaci spremljeni.");
//   } catch (err) {
//     console.error("Greška prilikom spremanja u bazu:", err);
//     res.status(500).send("Greška pri spremanju podataka");
//   }
// });

module.exports = router;