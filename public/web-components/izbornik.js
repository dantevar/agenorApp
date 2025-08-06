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
        <li><a href="/menu/umj_mjeraca">UMJERAVANJE MJERAČA ZA RUČNO MJERENJE</a></li>
        <li><a href="/menu/god_ispiranje">GODIŠNJE ISPIRANJE PROTOČNOG SUSTAVA BAZENA</a></li>
        <li><a href="/menu/dodana_voda">DODANA VODA</a></li>
        <li><a href="/menu/broj_posjetitelja">BROJ POSJETITELJA</a></li>
        <li><a href="/menu/ukl_nedostataka">UKLANJANJE NEDOSTATAKA</a></li>
        <li><a href="/menu/rez_lab_analiza">REZULTATI LABORATORIJSKIH ANALIZA</a></li>
        <li><a href="/menu/ispir_filtera">IZMJERENI POKAZATELJI - SLATKA VODA</a></li>
        <li><a href="/menu/slatka_voda">IZMJERENI POKAZATELJI - MORSKA VODA</a></li>
        <li><a href="/menu/morska_voda">ISPIRANJE FILTARA BAZENSKIH KUPALIŠTA</a></li>
        <li><a href="/menu/hidromasazni_bazeni">IZMJERENI POKAZATELJI - HIDROMASAŽNI BAZENI</a></li>
        <li><a href="/menu/plan_ciscenja">PLAN ČIŠĆENJA, PRANJA I DEZINFEKCIJE BAZENSKOG PROSTORA</a></li>
        <li><a href="/menu/evidencija_ciscenja">EVIDENCIJA ČIŠĆENJA, PRANJA I DEZINFEKCIJE BAZENSKOG PROSTORA</a></li>
      </ul>
    `;
  }
}

customElements.define("nav-menu", NavMenu);

