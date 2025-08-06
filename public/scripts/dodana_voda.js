
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

  dynamicTableInstance.columns = data.map(pool => ({
    naziv: pool.pool_name,
    kapacitet: pool.pool_capacity,
    podaci: pool.dailyCapacities
  }));

  console.log('Popunjavanje tablice s kolonama:', dynamicTableInstance.columns);

  dynamicTableInstance.render();
}





})();