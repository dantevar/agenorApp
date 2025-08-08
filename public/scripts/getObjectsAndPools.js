
async function fetchObjects(){
    const data =  await fetch("http://localhost:3001/objects")
        .then((res) => {
            return res.json()
        })
        .catch((err) => console.error(err));
    return data

}

async function fetchPoolsByObjectId(objId){
    const res = await fetch(`http://localhost:3001/pools?object_id=${objId}`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
      },
   });
    return res.json()
}

export {fetchObjects, fetchPoolsByObjectId}