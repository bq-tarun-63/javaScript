function increment(count){
    counter = 0;
    fixedValue=count;
    return ()=>{
        counter++;
        if(counter>fixedValue){
            console.log("can,t possi");
            document.getElementById("h3").innerText(counter);
            return counter;
        }
        else {
            return  console.log(counter);
        }
    }
}
let incre=increment(2);
incre();
incre();
incre();
incre();
incre();
incre();
incre();
incre();

let add=document.getElementById("add");
add.addEventListener("click",incre);
  
