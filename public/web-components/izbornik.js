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
          <li><a href="../templates/01_umj_mjeraca.html">Umjeravanje mjerača za ručno mjerenje</a></li>
          <li><a href="../templates/02_god_ispiranje.html">Godišnje ispiranje protočnog sustava bazena</a></li>
          <li><a href="../templates/03_dodana_voda.html">Dodana voda</a></li>
          <li><a href="../templates/04_broj_posjetitelja.html">Broj posjetitelja</a></li>
          <li><a href="../templates/05_ukl_nedostataka.html">Uklanjanje nedostataka</a></li>
          <li><a href="../templates/06_rez_lab_analiza.html">Rezultati laboratorijskih analiza</a></li>
          <li><a href="../templates/08_slatka_voda.html">Izmjereni pokazatelji - slatka voda</a></li>
          <li><a href="../templates/09_morska_voda.html">Izmjereni pokazatelji - morska voda</a></li>
          <li><a href="../templates/07_ispir_filtera.html">Ispiranje filtara bazenskih kupališta</a></li>
          <li><a href="../templates/10_hidromasazni_bazeni.html">Izmjereni pokazatelji - hidromasažni bazeni</a></li>
          <li><a href="../templates/placeholder.html">Plan čišćenja, pranja i dezinfekcije bazenskog prostora</a></li>
          <li><a href="../templates/12_evidencija_ciscenja.html">Evidencija čišćenja, pranja i dezinfekcije bazenskog prostora</a></li>

      </ul>
    `;
  }
}

customElements.define("nav-menu", NavMenu);
