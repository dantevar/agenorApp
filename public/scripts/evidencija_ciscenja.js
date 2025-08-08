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
    const obj = document.getElementById("objectSelection")
    const pool = document.getElementById("poolSelection")
    const objId = obj.options[obj.selectedIndex].value
    const poolId = pool.options[pool.selectedIndex].value
    const objName = obj.options[obj.selectedIndex].textContent
    const poolName = pool.options[pool.selectedIndex].textContent

    // input check
    if (objName.startsWith("-") || poolName.startsWith("-") || objName == "" || poolName == "" || month == null)
        return

    try{
   
        const res = await fetch(`http://localhost:3001/cleaning/logs?pool=${encodeURIComponent(poolId)}&year=${encodeURIComponent(year)}&month=${encodeURIComponent(month)}`)

        if (!res.ok) throw new Error("Network response was not ok");
    

        const data = await res.json();
        console.log("Fetched data:", data);
        
        // no data
        if (data.length == 0){
            document.getElementById("info").textContent = "Nema podataka za odabrani mjesec"
            const tabl = document.getElementById("tablica")
            tabl.setData([])
        }
        else{
            // data formating
            let newData = []
            for (let elem of data){
                newData.push({
                    'day' : elem['cleaning_time'].substring(8,10),
                    'area' : elem['cleaned_area'],
                    'time' : elem['cleaning_time'].substring(11,16),
                    'cleaner' : elem['cleaner'],
                    'approved' : elem['approved'] == false ? "Ne" : "Da" ,
                })
            }

            const tabl = document.getElementById("tablica")
            tabl.setData(newData)
            
            document.getElementById("info").textContent = `Prikaz za mjesec: ${numToMonth(month)}`

        }

        // update za koji bazen se prikazuju podaci
        document.getElementById("currentPool").textContent = `${poolName} (${objName}) `
        document.getElementById("currentPool").value = poolId

    }
    catch (error) {
        console.error("Fetch error:", error);
    }

}


async function addLog(){

    // get form data
    const form = document.getElementById("cleaningInfoForm")
    let data = {}
    const formData = new FormData(form);
    formData.forEach((value, key) => {
      data[key] = value;
    });
    data['pool_id'] = document.getElementById("currentPool").value
    console.log(data)
    
    // error checking
    if (!data.time || !data.area || !data.date || !data.operator){
        document.getElementById("resInfo").textContent = "Neispravni podaci"
        return
        }
    if (!data.time.match(/^\d\d:\d\d$/)){
        document.getElementById("resInfo").textContent = "Neispravni podaci"

        return
    }

    //post data
    const res = await fetch(`http://localhost:3001/cleaning/addlog`,{
        method:"POST",
         headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    if (!res.ok){
        document.getElementById("resInfo").textContent = "Neispravni podaci"
        throw new Error("Network response was not ok");
    } 

    // uspjesno dodavanje !!
    document.getElementById("resInfo").textContent = "Uspjeh!"
    displayData()

    console.log("Fetched data:", data);

}

/////////////////

document.addEventListener("DOMContentLoaded", () => {
    fillObjDropdown()
    document.getElementById("submitButton").addEventListener("click", displayData)
    document.getElementById("formButton").addEventListener("click", addLog)
    console.log("A")
})


