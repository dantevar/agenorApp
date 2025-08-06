const express = require("express");
const router = express.Router();
const path = require("path"); 
const db = require('../db/index');


router.get("/", (req, res) => {
    res.sendFile("menu.html", { root: path.join(__dirname, "../public") });
});

router.get("/get-menu", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM menu");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Greška na serveru");
  }
});


module.exports = router;