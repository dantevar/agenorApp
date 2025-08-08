import { fetchObjects,fetchPoolsByObjectId } from "./getObjectsAndPools.js";


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

   objSelection.addEventListener("change", () => {
      const selectedObjectId = objSelection.value;
      const poolSelection = document.getElementById("poolSelection");
      fillPoolDropdown(selectedObjectId);
   });
}

async function fillPoolDropdown(selectedObjectId) {
   const pools = await fetchPoolsByObjectId(selectedObjectId);
   const poolSelection = document.getElementById("poolSelection");

   poolSelection.innerHTML = "";

   const placeholderOption = document.createElement("option");
   placeholderOption.textContent = "-- Odaberite bazen --";
   placeholderOption.disabled = true;
   placeholderOption.selected = true;
   poolSelection.appendChild(placeholderOption);

   pools.forEach(p => {
      const option = document.createElement("option");
      option.value = p.pool_id;
      option.textContent = p.pool_name;
      poolSelection.appendChild(option);
   });
}

async function displayData() {
   // id
   // id
   const obj = document.getElementById("objectSelection");
   const pool = document.getElementById("poolSelection");
   const objId = obj.options[obj.selectedIndex].value;
   const poolId = pool.options[pool.selectedIndex].value;
   const objName = obj.options[obj.selectedIndex].textContent;
   const poolName = pool.options[pool.selectedIndex].textContent;

   // input check
   if (poolId.startsWith("-") || poolId == "") return;

   try {
      const res = await fetch(
         `http://localhost:3001/cleaning/plan?pool=${encodeURIComponent(
            poolId
         )}`
      );

      if (!res.ok) throw new Error("Network response was not ok");

      const data = await res.json();

      // no data
      if (data.length == 0) {
         document.getElementById("info").textContent =
            "Nema podataka za odabrani bazen";
         const tabl = document.getElementById("tablica");
         tabl.setData([]);
      } else {
         // data formating
         // let newData = []
         // for (let elem of data){
         //     newData.push({
         //         'day' : elem['cleaning_time'].substring(8,10),
         //         'area' : elem['cleaned_area'],
         //         'time' : elem['cleaning_time'].substring(11,16),
         //         'cleaner' : elem['cleaner'],
         //         'approved' : elem['approved'] == false ? "Ne" : "Da" ,
         //     })
         // }

         const tabl = document.getElementById("tablica");
         tabl.setData(data);

         // document.getElementById("currentObject").textContent = obj.options[obj.selectedIndex].textContent
         // document.getElementById("currentObject").value = obj.options[obj.selectedIndex].value
         // document.getElementById("currentPool").textContent = pool.options[pool.selectedIndex].textContent
         // document.getElementById("currentPool").value =
      }

      // update current pool
      document.getElementById(
         "currentPool"
      ).textContent = `${poolName} (${objName}) `;
      document.getElementById("currentPool").value =
         pool.options[pool.selectedIndex].value;
   } catch (error) {
      console.error("Fetch error:", error);
   }
}

async function addEntry() {
   if (
      !document.getElementById("currentObject").value ||
      !document.getElementById("currentPool").value
   ) {
      return;
   }

   const data = {};

   data["pool_id"] = document.getElementById("currentPool").value;

   const form = document.getElementById("cleaningValuesForm");
   const formData = new FormData(form);
   formData.forEach((value, key) => {
      data[key] = value;
   });

   const res = await fetch(`http://localhost:3001/cleaning/setplan`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   });

   if (!res.ok) throw new Error("Network response was not ok");

}

/////////////////

document.addEventListener("DOMContentLoaded", () => {
   fillObjDropdown();
   document
      .getElementById("submitButton")
      .addEventListener("click", displayData);

   document.getElementById("formButton").addEventListener("click", addEntry);
});
