// class DynamicTable extends HTMLElement {
//   constructor() {
//     super();
//     this.attachShadow({ mode: "open" });
//     this.rows = []; // svaki red = objekt s poljima
//     this.render();
//   }

//   addRow(data) {
//     this.rows.push(data);
//     this.render();
//   }

//   render() {
//     const tableHTML = `
//       <div>
//         <table class="table table-bordered table-sm">
//           <thead>
          
//           <tr>
//             <th rowspan="2" style="width 100px">Dan</th>
//               <th colspan="4"> Početak rada </th>
//               <th colspan="4"> Sredina rada </th>
//               <th colspan="4"> Završetak rada </th>
//               <th colspan="4"> Ručno mjerenje </th>
//             </tr>

//             <tr style="border-bottom: 2px solid #000;">
              
//               <th>Temp. vode</th>
//               <th>pH</th>
//               <th>Slobodni klor</th>
//               <th> Redoks potencijal mV</th>

//               <th>Temp. vode</th>
//               <th>pH</th>
//               <th>Slobodni klor</th>
//               <th> Redoks potencijal mV</th>

//               <th>Temp. vode</th>
//               <th>pH</th>
//               <th>Slobodni klor</th>
//               <th> Redoks potencijal mV</th>

//               <th>Temp. vode</th>
//               <th>pH</th>
//               <th>Slobodni klor</th>
//               <th>Izvršilac</th>


//             </tr>
//           </thead>
//           <tbody>
//             ${this.rows
//               .map(
//                 (row) => `
//               <tr>
                
//                 <td>${row.DAN}</td>
//                 <td>${row.TEMP}</td>
//                 <td>${row.PH}</td>
//                 <td>${row.KLOR}td>
//                 <td>${row.REDOKS}td>

//               </tr>`
//               )
//               .join("")}
//           </tbody>
//         </table>
//       </div>
//     `;

//     this.shadowRoot.innerHTML = `
//       <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
//       ${tableHTML}
//     `;
//   }
// }

// customElements.define("dynamic-table", DynamicTable);
