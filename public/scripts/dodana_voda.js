
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
    if (table && data) {
      populateTableFromData(table, data);
    }
    
  });

function populateTableFromData(dynamicTableInstance, data) {

  dynamicTableInstance.columns = data.map(pool => ({
    pool_id: pool.pool_id,
    naziv: pool.pool_name,
    kapacitet: pool.pool_capacity,
    podaci: pool.dailyCapacities
  }));


  dynamicTableInstance.render();
}


document.getElementById('btnSave').addEventListener('click', async () => {
  const table = document.getElementById('dynamicTable');
  if (!table || !table.columns || table.columns.length === 0) {
    alert('Nema podataka za spremiti.');
    return;
  }

  const godina = document.getElementById('godina').value;
  const mjesec = document.getElementById('mjesec').value;

  const payload = [];

  table.columns.forEach(col => {
    col.podaci.forEach((val, dayIndex) => {
      if (val !== -1 && val !== '') {
        const datum = `${godina}-${String(mjesec).padStart(2, '0')}-${String(dayIndex + 1).padStart(2, '0')}`;
        payload.push({
          pool_id: col.pool_id, 
          date: datum,
          capacity: Number(val)
        });
      }
    });
  });


  const res = await fetch(`${window.location.origin}/api/water_additions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ additions: payload })
  });

  if (res.ok) {
    alert("Podaci uspješno spremljeni.");
  } else {
    const err = await res.text();
    console.error("Greška prilikom slanja:", err);
    alert("Greška pri spremanju podataka.");
  }
});



})();