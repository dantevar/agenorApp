const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../db/index");

authController = require("../controllers/authController");


router.post("/login", authController.login);
router.post("/register", authController.register);

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


module.exports = router;
