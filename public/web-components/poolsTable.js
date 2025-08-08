class DynamicTable extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.rows = []; 
    this.render();
  }

  setData(data) {
    this.rows = data;
    console.log(data)
    this.render();
  }

  render() {
    const tableHTML = `
      <div>
        <table class="table table-bordered table-sm">
          <thead>
            <tr>
              <th>Bazen id</th>
              <th>Ime</th>
              <th>Kapacitet</th>
              <th>SPA</th>
              <th>Tip vode</th>

            </tr>
          </thead>
          <tbody>
            ${this.rows
              .map(
                (row) => `
              <tr>
                <td>${row['pool_id']}</td>
                <td>${row['pool_name']}</td>
                <td>${row['pool_capacity']}</td>
                <td>${row['is_spa']}</td>
                <td>${row['water_type']}</td>
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

customElements.define("pools-table", DynamicTable);
