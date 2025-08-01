// routes/poolsRouter.js
// dropdown objekata u dropdown bazena za određeni objekt

const express = require("express");
const router = express.Router();
const db = require("../db/index");

// POST ruta za submit (već imaš)
router.post("/submit", async (req, res) => {
  // ...
});

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

// GET svi bazeni
router.get("/pools", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM pools");
    console.log(`Svi bzeni:`, result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error(`Greška pri dohvaćanju bazena za objekt:`, err);
    res.status(500).send("Greška pri dohvaćanju bazena");
  }
});

// GET bazeni za određeni objekt
router.get("/pools/:objectId", async (req, res) => {
  const { objectId } = req.params;
  try {
    const result = await db.query("SELECT * FROM pools WHERE object_id = $1", [
      objectId,
    ]);
    console.log(`Bazeni za objekt ${objectId}:`, result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error(`Greška pri dohvaćanju bazena za objekt ${objectId}:`, err);
    res.status(500).send("Greška pri dohvaćanju bazena");
  }
});

module.exports = router;
