
let arraySalon = [];
let arrayButacasReservadas = [];
let nombreSalon = document.getElementById("Salon").getAttribute("value");
let array_butacas_salon = "arrayButacas-" + nombreSalon;
let arrayPrecio = [];

FetchSalon()
    .then(response => recuperarLoyout(response));

FetchPrecios()
    .then(response => arrayPrecio = response);

//Carga por seccion la cantidad de butacas disponibles
function recuperarLoyout(data) {
    data.forEach((element) => {
        let objSalon = new salon(nombreSalon, element.nombreSeccion, element.canitidadButacas);
        arraySalon.push(objSalon);
    });
    inicializar();
}

function inicializar() {
    //Utilizamos la libreria Luxon para setaer la fecha en el footer
    document.getElementById("idFecha").innerText = DateTime.now().toFormat('MMMM dd, yyyy'); 
    if (!(document.querySelector(".divNotificaciones"))) {
        ocupacionSalon();
    }
    //Del array del layout del salon seteamos las butacas de cada sección
    arraySalon.forEach(element => {
        for (let index = 1; index <= element.canitidadButacas; index++) {
            document.getElementById(`${element.nombreSeccion}${index}`).style.backgroundColor = 'white';
        }
    });
    //Recuperamos las butacas reservadas del Local Storage
    arrayButacasReservadas = JSON.parse(localStorage.getItem(array_butacas_salon)) || [];
    marcarButacasReservadas(arrayButacasReservadas);
    
    habilitarZona();

}

function habilitarZona() {
    let zona = document.getElementById("idSelect").value;
    setearZona(zona, false);
    dehabilitarZona();
}
//deshabilita la zona para solo usar las butacas disponible de la seccion elegida
function dehabilitarZona() {
    let zonaElegida = document.getElementById("idSelect").value;
    for (let index = 0; index < 4; index++) {
        let zona = document.getElementById("idSelect").options[index].value;
        if (zonaElegida != zona) {
            setearZona(zona, true);
        }
    }
}
//Setea las butacas de una zona
function setearZona(zona, flag) {
    let elemento = document.querySelectorAll(`#${zona} div .butaca`);
    for (let index = 0; index < elemento.length; index++) {
        document.getElementById(elemento[index].id).disabled = flag;
    }
}
//selecciona una butaca
function seleccionaButaca(element) {

    if (document.getElementById(element.id).style.backgroundColor == 'green') {
        document.getElementById(element.id).style.backgroundColor = 'white';
    }
    else if (document.getElementById(element.id).style.backgroundColor != 'grey') {
        document.getElementById(element.id).style.backgroundColor = 'green';
    }


}
//Busca lugares en la zona elegida
function buscarLugares() {

    let sector = document.getElementById("idSelect").value;
    let obj = arraySalon.find((element) => element.nombreSeccion == sector);
    let lugaresSolicitados = document.getElementById("cantidad").value;

    let lugarReservado = [];
    let cuentaEspacios = 0;
    inicializar(array_butacas_salon);
    for (let index = 1; index <= obj.canitidadButacas; index++) {

        if (document.getElementById(`${obj.nombreSeccion}${index}`).style.backgroundColor == 'white') {
            lugarReservado.push(obj.nombreSeccion + index);
            cuentaEspacios++;
            if (cuentaEspacios == lugaresSolicitados) {
                break;
            }
        }
    }
    //Operador ternario
    cuentaEspacios == lugaresSolicitados ? pintarEspacio(lugarReservado) : alerta("no hay disponibilidad en el sector");

}
//Confirma las butacas reservadas
function confirmarButacas() {
    let sector = document.getElementById("idSelect").value;
    //operadpor find de array
    let obj = arraySalon.find((element) => element.nombreSeccion == sector);
    confirmarButacasSalon(obj.nombreSeccion, obj.canitidadButacas);
}

function confirmarButacasSalon(seccion, cantidad) {
    let elementos = document.querySelectorAll(".butaca");
    let butacasSeleccionadas = 0;
    let lugaresSolicitados = document.getElementById("cantidad").value;
    for (const iterator of elementos) {
        let atributoValor = iterator.getAttribute("style");
        if (atributoValor == "background-color: green;") {
            butacasSeleccionadas++;
        }
    }
    if (butacasSeleccionadas == lugaresSolicitados) {
        for (let index = 1; index <= cantidad; index++) {
            if (document.getElementById(`${seccion}${index}`).style.backgroundColor == 'green') {
                document.getElementById(`${seccion}${index}`).style.backgroundColor = 'grey';
                document.getElementById(`${seccion}${index}`).value = '1';
                document.getElementById(`${seccion}${index}`).innerText = "R";
                miButaca = new butacaReservada(`${seccion}${index}`, 'grey', '1', 'R');
                arrayButacasReservadas.push(miButaca);
            }
        }
        localStorage.setItem(array_butacas_salon, JSON.stringify(arrayButacasReservadas));
        Toastify({
            text: `Se reservaron ${lugaresSolicitados} butacas`,
            duration: 3500,
            newWindow: true,
            gravity: "bottom", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #997689, #1f1219)",
            },
            onClick: function(){} // Callback after click
          }).showToast();
        mostrarDetalleDeCompra(seccion, lugaresSolicitados);

    }
    else if (butacasSeleccionadas < lugaresSolicitados) {
        alerta("Faltan seleccionar butacas...");
    }
    else {
        alerta("Seleccionó butacas de mas...");
    }
    document.getElementById("botonBuscar").disabled = false;
}

