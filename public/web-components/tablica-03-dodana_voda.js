class DynamicTable extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.columns = []; // svaki stupac = { naziv: "", kapacitet: "", podaci: [o danima] }
    this.render();
  }

  addColumn(naziv, kapacitet) {
    const newColumn = {
      naziv,
      kapacitet,
      podaci: Array(31).fill(""), // 31 dan
    };
    this.columns.push(newColumn);
    this.render();
  }

  render() {
    const days = Array.from({ length: 31 }, (_, i) => `${i + 1}.`);

    const tableHTML = `
      <div>
        <button id="add-column-btn" class="btn btn-sm btn-dark mb-2">Dodaj bazen</button>
        <table class="table table-bordered table-sm">
          <thead>
            <tr>
              <th>Dan</th>
              ${this.columns
                .map((col) => `<th>${col.naziv} (${col.kapacitet} m³)</th>`)
                .join("")}
            </tr>
          </thead>
          <tbody>
            ${days
              .map(
                (day, rowIndex) => `
                <tr>
                  <td><strong>${day}</strong></td>
                  ${this.columns
                    .map(
                      (col, colIndex) => `
                      <td>
                        <input
                          class="form-control form-control-sm"
                          type="text"
                          value="${col.podaci[rowIndex] || ""}"
                          data-col="${colIndex}"
                          data-row="${rowIndex}"
                        />
                      </td>
                    `
                    )
                    .join("")}
                </tr>
              `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;

    this.shadowRoot.innerHTML = `
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
      <style>
        table {
          font-size: 0.8rem;
        }
        input {
          font-size: 0.75rem;
          padding: 2px 4px;
        }
      </style>
      ${tableHTML}
    `;

    // Event listener za dodavanje stupca (novi bazen)
    this.shadowRoot
      .querySelector("#add-column-btn")
      .addEventListener("click", () => {
        const naziv = prompt("Naziv bazena:");
        const kapacitet = prompt("Kapacitet bazena u m³:");
        if (naziv && kapacitet) {
          this.addColumn(naziv, kapacitet);
        }
      });

    // Pohrani vrijednosti kad se mijenjaju inputi
    this.shadowRoot.querySelectorAll("input").forEach((input) => {
      input.addEventListener("input", (e) => {
        const col = parseInt(e.target.dataset.col);
        const row = parseInt(e.target.dataset.row);
        this.columns[col].podaci[row] = e.target.value;
      });
    });
  }
}

customElements.define("dynamic-table", DynamicTable);
