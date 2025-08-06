class DynamicTable extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.rows = []; // svaki red = objekt s poljima
    this.render();
  }

  addRow(data) {
    this.rows.push(data);
    this.render();
  }

  render() {
    const tableHTML = `
      <div>
        <table class="table table-bordered table-sm">
          <thead>
            <tr>
              <th>Datum</th>
              <th>Mikrobiološki (odstupanje)</th>
              <th>Kemijski (odstupanje)</th>
              <th>Tehnički nedostatak (odstupanje)</th>
              <th>Poduzete radnje</th>
              <th>Mikrobiološki (kontrola)</th>
              <th>Kemijski (kontrola)</th>
              <th>Izvršioc</th>
              <th>Voditelj održavanja</th>
            </tr>
          </thead>
          <tbody>
            ${this.rows
              .map(
                (row) => `
              <tr>
                <td>${row.DATUM}</td>
                <td>${row.MB1}</td>
                <td>${row.KEM1}</td>
                <td>${row.TN}</td>
                <td>${row.RADNJE}</td>
                <td>${row.MB2}</td>
                <td>${row.KEM2}</td>
                <td>${row.IZVRSITELJ}</td>
                <td>${row.VODITELJ}</td>
              </tr>`
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;

    this.shadowRoot.innerHTML = `
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
      ${tableHTML}
    `;
  }
}

customElements.define("dynamic-table", DynamicTable);
