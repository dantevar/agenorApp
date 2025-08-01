class ResultsTable extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 2rem;
          font-family: Arial, sans-serif;
        }
        th, td {
          border: 1px solid #333;
          padding: 8px;
          text-align: left;
          vertical-align: top;
        }
        th {
          background-color: #f0f0f0;
        }
        caption {
          font-weight: bold;
          margin-bottom: 1rem;
          font-size: 1.2rem;
        }
        .header-row td {
          border: none;
          padding: 0;
        }
        .footer {
          font-size: 0.8rem;
          margin-top: 1rem;
          line-height: 1.3;
        }
      </style>
      <div id="container"></div>
    `;
  }

  connectedCallback() {
    // Listen for a custom event to update table with form data
    window.addEventListener("generateResultsTable", (e) => {
      this.render(e.detail);
    });
  }

  render(data) {
    const container = this.shadowRoot.getElementById("container");

    // Parametri (isto kao u tvom tekstu)
    const params = [
      "Boja - max 20 Pt/Co skale",
      "Mutnoća - max 1,0 / NTU",
      "Koncentracija vodikovih iona pH 6,5-7,8",
      `Redoks potencijal prema Ag/AgCl, 3.5 M KCI rezultat izražen prema HSE.
Slatka voda pH 6,5-7,3 max >750;
Slatka voda pH 7,3-7,8 max >770;
Morska voda pH 6,5-7,3 max >700;
Morska voda pH 7,3-7,8 max >720`,
      "Električna vodljivost µS/cm",
      "Slobodni klor 0,2-1,00 mg/L",
      "Trihalometani max 100 µg/l",
      "Pseudomonas aerug.- max <1/ cfu/100ml",
      "Escherichia coli - max <1/ cfu/100ml",  // Ovo nemaš u formi, možeš dodati ako treba
      "Legionella pneumophila - max <1/ cfu/100ml",
      "Staphylococcus aureus - max 100 / cfu/100ml",
      "Ukupne aerobne bak.-max 200/ cfu/ml",
    ];

    // Vrijednosti i J/L dohvaćamo iz data objekta
    // Za Escherichia coli sam ostavio prazno jer nije u formi, možeš dodati lako kasnije
    const values = [
      data.vrijednost1 || "",
      data.vrijednost2 || "",
      data.vrijednost3 || "",
      data.vrijednost5 || "", // redoks je pod 5
      data.vrijednost4 || "", // vodljivost 4 (mijenjam redoslijed da odgovara tabeli)
      data.vrijednost6 || "",
      data.vrijednost7 || "",
      data.vrijednost8 || "",
      "", // Escherichia coli - nema input
      data.vrijednost9 || "",
      data.vrijednost10 || "",
      data.vrijednost11 || "",
    ];

    const jlValues = [
      data.jl1 || "",
      data.jl2 || "",
      data.jl3 || "",
      data.jl5 || "",
      data.jl4 || "",
      data.jl6 || "",
      data.jl7 || "",
      data.jl8 || "",
      "",
      data.jl9 || "",
      data.jl10 || "",
      data.jl11 || "",
    ];

    container.innerHTML = `
      <table>
        <caption>RADNO VRIJEME BAZENA / WORKING HOURS</caption>
        <tbody>
          <tr class="header-row">
            <td><strong>REZULTATI LABORATORIJSKIH ANALIZA</strong></td>
          </tr>
          <tr class="header-row">
            <td>NAZIV BAZENA: <u>${data.NAZIV || "___________________________"}</u> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; DATUM: <u>${data.DATUM || "________________"}</u></td>
          </tr>
        </tbody>
      </table>

      <table>
        <thead>
          <tr>
            <th>Parametar</th>
            <th>Vrijednost</th>
            <th>J / L</th>
          </tr>
        </thead>
        <tbody>
          ${params.map((param, i) => `
            <tr>
              <td>${param.replace(/\n/g, "<br>")}</td>
              <td>${values[i]}</td>
              <td>${jlValues[i]}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>

      <div class="footer">
        <p>
          Sukladno čl. 23.,24.,25.,27.i 29. PRAVILNIKA O SANITARNO-TEHNIČKIM I HIGIJENSKIM UVJETIMA BAZENSKIH KUPALIŠTA TE O ZDRAVSTVENOJ ISPRAVNOSTI BAZENSKIH VODA (NN 59/20), uzorkovanje bazenske vode vrši se dva puta mjesečno u vanjskim i jednom mjesečno u unutarnjim bazenima. U slučaju mikrobiološke nečistoće ponavljaju se svi parametri, u slučaju kemijskog onečišćenja ponavljaju se samo neispravni pokazatelji.
        </p>
        <p>
          Rezultate analiza bazena potrebno je upisati u tablicu i izvjesiti ih na bazensko kupalište, kako bi rezultati bili dostupni korisnicima bazena. Rezultate čuvati 3 godine.
        </p>
        <p>
          Odgovorna osoba za rad bazenskog kupališta
        </p>
      </div>
    `;
  }
}

customElements.define("results-table", ResultsTable);
