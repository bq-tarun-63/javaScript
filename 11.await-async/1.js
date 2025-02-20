
function api(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("weather data");
            resolve(200);
        },2000);
    });
}
async function getwheatherdata(){
    await api();
    // await api();
    // await api();
    // await api();
}
//getwheatherdata();
console.log("Sfa");