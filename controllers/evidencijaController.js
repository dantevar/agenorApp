const express = require("express");
const router = express.Router();
const db = require("../db/index");



exports.getUklNedostataka = async (req, res) => {
  try {
    const rows = await db.query("SELECT * FROM ukl_nedostataka");
    res.status(200).json(rows);
  } catch (err) {
    console.error("Greška pri dohvaćanju:", err);
    res.status(500).json({ error: err.message });
  }
};


exports.postUklNedostataka = async (req, res) => {
const { DATUM, MB1, KEM1, TN, RADNJE, MB2, KEM2, IZVRSITELJ, VODITELJ } = req.body;

try {
    await db.query(
        `INSERT INTO ukl_nedostataka 
            (datum, mb1, kem1, tn, radnje, mb2, kem2, izvrsitelj, voditelj) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [DATUM, MB1, KEM1, TN, RADNJE, MB2, KEM2, IZVRSITELJ, VODITELJ]
    );
    res.status(201).json({ message: "Uklanjanje nedostataka uspješno dodano" });
} catch (err) {
    console.error("Greška prilikom dodavanja:", err);
    res.status(500).json({ error: "Greška prilikom dodavanja uklanjanja nedostataka" });
}
}
