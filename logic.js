let url= "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/"
let dropdowns = document.querySelectorAll(".dropdown select");
let getButton = document.querySelector("#getButton");
let displayMsg = document.querySelector(".msg p");


for(let select of dropdowns){
    for(let currCode in countryList){
        let option = document.createElement("option");
        option.innerText = currCode;
        option.value = currCode;
        select.append(option);

        if(select.name==="from" && currCode==="USD"){
            option.selected = "selected";
        } else if(select.name==="to" && currCode==="INR"){
            option.selected = "selected";
        }
    }
    select.addEventListener("change", (evt) =>{
        updateFlag(evt.target);
    });
}

function updateFlag(element){
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let newImg = element.parentElement.querySelector("img")
    newImg.src = newSrc;
}

async function getExchangeRate(){
    let amountBox = document.querySelector("#amount");
    if(amount="" || amount<1){
        amountBox.value = "1";
    }
    let fromCurr = document.querySelector("#from-currency");
    let toCurr = document.querySelector("#to-currency");

    let response = await fetch(url+`${fromCurr.value.toLowerCase()}.json`);
    let data = await response.json();

    let exchangeRate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmount = amountBox.value*exchangeRate;

    displayMsg.innerHTML = `${amountBox.value} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

getButton.addEventListener("click",(evt)=>{
    evt.preventDefault();
    getExchangeRate();
})

window.addEventListener("load",()=>{
    getExchangeRate();
})