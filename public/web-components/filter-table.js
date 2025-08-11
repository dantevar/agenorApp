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
      data.forEach(element => {
      element.log_date = element.log_date.substring(0,10)
    });
      this.rows = data;
      this.render();
   }
   render() {
      const tableHTML = `
      <div>
        <table class="table table-bordered table-sm">
          <thead>
            <tr>
              <th style="width:200px;">Datum ispiranja</th>
              <th>Napomena</th>
              <th>Izvršioc</th>

            </tr>
          </thead>
          <tbody>
            ${this.rows
               .map(
                  row => `
              <tr>
                
                <td>${row.log_date}</td>
                <td>${row.note}</td>
                <td>${row.operator}</td>

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

customElements.define("filter-table", DynamicTable);
