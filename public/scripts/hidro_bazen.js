

async function fillObjDropdown(){
    const objSelection = document.getElementById("objectSelection")
    
    const placeholderOption = document.createElement("option");
    placeholderOption.textContent = "-- Odaberite objekt --";
    placeholderOption.disabled = true;
    placeholderOption.selected = true;
    objSelection.appendChild(placeholderOption);
    
    const objects = await fetchObjects()
    
    console.log(objects)
    objects.forEach((obj) => {
        const option = document.createElement("option");
        option.value = obj.object_id;
        option.textContent = obj.name;
        objSelection.appendChild(option)
    });
    
    
    objSelection.addEventListener("change", () => {
        const selectedObjectId = objSelection.value;        
        fillPoolDropdown(selectedObjectId)
        
    });  
    
}


async function fillPoolDropdown(selectedObjectId){
    const pools = await fetchPoolsByObjectId(selectedObjectId)
    console.log(pools)
    const poolSelection = document.getElementById("poolSelection")
    
    poolSelection.innerHTML = "";
    
    const placeholderOption = document.createElement("option");
    placeholderOption.textContent = "-- Odaberite bazen --";
    placeholderOption.disabled = true;
    placeholderOption.selected = true;
    poolSelection.appendChild(placeholderOption);

    pools.forEach(p =>{
        const option = document.createElement("option");
        option.value = p.pool_id;
        option.textContent = p.pool_name;
        poolSelection.appendChild(option)    
    })
}

async function fetchObjects(){
    const data =  await fetch("http://localhost:3001/pools/object")
        .then((res) => {
            return res.json()
        })
        .catch((err) => console.error(err));
    return data

}


async function fetchPoolsByObjectId(objId){
    const data = fetch(`http://localhost:3001/pools/spa_pools/${objId}`)
          .then((res) =>{
            return res.json()
          })
          .catch((err) => {
            console.error(err);
          });
    return data
}

document.addEventListener("DOMContentLoaded", () => {
    fillObjDropdown()
    // Postavi godinu na trenutnu
    const d = new Date()
    document.getElementById('godina').value = d.getFullYear();
    document.getElementById('mjesec').value = String(d.getMonth() + 1).padStart(2, '0');

    document.getElementById("submitButton").addEventListener("click",  () => {
        
        console.log("Kliknuto")
        //todo
    });
    //  document.getElementById("formButton").addEventListener("click", addLog)
    
})
