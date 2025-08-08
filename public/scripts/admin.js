async function fillObjDropdown() {
   const objSelection = document.getElementById("objectSelection");

   const placeholderOption = document.createElement("option");
   placeholderOption.textContent = "-- Odaberite objekt --";
   placeholderOption.disabled = true;
   placeholderOption.selected = true;
   objSelection.appendChild(placeholderOption);

   const objects = await fetchObjects();

   objects.forEach(obj => {
      const option = document.createElement("option");
      option.value = obj.object_id;
      option.textContent = obj.name;
      objSelection.appendChild(option);
   });
}

async function fetchObjects() {
   const data = await fetch("http://localhost:3001/objects")
      .then(res => {
         return res.json();
      })
      .catch(err => console.error(err));
   return data;
}

async function displayObjects() {
   const table = document.getElementById("objectsTable");
   const objects = await fetchObjects();
   table.setData(objects);
}

async function addObject() {
   const form = document.getElementById("newObjectForm");
   let data = {};
   const formData = new FormData(form);
   formData.forEach((value, key) => {
      data[key] = value;
   });

   const res = await fetch(`http://localhost:3001/admin/newobject`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   });

   if (!res.ok) throw new Error("Network response was not ok");


   document.getElementById("objectsTable").render();
}

async function addPool() {
   const form = document.getElementById("newPoolForm");
   let data = {};
   const formData = new FormData(form);
   formData.forEach((value, key) => {
      data[key] = value;
   });

   const res = await fetch(`http://localhost:3001/admin/newpool`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   });

   if (!res.ok) throw new Error("Network response was not ok");
   displayPoolsForObject()
}


async function displayPoolsForObject(){
 const objectSelect = document.getElementById('objectSelection');

  const selectedObjectId = objectSelect.value;
    if (!selectedObjectId) return;

    try {
      const response = await fetch(`http://localhost:3001/pools?object_id=${selectedObjectId}`);
      if (!response.ok) throw new Error('Failed to fetch pools');

      const pools = await response.json();
      renderPoolTable(pools);
    } catch (err) {
      console.error('Error loading pools:', err);
    }
}

function renderPoolTable(pools){
   const table = document.getElementById('poolsTable');
   table.setData(pools)
   
}

/////////////////

document.addEventListener("DOMContentLoaded", () => {
   fillObjDropdown();
   displayObjects();
   document
      .getElementById("newObjectButton")
      .addEventListener("click", addObject);

   document.getElementById("newPoolButton").addEventListener("click", addPool);


   document.getElementById("objectSelection").addEventListener("change", displayPoolsForObject);

   
});
