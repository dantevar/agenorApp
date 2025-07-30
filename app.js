//moduli
const express = require("express");
const cors = require("cors");

const { Pool } = require("pg");
const path = require("path");
const bodyParser = require("body-parser");
const { PDFDocument, StandardFonts } = require("pdf-lib");
const fs = require("fs");
const { route } = require("./routes");

const pool = new Pool({
  user: "postgres",
  host: "192.168.5.95",
  database: "agenor",
  password: "admin",
  port: 5432,
});


//express app
const app = express();
const port = 3001;

const indexRouter = require('./routes/index');


app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/', indexRouter);


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
