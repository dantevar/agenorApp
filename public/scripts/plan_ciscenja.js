import { numToMonth } from "./numToMonth.js";


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



async function displayData(){

    // id
    const pool = document.getElementById("poolSelection").value

    // input check
    if (pool.startsWith("-") || pool == "" )
        return

    try{
   
        const res = await fetch(`http://localhost:3001/cleaning/plan?pool=${encodeURIComponent(pool)}`)

        if (!res.ok) throw new Error("Network response was not ok");
    

        const data = await res.json();
        console.log("Fetched data:", data);
        
        // no data
        if (data.length == 0){
            document.getElementById("info").textContent = "Nema podataka za odabrani bazen"
            const tabl = document.getElementById("tablica")
            tabl.setData([])
        }
        else{
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

            const tabl = document.getElementById("tablica")
            tabl.setData(data)
            
            document.getElementById("info").textContent = `Prikaz za mjesec: ${numToMonth(month)}`


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


