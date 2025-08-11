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

router.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "../public") });
});

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await db.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      [email, password]
    );

    if (result.rows.length > 0) {
      res.status(200).send("Login uspješan ");
    } else {
      res.status(200).send("Neispravni podaci, puštam te jer testiramo "); // zbog testiranja, kasnije res.status(401)
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Greška na serveru");
  }
});

router.post("/signup", async (req, res) => {
  const { email, password, phone, group } = req.body;

  try {
    // Kreiraj tabelu ako ne postoji (s dodatnim poljima)
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        user_group VARCHAR(50)
      )
    `);

    // Provjera postoji li korisnik
    const check = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (check.rows.length > 0) {
      return res.status(400).send("Korisnik već postoji");
    }

    // Ubaci korisnika
    await db.query(
      "INSERT INTO users (email, password, phone, user_group) VALUES ($1, $2, $3, $4)",
      [email, password, phone, group]
    );

    res.status(201).send("Registracija uspješna");
  } catch (err) {
    console.error("Greška pri registraciji:", err);
    res.status(500).send("Greška na serveru");
  }
});

module.exports = router;
