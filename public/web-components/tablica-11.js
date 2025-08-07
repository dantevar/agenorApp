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

  
  setData(data) {
    this.rows = data;
    this.render();
  }

  render() {
    const tableHTML = `
      <div>
        <table class="table table-bordered table-sm">
          <thead>
          
          <tr>
              <th colspan="1">  Površina </th>
              <th colspan="1"> Sredstvo </th>
              <th colspan="1"> Koncentracija sredstva </th>
              <th colspan="1"> Opis postupka </th>
              <th colspan="1"> Učestalost </th>
            </tr>
          </thead>
          <tbody>
            ${this.rows
              .map(
                (row) => `
              <tr>
                <td>${row['area']}</td>
                <td>${row['substance']}</td>
                <td>${row['substance_conc']}</td>
                <td>${row['process_desc']}</td>
                <td>${row['frequency']}</td>

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
