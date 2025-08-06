


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
    const dateValue = document.getElementById("dateSelection").value
    if (!dateValue) return [null, null, null];
    const day =  dateValue.substring(8)
    const month =  dateValue.substring(5,7)
    const year = dateValue.substring(0,4)

    return [parseInt(day, 10), parseInt(month, 10), parseInt(year)]
    // const year = dateValue[]

}

async function displayData(){
    const dateInfo = getDate()
    const year = dateInfo[2]
    const month = dateInfo[1]
    // const day= dateInfo[0]

    // id
    const obj = document.getElementById("objectSelection").value
    const pool = document.getElementById("poolSelection").value

    // input check
    if (obj.startsWith("-") || pool.startsWith("-") || obj == "" || pool == "")
        return

    try{
   
        const res = await fetch(`http://localhost:3001/cleaning?pool=${encodeURIComponent(pool)}&year=${encodeURIComponent(year)}&month=${encodeURIComponent(month)}`)

        if (!res.ok) throw new Error("Network response was not ok");
    

        const data = await res.json();
        console.log("Fetched data:", data);
        
        // no data
        if (data.length == 0){
            document.getElementById("info").textContent = "Nema podataka za odabrani mjesec"
        }
        else{
            const tabl = document.getElementById("tablica")
            for (elem of data.array){
                tabl.addRow({
                    'day' : elem['time'].substring(8,10),
                    'area' : elem['cleaned_area'],
                    'time' : elem['time'].substring(11,18),
                    'cleaner' : elem['cleaner'],
                })
            }
            document.getElementById("info").textContent = `Prikaz za objekt: ${objName}, bazen: ${poolName}, godina: ${year}, mjesec: ${month}`


        }

    }
    catch (error) {
        console.error("Fetch error:", error);
    }



}

/////////////////

document.addEventListener("DOMContentLoaded", () => {
    fillObjDropdown()
    document.getElementById("submitButton").addEventListener("click", displayData)
    console.log("A")
})