function pintarEspacio(lugarReservado) {
    lugarReservado.forEach(element => {
        document.getElementById(`${element}`).style.backgroundColor = 'green';
    });
    document.getElementById("botonBuscar").disabled = true;
}
//Utilizamos la libreria SweetAlert
function alerta(mensaje) {
    Swal.fire({
        imageUrl: '../img/url.png',
        title: mensaje
    })
}

function marcarButacasReservadas(arrayButacasReservadas) {

    for (const iterator of arrayButacasReservadas) {
        //Spread de arrays
        let butacaReservada = { ...iterator };
        document.getElementById(butacaReservada.id).style.backgroundColor = butacaReservada.backgroundColor;
        document.getElementById(butacaReservada.id).value = butacaReservada.value;
        document.getElementById(butacaReservada.id).innerText = butacaReservada.innerText;

        //Destructuracion
        //let { id, value, backgroundColor, innerText } = iterator;
        //document.getElementById(id).style.backgroundColor = backgroundColor;
        //document.getElementById(id).value = value;
        //document.getElementById(id).innerText = innerText;

    }

}

function mostrarDetalleDeCompra(seccion, cantidad) {
    let modal = document.querySelector(".modal");
    modal.classList.add("modal--show");
    let importeEntrada = 0;
    const found = arrayPrecio.find(element => element.nombreSeccion == seccion);
    document.getElementById("modal__paragraphEntrada").innerText = "Cantidad entradas: " + cantidad;
    document.getElementById("modal__paragraphImporte").innerText = "Total a pagar: " + parseInt(found.precio) * cantidad + "$";

}

function ocupacionSalon(){
    let divNotificaciones = document.querySelector(".divNotificacionesContenedor")
    let arrayButacasSalon1 = JSON.parse(localStorage.getItem("arrayButacas-salon1")) || [];
    let arrayButacasSalon2 = JSON.parse(localStorage.getItem("arrayButacas-salon2")) || [];
    let arrayButacasSalon3 = JSON.parse(localStorage.getItem("arrayButacas-salon3")) || [];
    let arrayButacasSalon4 = JSON.parse(localStorage.getItem("arrayButacas-salon4")) || [];
    let arrayButacasSalon5 = JSON.parse(localStorage.getItem("arrayButacas-salon5")) || [];
    let arrayButacasSalon6 = JSON.parse(localStorage.getItem("arrayButacas-salon6")) || [];
    SolicitarCantidadDeButacas()
    .then((res) => {
        let arrayOcupacion = [];
        let objPorcentaje = new ocupacion("salon1", (arrayButacasSalon1.length == 0 ? 0 : (arrayButacasSalon1.length * 100) / res));
        arrayOcupacion.push(objPorcentaje);
        objPorcentaje = new ocupacion("salon2", (arrayButacasSalon2.length == 0 ? 0 : (arrayButacasSalon2.length * 100) / res));
        arrayOcupacion.push(objPorcentaje);
        objPorcentaje = new ocupacion("salon3", (arrayButacasSalon3.length == 0 ? 0 : (arrayButacasSalon3.length * 100) / res));
        arrayOcupacion.push(objPorcentaje);
        objPorcentaje = new ocupacion("salon4", (arrayButacasSalon4.length == 0 ? 0 : (arrayButacasSalon4.length * 100) / res));
        arrayOcupacion.push(objPorcentaje);
        objPorcentaje = new ocupacion("salon5", (arrayButacasSalon5.length == 0 ? 0 : (arrayButacasSalon5.length * 100) / res));
        arrayOcupacion.push(objPorcentaje);
        objPorcentaje = new ocupacion("salon6", (arrayButacasSalon6.length == 0 ? 0 : (arrayButacasSalon6.length * 100) / res));
        arrayOcupacion.push(objPorcentaje);
    
        arrayOcupacion.forEach(element => {
            if (element.nombreSala != nombreSalon) {
                let div = document.createElement("div")
                div.className = "divNotificaciones"
                let h = document.createElement("h5");
                h.innerHTML = `
                <h5>${formatNombreSala(element.nombreSala)}</h5>`;
                div.append(h);
                let h2 = document.createElement("h5");
                h2.innerHTML = `
                <h5>${element.porcentaje}%</h5>`;
                div.append(h2);
    
                divNotificaciones.append(div);
            }
        });
    })
    .catch((err) => {
        console.log(0);
    })
    /*.finally(() => {
        console.log("Fin del proceso")
    })*/


}

function formatNombreSala(nombreSalon) {
    //salon1
    return (nombreSalon.substring(0, 5) + " " + nombreSalon.substring(5, nombreSalon.length)).toUpperCase();
}