const express = require("express");
const router = express.Router();
const path = require("path"); 
const db = require('../db/index');


router.get("/", (req, res) => {
    res.sendFile("menu.html", { root: path.join(__dirname, "../public") });
});


router.get('/:name', (req, res) => {
  const templateName = req.params.name;
  const filePath = path.join(__dirname, '..', 'public/templates', getTemplateFile(templateName));
  res.sendFile(filePath);
});

function getTemplateFile(name) {
  const mapping = {
    umj_mjeraca: '01_umj_mjeraca.html',
    god_ispiranje: '02_god_ispiranje.html',
    dodana_voda: '03_dodana_voda.html',
    broj_posjetitelja: '04_broj_posjetitelja.html',
    ukl_nedostataka: '05_ukl_nedostataka.html',
    rez_lab_analiza: '06_rez_lab_analiza.html',
    ispir_filtera: '07_ispir_filtera.html',
    slatka_voda: '08_slatka_voda.html',
    morska_voda: '09_morska_voda.html',
    hidromasazni_bazeni: '10_hidromasazni_bazeni.html',
    plan_ciscenja: '11_plan_ciscenja.html',
    evidencija_ciscenja: '12_evidencija_ciscenja.html'
  };

  return mapping[name] || '404.html'; // fallback
}


module.exports = router;