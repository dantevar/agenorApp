async function fillObjDropdown() {
   const objSelection = document.getElementById("objectSelection");

   const placeholderOption = document.createElement("option");
   placeholderOption.textContent = "-- Odaberite objekt --";
   placeholderOption.disabled = true;
   placeholderOption.selected = true;
   objSelection.appendChild(placeholderOption);

   const objects = await fetchObjects();

   console.log(objects);
   objects.forEach(obj => {
      const option = document.createElement("option");
      option.value = obj.object_id;
      option.textContent = obj.name;
      objSelection.appendChild(option);
   });
}

async function fetchObjects() {
   const data = await fetch("http://localhost:3001/admin/object")
      .then(res => {
         return res.json();
      })
      .catch(err => console.error(err));
   return data;
}

async function addObject() {
   const form = document.getElementById("newObjectForm");
   let data = {};
   const formData = new FormData(form);
   formData.forEach((value, key) => {
      data[key] = value;
   });
   console.log(data);

   
   const res = await fetch(`http://localhost:3001/admin/newobject`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   });

   if (!res.ok) throw new Error("Network response was not ok");

   console.log("Fetched data:", data);
}

/////////////////

document.addEventListener("DOMContentLoaded", () => {
   fillObjDropdown();
   document
      .getElementById("newObjectButton")
      .addEventListener("click", addObject);
});
