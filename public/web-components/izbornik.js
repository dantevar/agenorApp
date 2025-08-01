class NavMenu extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        ul { list-style: none; padding: 0; }
        li a { text-decoration: none; color: inherit; }
      </style>
      <ul class="sidebar-nav">
        <h1>IZBORNIK</h1>
        <li><a href="../templates/01.html">UMJERAVANJE MJERAČA ZA RUČNO MJERENJE</a></li>
        <li><a href="../templates/02.html">GODIŠNJE ISPIRANJE PROTOČNOG SUSTAVA BAZENA</a></li>
        <li><a href="../templates/03.html">DODANA VODA</a></li>
        <li><a href="../templates/04.html">BROJ POSJETITELJA</a></li>
        <li><a href="../templates/05.html">UKLANJANJE NEDOSTATAKA</a></li>
        <li><a href="../templates/06.html">REZULTATI LABORATORIJSKIH ANALIZA</a></li>
        <li><a href="../templates/07.html">ISPIRANJE FILTERA BAZENSKIH KUPALIŠTA</a></li>
        <li><a href="../templates/08.html">IZMJERENI POKAZATELJI - SLATKA VODA</a></li>
        <li><a href="../templates/09.html">IZMJERENI POKAZATELJI - MORSKA VODA</a></li>
        <li><a href="../templates/10.html">ISPIRANJE FILTARA BAZENSKIH KUPALIŠTA</a></li>
        <li><a href="../templates/11.html">IZMJERENI POKAZATELJI - HIDROMASAŽNI BAZENI</a></li>
        <li><a href="../templates/13.html">PLAN ČIŠĆENJA, PRANJA I DEZINFEKCIJE BAZENSKOG PROSTORA</a></li>
        <li><a href="../templates/14.html">EVIDENCIJA ČIŠĆENJA, PRANJA I DEZINFEKCIJE BAZENSKOG PROSTORA</a></li>
      </ul>
    `;
  }
}

customElements.define("nav-menu", NavMenu);
