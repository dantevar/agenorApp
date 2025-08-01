//moduli
const express = require("express");
const cors = require("cors");

const path = require("path");
const bodyParser = require("body-parser");
const { PDFDocument, StandardFonts } = require("pdf-lib");
const fs = require("fs");

//express app
const app = express();
const port = 3001;

const indexRouter = require("./routes/indexRouter");
const menuRouter = require("./routes/menuRouter");
const poolsRouter = require("./routes/poolsRouter");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/menu", menuRouter);
app.use("/pools", poolsRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
