export function setupDynamicPage(config) {
  const base = window.location.origin;

  async function fetchObjects(selectId) {
    const res = await fetch(`${base}/api/objects`);
    const arr = await res.json();
    console.log('Dohvaćeni objekti:', arr);
    const sel = document.getElementById(selectId);
    sel.innerHTML = '<option value="" disabled selected>Odaberi objekt</option>';
    arr.forEach(o => {
      const opt = document.createElement('option');
      opt.value = o.object_id;
      opt.textContent = o.name;
      sel.append(opt);
    });
  }

  function populateTableFromData(dynamicTableInstance, data) {
    dynamicTableInstance.columns = data.map(pool => ({
      pool_id: pool.pool_id,
      naziv: pool.pool_name,
      kapacitet: pool.pool_capacity,
      podaci: pool.dailyCapacities
    }));
    dynamicTableInstance.render();
  }

  function setupPage({
    selectId,
    endpoint,
    payloadKey,
    dateFieldName,
    valueFieldName
  }) {
    document.addEventListener('DOMContentLoaded', () => {
      fetchObjects(selectId);
      const d = new Date();
      document.getElementById('godina').value = d.getFullYear();
      document.getElementById('mjesec').value = String(d.getMonth() + 1).padStart(2, '0');
    });

    document.getElementById('btnLoad').addEventListener('click', async () => {
      const objekt = document.getElementById(selectId).value;
      const godina = document.getElementById('godina').value;
      const mjesec = document.getElementById('mjesec').value;
      if (!objekt || !godina || !mjesec) {
        alert('Popuni objekt, godinu i mjesec.');
        return;
      }
      const res = await fetch(`${base}${endpoint}?objekt=${objekt}&godina=${godina}&mjesec=${mjesec}`);
      const data = await res.json();

      let table = document.getElementById('dynamicTable');
      if (table) table.remove();

      table = document.createElement('dynamic-table');
      table.id = 'dynamicTable';
      document.getElementById('tablice-wrapper').appendChild(table);

      console.log('Dohvaćeni podaci:', data);
      if (data) populateTableFromData(table, data);
    });

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
              [dateFieldName]: datum,
              [valueFieldName]: Number(val)
            });
          }
        });
      });

      const res = await fetch(`${base}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [payloadKey]: payload })
      });

      if (res.ok) {
        alert("Podaci uspješno spremljeni.");
      } else {
        const err = await res.text();
        console.error("Greška prilikom slanja:", err);
        alert("Greška pri spremanju podataka.");
      }
    });
  }

  setupPage(config);

  window.setupDynamicPage = setupPage;
}
