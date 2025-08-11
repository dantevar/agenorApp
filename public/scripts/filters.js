import { fetchObjects, fetchPoolsByObjectId } from "./getObjectsAndPools.js";

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
      option.textContent = obj.object_name;
      objSelection.appendChild(option);
   });

   objSelection.addEventListener("change", () => {
      const selectedObjectId = objSelection.value;
      const poolSelection = document.getElementById("poolSelection");
      fillFilterDropdown(selectedObjectId);
   });
}

async function fillFilterDropdown(selectedObjectId) {
   const filters = await fetchFiltersByObjectId(selectedObjectId);
   const filterSelection = document.getElementById("filterSelection");

   filterSelection.innerHTML = "";

   const placeholderOption = document.createElement("option");
   placeholderOption.textContent = "-- Odaberite filter --";
   placeholderOption.disabled = true;
   placeholderOption.selected = true;
   filterSelection.appendChild(placeholderOption);

   filters.forEach(p => {
      const option = document.createElement("option");
      option.value = p.filter_id;
      option.textContent = p.filter_name;
      filterSelection.appendChild(option);
   });
}

async function fetchFiltersByObjectId(objId) {
   try {

      const res = await fetch(
         `http://localhost:3001/filters/filters?object_id=${objId}`
      );
      const data = await res.json();
      return data;
   } catch (err) {
      console.error("Error fetching filters:", err);
      return null;
   }
}

async function displayData() {
   // id
   // id
   const obj = document.getElementById("objectSelection");
   const fil = document.getElementById("filterSelection");
   const objId = obj.options[obj.selectedIndex].value;
   const filId = fil.options[fil.selectedIndex].value;
   const objName = obj.options[obj.selectedIndex].textContent;
   const filName = fil.options[fil.selectedIndex].textContent;
   const date = document.getElementById("dateSelection").value
   

   // input check
   if (filId.startsWith("-") || filId == "" || date == null) return;
   
   try {
      console.log(date)
      const res = await fetch(
         `http://localhost:3001/filters/logs?filter_id=${encodeURIComponent(
            filId
         )}&date=${encodeURIComponent(date)}`
      );
      
      if (!res.ok) throw new Error("Network response was not ok");
      
      const data = await res.json();
      console.log(data)
      
      // no data
      const tabl = document.getElementById("filterTable");
      tabl.setData(data);
      
      if (data.length == 0) {


      } else {

         // document.getElementById("currentObject").textContent = obj.options[obj.selectedIndex].textContent
         // document.getElementById("currentObject").value = obj.options[obj.selectedIndex].value
         // document.getElementById("currentfil").textContent = fil.options[fil.selectedIndex].textContent
         // document.getElementById("currentfil").value =
      }

      // update current fil
      document.getElementById(
         "currentfil"
      ).textContent = `${filName} (${objName}) `;
      document.getElementById("currentfil").value =
         fil.options[fil.selectedIndex].value;
   } catch (error) {
      console.error("Fetch error:", error);
   }
}

async function addEntry() {
   if (
      !document.getElementById("currentfil").value
   ) {
      return;
   }

   const data = {};

   data["filter_id"] = document.getElementById("currentfil").value;

   const form = document.getElementById("filterLogForm");
   const formData = new FormData(form);
   formData.forEach((value, key) => {
      data[key] = value;
   });
   console.log(data)

   const res = await fetch(`http://localhost:3001/filters/log`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   });

   if (!res.ok) throw new Error("Network response was not ok");
   
   document.getElementById("filterTable").render()
}

/////////////////

document.addEventListener("DOMContentLoaded", () => {
   fillObjDropdown();
   document
      .getElementById("showButton")
      .addEventListener("click", displayData);

      document
      .getElementById("submitButton")
      .addEventListener("click", addEntry);


});
