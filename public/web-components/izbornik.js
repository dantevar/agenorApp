class NavMenu extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        ul { list-style: none; padding: 0; }
        li a { text-decoration: none; color: inherit; }
      </style>
      <ul class="sidebar-nav">
        <h1>IZBORNIK</h1>
        <li><a href="../templates/01_umj_mjeraca.html">UMJERAVANJE MJERAČA ZA RUČNO MJERENJE</a></li>
        <li><a href="../templates/02_god_ispiranje.html">GODIŠNJE ISPIRANJE PROTOČNOG SUSTAVA BAZENA</a></li>
        <li><a href="../templates/03_dodana_voda.html">DODANA VODA</a></li>
        <li><a href="../templates/04_broj_posjetitelja.html">BROJ POSJETITELJA</a></li>
        <li><a href="../templates/05_ukl_nedostataka.html">UKLANJANJE NEDOSTATAKA</a></li>
        <li><a href="../templates/06_rez_lab_analiza.html">REZULTATI LABORATORIJSKIH ANALIZA</a></li>
        <li><a href="../templates/07_ispir_filtera.html">IZMJERENI POKAZATELJI - SLATKA VODA</a></li>
        <li><a href="../templates/08_slatka_voda.html">IZMJERENI POKAZATELJI - MORSKA VODA</a></li>
        <li><a href="../templates/09_morska_voda.html">ISPIRANJE FILTARA BAZENSKIH KUPALIŠTA</a></li>
        <li><a href="../templates/10_hidromasazni_bazeni.html">IZMJERENI POKAZATELJI - HIDROMASAŽNI BAZENI</a></li>
        <li><a href="../templates/11_plan_ciscenja.html">PLAN ČIŠĆENJA, PRANJA I DEZINFEKCIJE BAZENSKOG PROSTORA</a></li>
        <li><a href="../templates/12_evidencija_ciscenja.html">EVIDENCIJA ČIŠĆENJA, PRANJA I DEZINFEKCIJE BAZENSKOG PROSTORA</a></li>
      </ul>
    `;
  }
}

customElements.define("nav-menu", NavMenu);
