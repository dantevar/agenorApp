const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../db/index");

// GET svi objekti
router.get("/object", async (req, res) => {
   try {
      const result = await db.query("SELECT * FROM objects");
      console.log("Svi objekti:", result.rows);
      res.json(result.rows);
   } catch (err) {
      console.error("Greška prilikom dohvaćanja objekata:", err);
      res.status(500).send("Greška pri dohvaćanju objekata");
   }
});

// POST novi objekt
router.post("/newobject", async (req, res) => {
   try {
      const name = req.body["name"];
      if (!name || typeof name !== "string") {
         return res.status(400).send("Invalid name.");
      }
      const result = await db.query(
         "INSERT INTO objects (name) values ($1) RETURNING *;",
         [name]
      );
      console.log("uspjeh:");
      res.json(result.rows);
   } catch (err) {
      console.error("Greška prilikom slanja:", err);
      res.status(500).send("Greška pri slanju objekta");
   }
});


module.exports = router;
