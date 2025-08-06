


async function fillObjDropdown(){
    const objSelection = document.getElementById("objektSelection")
    
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
        const poolSelection = document.getElementById("poolSelection")
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
    const data = fetch(`http://localhost:3001/pools/pools/${objId}`)
          .then((res) =>{
            return res.json()
          })
          .catch((err) => {
            console.error(err);
          });
    return data
}


function getDate(){
    const dateValue = document.selectedObjectId("dateSelection").value

}

function displayData(){
    console.log("kjfdsjkfdsjk")

}

/////////////////

document.addEventListener("DOMContentLoaded", () => {
    fillObjDropdown()
    document.getElementById("submitButton").addEventListener("click", displayData)
    console.log("A")
})


