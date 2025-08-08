const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../db/index");

// GET svi objekti
router.get("/objects", async (req, res) => {
   try {
      const result = await db.query("SELECT * FROM objects");
      console.log("Svi objekti:", result.rows);
      res.json(result.rows);
   } catch (err) {
      console.error("Greška prilikom dohvaćanja objekata:", err);
      res.status(500).send("Greška pri dohvaćanju objekata");
   }
});

// GET svi bazeni
router.post("/pools", async (req, res) => {
   try {
      const obj = req.body["object_id"];
      if (!obj ) {
         return res.status(400).send("Invalid obj.");
      }
      const result = await db.query(
         "SELECT * FROM pools where object_id = $1 ;",
         [obj]
      );
      console.log("uspjeh:");
      res.json(result.rows);
   } catch (err) {
      console.error("Greška prilikom slanja:", err);
      res.status(500).send("Greška pri slanju objekta");
   }
});


module.exports = router;
