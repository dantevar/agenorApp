
async function fetchObjects(){
    const data =  await fetch("http://localhost:3001/objects")
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

export {fetchObjects, fetchPoolsByObjectId}