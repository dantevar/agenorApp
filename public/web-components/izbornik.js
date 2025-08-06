class NavMenu extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        ul { list-style: none; padding: 0 }
        li a { text-decoration: none; color: inherit }
        li {font-family: Arial; display:flex; flex:column; justify-content:space-around}
        a {font-size:1.2em}

      </style>
      <ul class="sidebar-nav">
        <h1>IZBORNIK</h1>
    <li><a href="/menu/umj_mjeraca">Umjeravanje mjerača za ručno mjerenje</a></li>
    <li><a href="/menu/god_ispiranje">Godišnje ispiranje protočnog sustava bazena</a></li>
    <li><a href="/menu/dodana_voda">Dodana voda</a></li>
    <li><a href="/menu/broj_posjetitelja">Broj posjetitelja</a></li>
    <li><a href="/menu/ukl_nedostataka">Uklanjanje nedostataka</a></li>
    <li><a href="/menu/rez_lab_analiza">Rezultati laboratorijskih analiza</a></li>
    <li><a href="/menu/ispir_filtera">Izmjereni pokazatelji - slatka voda</a></li>
    <li><a href="/menu/slatka_voda">Izmjereni pokazatelji - morska voda</a></li>
    <li><a href="/menu/morska_voda">Ispiranje filtara bazenskih kupališta</a></li>
    <li><a href="/menu/hidromasazni_bazeni">Izmjereni pokazatelji - hidromasažni bazeni</a></li>
    <li><a href="/menu/plan_ciscenja">Plan čišćenja, pranja i dezinfekcije bazenskog prostora</a></li>
    <li><a href="/menu/evidencija_ciscenja">Evidencija čišćenja, pranja i dezinfekcije bazenskog prostora</a></li>

      </ul>
    `;
  }
}

customElements.define("nav-menu", NavMenu);

