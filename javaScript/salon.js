
let arraySalon = [];
let arrayButacasReservadas=[];
let salonSeleccionado="arrayButacas-"+document.getElementById("Salon").getAttribute("value");

inicializar(salonSeleccionado);

function inicializar(nombreSalon) {
    let objSalon;

    objSalon = new salon(nombreSalon, "PF", 24);
    arraySalon.push(objSalon);
    objSalon = new salon(nombreSalon, "PI", 16);
    arraySalon.push(objSalon);
    objSalon = new salon(nombreSalon, "PD", 16);
    arraySalon.push(objSalon);
    objSalon = new salon(nombreSalon, "PC", 144);
    arraySalon.push(objSalon);
    arraySalon.forEach(element => {
        for (let index = 1; index <= element.canitidadButacas; index++) {
            document.getElementById(`${element.nombreSeccion}${index}`).style.backgroundColor = 'white';
            //document.getElementById(`${element.nombreSeccion}${index}`).disabled = true;
        }
    });

    arrayButacasReservadas = JSON.parse(localStorage.getItem(salonSeleccionado));
    if(arrayButacasReservadas==null){
        arrayButacasReservadas =[];

    }
    else{
        for (const iterator of arrayButacasReservadas) {
            document.getElementById(iterator.id).style.backgroundColor = iterator.backgroundColor;
            document.getElementById(iterator.id).value = iterator.value;
            document.getElementById(iterator.id).innerText = iterator.innerText; 
            
        }
    }
    habilitarZona();

}

function habilitarZona() {
    let zona = document.getElementById("idSelect").value;
    //document.querySelectorAll("#zona,.butaca")
    //console.log(`#${zona} div .butaca`);
    setearZona(zona,false);
    dehabilitarZona();
}

function dehabilitarZona() {
    let zonaElegida = document.getElementById("idSelect").value;
    //elementoSelect = document.getElementById("idSelect").options;
    //elementoSelect.forEach(elementoseleccionado => {
    for (let index = 0; index < 4; index++) {
        let zona =document.getElementById("idSelect").options[index].value;
        if(zonaElegida != zona)
        {
            setearZona(zona,true);
        }
    }
}
function setearZona(zona,flag){
    let elemento = document.querySelectorAll(`#${zona} div .butaca`);
            for (let index = 0; index < elemento.length; index++) {
                document.getElementById(elemento[index].id).disabled = flag;
            }
}

function seleccionaButaca(element) {

    if (document.getElementById(element.id).style.backgroundColor == 'green') {
        document.getElementById(element.id).style.backgroundColor = 'white';
    }
    else if (document.getElementById(element.id).style.backgroundColor != 'grey') {
        document.getElementById(element.id).style.backgroundColor = 'green';
    }
    alerta("");
    //console.log(element.id);//
    //console.log(`el valor de values es: ${element.value}`);

}

function buscarLugares() {
    alerta("");
    let sector = document.getElementById("idSelect").value;
    let obj = arraySalon.find((element) => element.nombreSeccion == sector);
    let lugaresSolicitados = document.getElementById("cantidad").value;

    let lugarReservado = [];
    let cuentaEspacios = 0;
    let flagEncontro = false;
    for (let index = 1; index <= obj.canitidadButacas; index++) {
        //for (let index2 = index; index2 <= lugaresSolicitados; index2++) {
        inicializar();
        if (document.getElementById(`${obj.nombreSeccion}${index}`).style.backgroundColor == 'white') {
            lugarReservado.push(obj.nombreSeccion + index);
            cuentaEspacios++;
            //flagEncontro=true;
        }

        /*else if(document.getElementById(`${obj.nombreSeccion}${index2+obj.canitidadButacas}`).value != '1'){
            lugarReservado.push(obj.nombreSeccion+index2+obj.canitidadButacas);
            cuentaEspacios++;
        }
        else{
            lugarReservado=[];
            break;
        }*/


        //}
        if (cuentaEspacios == lugaresSolicitados) {
            break;
        }


    }
    if (cuentaEspacios == lugaresSolicitados) {
        pintarEspacio(lugarReservado);
        document.getElementById("botonBuscar").disabled = true;
    }
    else {
        alerta("no hay disponibilidad en el sector");
    }



}
function confirmarButacas() {
    alerta("");
    let sector = document.getElementById("idSelect").value;
    let obj = arraySalon.find((element) => element.nombreSeccion == sector);
    //for (const iterator of arraySalon) {
    //confirmarButacasSalon(iterator.nombreSeccion, iterator.canitidadButacas);
    //}
    confirmarButacasSalon(obj.nombreSeccion, obj.canitidadButacas);
}

function confirmarButacasSalon(seccion, cantidad) {
    let elementos = document.querySelectorAll(".butaca");
    let butacasSeleccionadas = 0;
    let lugaresSolicitados = document.getElementById("cantidad").value;
    for (const iterator of elementos) {
        let atributoValor = iterator.getAttribute("style");
        //console.log(atributoValor);
        if (atributoValor == "background-color: green;") {
            butacasSeleccionadas++;
        }
    }
    if (butacasSeleccionadas == lugaresSolicitados) {
        for (let index = 1; index <= cantidad; index++) {
            //const element = array[index];
            if (document.getElementById(`${seccion}${index}`).style.backgroundColor == 'green') {
                document.getElementById(`${seccion}${index}`).style.backgroundColor = 'grey';
                document.getElementById(`${seccion}${index}`).value = '1';
                document.getElementById(`${seccion}${index}`).innerText = "R";
                miButaca = new butacaReservada(`${seccion}${index}`,'grey','1','R');
                arrayButacasReservadas.push(miButaca);
            }
        }
        localStorage.setItem(salonSeleccionado,JSON.stringify(arrayButacasReservadas));
    }
    else if(butacasSeleccionadas < lugaresSolicitados) {
        alerta("Faltan seleccionar butacas...");
    }
    else{
        alerta("Seleccionó butacas de mas...");
    }


    document.getElementById("botonBuscar").disabled = false;
}

function pintarEspacio(lugarReservado) {
    lugarReservado.forEach(element => {
        document.getElementById(`${element}`).style.backgroundColor = 'green';
    });
}

function alerta(mensaje) {
   document.getElementById("notificciones").innerText=mensaje;
}