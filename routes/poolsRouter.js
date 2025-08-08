// routes/poolsRouter.js
// dropdown objekata u dropdown bazena za određeni objekt

const express = require("express");
const router = express.Router();
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

router.post("/cleaning_logs", async (req, res) => {
  const { pool_id, cleaning_time, cleaned_area, cleaner } = req.body;

  try {
    // Ubaci cleaning log
    await db.query(
      "INSERT INTO cleaning_logs (pool_id, cleaning_time, cleaned_area, cleaner) VALUES ($1, $2, $3, $4)",
      [pool_id, cleaning_time, cleaned_area, cleaner]
    );
    res.status(201).json({ message: "Cleaning log uspješno dodan" });
  } catch (err) {
    console.error("Error details:", err);

    res
      .status(500)
      .send("Greška na serveru prilikom pokušaja unsa cleaning log-a");
  }
});

// GET svi zapisi čišćenja (cleaning_logs) - ... za prikaz u tablici, treba dohvatiti s filterom koji podrazumijeva za odabrani mjesec, bzen i objekt
router.get("/cleaning_logs", async (req, res) => {
  //  ?  const { pool_id, bject_id, cleaning_time } = req.body;

  try {
    const result = await db.query(`
      SELECT * from cleaning_logs
    `);

    // Mapiraj podatke za frontend
    const cleanedData = result.rows.map((row) => ({
      DAN: new Date(row.cleaning_time).getDay(),
      PROSTOR: row.cleaned_area,
      VRIJEME: new Date(row.cleaning_time).toLocaleString(), // ili formatiraj kako želiš
      OSOBA: row.cleaner,
      BAZEN: row.pool_name,
    }));

    res.json(cleanedData);
  } catch (err) {
    console.error("Greška pri dohvaćanju cleaning logova:", err);
    res.status(500).send("Greška pri dohvaćanju cleaning logova");
  }
});

module.exports = router;

// GET spa bazeni za određeni objekt
router.get("/spa_pools/:objectId", async (req, res) => {
  const { objectId } = req.params;
  try {
    const result = await db.query("SELECT * FROM pools WHERE is_spa = true AND object_id = $1", [objectId]);
    console.log(`Spa bazeni za objekt ${objectId}:`, result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error(`Greška pri dohvaćanju spa bazena:`, err);
    res.status(500).send("Greška pri dohvaćanju spa bazena");
  }
});