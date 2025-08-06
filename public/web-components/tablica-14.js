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
              <th style="width 100px">Dan</th>
              <th>Čišćeni prostor - Č/N</th>
              <th>Vrijeme čišćenja</th>
              <th>Čišćenje izvršio</th>

            </tr>
          </thead>
          <tbody>
            ${this.rows
              .map(
                (row) => `
              <tr>
                <td>${row['day']}</td>
                <td>${row['area']}</td>
                <td>${row['time']}</td>
                <td>${row['cleaner']}</td>

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
