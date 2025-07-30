//moduli
const express = require("express");
const cors = require("cors");

const { Pool } = require("pg");
const path = require("path");
const bodyParser = require("body-parser");
const { PDFDocument, StandardFonts } = require("pdf-lib");
const fs = require("fs");

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

app.use(express.static(path.join(__dirname, "public")));

app.use(cors()); // Enable all origins
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/submit", async (req, res) => {
  const { OBJEKT, DATUM, PODACI, FIRMA, UMJERAVANJE, SLJEDECE, OSOBA, VALUE } =
    req.body;

  try {
    const existingPdfBytes = fs.readFileSync(
      path.join(__dirname, "public", "pdfs", "1.1pdf.pdf")
    );
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    firstPage.drawText(OBJEKT, { x: 50, y: height - 50, size: 12, font });
    firstPage.drawText(DATUM, { x: 50, y: height - 70, size: 12, font });
    firstPage.drawText(PODACI, { x: 50, y: height - 90, size: 12, font });
    firstPage.drawText(FIRMA, { x: 50, y: height - 110, size: 12, font });
    firstPage.drawText(UMJERAVANJE, { x: 50, y: height - 130, size: 12, font });
    firstPage.drawText(SLJEDECE, { x: 50, y: height - 150, size: 12, font });
    firstPage.drawText(OSOBA, { x: 50, y: height - 170, size: 12, font });
    firstPage.drawText(VALUE.toString(), {
      x: 50,
      y: height - 190,
      size: 12,
      font,
    });

    const pdfBytes = await pdfDoc.save();
    const outputPath = path.join(__dirname, "public", "pdfs", "filled-pdf.pdf");
    fs.writeFileSync(outputPath, pdfBytes);

    res.redirect("/pdfs/filled-pdf.pdf");
  } catch (error) {
    console.error("Greška:", error);
    res.status(500).send("Dogodila se greška.");
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
