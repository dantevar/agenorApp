 
 
 
 document.getElementById("generirajPDF").addEventListener("click", () => {
      const marginLeft = 20;
      const marginRight = 20;

      const marginTop = 20;
      let y = marginTop;
      let INC = 10;
      const data = {
        NAZIV: document.querySelector('input[name="NAZIV"]').value,
        DATUM: document.querySelector('input[name="DATUM"]').value,
        vrijednost1: document.getElementById("vrijednost1").value,
        vrijednost2: document.getElementById("vrijednost2").value,
        vrijednost3: document.getElementById("vrijednost3").value,
        vrijednost4: document.getElementById("vrijednost4").value,
        vrijednost5: document.getElementById("vrijednost5").value,
        vrijednost6: document.getElementById("vrijednost6").value,
        vrijednost7: document.getElementById("vrijednost7").value,
        vrijednost8: document.getElementById("vrijednost8").value,
        vrijednost9: document.getElementById("vrijednost9").value,
        vrijednost10: document.getElementById("vrijednost10").value,
        vrijednost11: document.getElementById("vrijednost11").value,
        jl1: document.getElementById("jl1").value,
        jl2: document.getElementById("jl2").value,
        jl3: document.getElementById("jl3").value,
        jl4: document.getElementById("jl4").value,
        jl5: document.getElementById("jl5").value,
        jl6: document.getElementById("jl6").value,
        jl7: document.getElementById("jl7").value,
        jl8: document.getElementById("jl8").value,
        jl9: document.getElementById("jl9").value,
        jl10: document.getElementById("jl10").value,
        jl11: document.getElementById("jl11").value,
      };

      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();

      doc.setFontSize(12);
      doc.text(`Naziv bazena: ${data.NAZIV}`, marginLeft, y);
      y += INC;
      doc.text(`Datum: ${data.DATUM}`, marginLeft, y);
      y += INC;

      doc.setFontSize(14);
      doc.text("REZULTATI LABORATIORIJSKIH ANALIZA", pageWidth / 2, y, {
        align: "center",
      });
      doc.setFontSize(10);
      y += INC * 2;

      const rows = [
        ["Boja - max 20 Pt/Co skale", data.vrijednost1, data.jl1],
        ["Mutnoca - max 1,0/NTU", data.vrijednost2, data.jl2],
        ["Koncentracija vodikovih iona pH 6,5-7,8", data.vrijednost3, data.jl3],
        [
          "Redoks potencijal prema Ag/AgCl, 3,5 M KCl rezultat izražen prema HSE.\nSlatka voda pH 6,5-7,3 max > 750;\nSlatka voda pH 7,3-7,8 max > 770;\nMorska voda pH 6,5-7,3 max > 700;\nMorska voda pH 7,3-7,8 max > 720;",
          data.vrijednost5,
          data.jl5,
        ],
        ["Elektricna vodljivost miS/cm", data.vrijednost4, data.jl4],
        ["Slobodni klor 0,2-1,00 mg/L", data.vrijednost6, data.jl6],
        ["Trihalometani max 100 mig/L", data.vrijednost7, data.jl7],
        [
          "Pseudomonas aerug. - max < 1 / (cfu/100ml)",
          data.vrijednost8,
          data.jl8,
        ],
        [
          "Legionella pneumophila - max < 1 / (cfu/100ml)",
          data.vrijednost9,
          data.jl9,
        ],
        [
          "Staphylococcus aureus - max 100 / (cfu/100ml)",
          data.vrijednost10,
          data.jl10,
        ],
        [
          "Ukupno aerobne bakterije - - max 200 / (cfu/ml)",
          data.vrijednost11,
          data.jl11,
        ],
      ];

      doc.autoTable({
        head: [["Parametar", "Vrijednost", "J/L"]],
        body: rows,
        margin: { top: y, left: marginLeft, right: marginLeft },
      });

      doc.setFontSize(10);

      y = doc.lastAutoTable.finalY + 10;

      const maxWidth = pageWidth - marginLeft - marginRight;

      const paragraf = `Sukladno Cl. 23.,24.,25.,27.i 29. Pravilnika (NN 59/20), uzorkovanje bazenske vode vrsi se dva puta mjesecno (vanjski bazeni) i jednom mjesecno (unutarnji). U slucaju mikrobioloske necistoce ponavljaju se svi parametri, u slucaju kemijskog oneciscenja samo neispravni pokazatelji. Rezultate je potrebno upisati u tablicu, izvjesiti na bazenu i cuvati 3 godine.`;

      const wrappedText = doc.splitTextToSize(paragraf, maxWidth);
      doc.text(wrappedText, marginLeft, y);

      y += 30;
      doc.text(
        `Odgovorna osoba za rad bazenskog kupališta.\n\n\n\n` +
          `_____________________________________`,
        pageWidth - marginRight,
        y,
        { maxWidth: maxWidth, align: "right" }
      );
      const blob = doc.output("blob");
      const url = URL.createObjectURL(blob);
      const iframe = document.createElement("iframe");
      iframe.src = url;
      iframe.width = "100%";
      iframe.height = "600px";
      iframe.classList.add("mb-4", "border");

      document.getElementById("pdfLista").appendChild(iframe);

        //    doc.save("analiza_bazena.pdf");
    });