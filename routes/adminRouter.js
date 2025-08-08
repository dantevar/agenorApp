const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../db/index");

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
      res.json(result.rows);
   } catch (err) {
      console.error("Greška prilikom slanja:", err);
      res.status(500).send("Greška pri slanju objekta");
   }
});

// POST novi bazen

router.post("/newpool", async (req, res) => {
   try {
      const data = req.body;

      // Destructure and validate required fields
      const { obj, name, capacity, spa, water } = data;

      if (!name || typeof name !== "string") {
         return res.status(400).send("Invalid pool name.");
      }

      if (!obj || isNaN(Number(obj))) {
         return res.status(400).send("Invalid object ID.");
      }

      if (!capacity || isNaN(Number(capacity))) {
         return res.status(400).send("Invalid capacity.");
      }

      if (spa !== "true" && spa !== "false") {
         return res.status(400).send("Invalid spa value.");
      }

      const allowedWaterTypes = ["FRESH", "SEA", "MIX"];
      if (!allowedWaterTypes.includes(water)) {
         return res.status(400).send("Invalid water type.");
      }

      // Convert values to proper types
      const objectId = Number(obj);
      const poolName = name.trim();
      const poolCapacity = Number(capacity);
      const isSpa = spa === "true"; // Convert to boolean

      const result = await db.query(
         `INSERT INTO pools (object_id, pool_name, pool_capacity, is_spa, water_type)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
         [objectId, poolName, poolCapacity, isSpa, water]
      );

      res.status(201).json(result.rows[0]);
   } catch (err) {
      console.error("Greška prilikom dodavanja bazena:", err);
      res.status(500).send("Greška na serveru.");
   }
});



module.exports = router;
