//arrayButacas-salon1
let arrayButacasSalon1 = JSON.parse(localStorage.getItem("arrayButacas-salon1")) || [];
let arrayButacasSalon2 = JSON.parse(localStorage.getItem("arrayButacas-salon2")) || [];
let arrayButacasSalon3 = JSON.parse(localStorage.getItem("arrayButacas-salon3")) || [];
let arrayButacasSalon4 = JSON.parse(localStorage.getItem("arrayButacas-salon4")) || [];
let arrayButacasSalon5 = JSON.parse(localStorage.getItem("arrayButacas-salon5")) || [];
let arrayButacasSalon6 = JSON.parse(localStorage.getItem("arrayButacas-salon6")) || [];
let cantidadButacas = 0;

FetchSalon()
    .then(response => recalcularEspacios(response));

function recalcularEspacios(data) {
    data.forEach((element) => {
        cantidadButacas = cantidadButacas + element.canitidadButacas;
    });

    arrayButacasSalon1.length == 0 ? document.getElementById("pSalon1").innerText = "0%" : document.getElementById("pSalon1").innerText = (arrayButacasSalon1.length * 100) / cantidadButacas + "%";
    arrayButacasSalon2.length == 0 ? document.getElementById("pSalon2").innerText = "0%" : document.getElementById("pSalon2").innerText = (arrayButacasSalon2.length * 100) / cantidadButacas + "%";
    arrayButacasSalon3.length == 0 ? document.getElementById("pSalon3").innerText = "0%" : document.getElementById("pSalon3").innerText = (arrayButacasSalon3.length * 100) / cantidadButacas + "%";
    arrayButacasSalon4.length == 0 ? document.getElementById("pSalon4").innerText = "0%" : document.getElementById("pSalon4").innerText = (arrayButacasSalon4.length * 100) / cantidadButacas + "%";
    arrayButacasSalon5.length == 0 ? document.getElementById("pSalon5").innerText = "0%" : document.getElementById("pSalon5").innerText = (arrayButacasSalon5.length * 100) / cantidadButacas + "%";
    arrayButacasSalon6.length == 0 ? document.getElementById("pSalon6").innerText = "0%" : document.getElementById("pSalon6").innerText = (arrayButacasSalon6.length * 100) / cantidadButacas + "%";
}