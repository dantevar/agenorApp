
(async () => {
  const base = window.location.origin;

  async function fetchObjekti() {
    const res = await fetch(`${base}/api/objects`);
    const arr = await res.json();
    const sel = document.getElementById('objekt-select');
    sel.innerHTML = '<option value="" disabled selected>Odaberi objekt</option>';
    arr.forEach(o => {
      const opt = document.createElement('option');
      opt.value = o; opt.textContent = o;
      sel.append(opt);
    });
  }
  document.addEventListener('DOMContentLoaded', () => {
    fetchObjekti();
    const d = new Date();
    document.getElementById('godina').value = d.getFullYear();
    document.getElementById('mjesec').value = String(d.getMonth() + 1).padStart(2, '0');
  });


  document.getElementById('btnLoad').addEventListener('click', async () => {
    const objekt = document.getElementById('objekt-select').value;
    const godina = document.getElementById('godina').value;
    const mjesec = document.getElementById('mjesec').value;
    if (!objekt || !godina || !mjesec) {
      alert('Popuni objekt, godinu i mjesec.');
      return;
    }
    const res = await fetch(`${base}/api/pool_table?objekt=${objekt}&godina=${godina}&mjesec=${mjesec}`);
    const data = await res.json();

    // Neka dynamic-table element postoji u DOM-u
    const table = document.querySelector("dynamic-table");
    console.log('Dohvaćeni podaci:', data);
    console.log('Dynamic table element:', table);
    if (table && data) {
      populateTableFromData(table, data);
    }
    
  });

  function populateTableFromData(dynamicTableInstance, data) {
  // Resetiraj stupce
  dynamicTableInstance.columns = [];

  // Za svaki bazen iz data.bazeni, dodaj stupac sa nazivom i kapacitetom, i podacima (31 vrijednost)
  data.bazeni.forEach((bazen) => {
    // Pretpostavimo da su podaci već niz od 31 elementa (ako ne, treba ih popuniti do 31)
    let podaci = bazen.dnevni_kapaciteti;
    if (!podaci || podaci.length !== 31) {
      podaci = Array(31).fill(0);
    }

    dynamicTableInstance.columns.push({
      naziv: bazen.pool_name,
      kapacitet: bazen.pool_capacity,
      podaci: podaci,
    });
  });


  dynamicTableInstance.render();
}



})();