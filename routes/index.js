const express = require("express");
const router = express.Router();
const path = require("path"); 
const db = require('../db/index');

const initDB = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        email VARCHAR(255) NOT NULL PRIMARY KEY,
        password VARCHAR(255) NOT NULL
      )
    `);
    console.log("✅ Tabela 'users' je spremna.");
  } catch (err) {
    console.error("Greška pri kreiranju tabele:", err);
  }
};

initDB(); 


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
      res.status(200).send("Neispravni podaci"); // zbog testiranja, kasnij 401
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Greška na serveru");
  }
});


router.get("/menu", (req, res) => {
    res.sendFile("menu.html", { root: path.join(__dirname, "../public") });
});



module.exports = router;