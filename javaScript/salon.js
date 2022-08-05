class salon {
    constructor(nombreSala, nombreSeccion, canitidadButacas) {
        this.nombreSala = nombreSala,
            this.nombreSeccion = nombreSeccion,
            this.canitidadButacas = canitidadButacas
    }
}
let arraySalon = [];

//console.log(document.getElementById("Salon").getAttribute("value"));
inicializar(document.getElementById("Salon").getAttribute("value"));

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

}

function botonButaca(element) {

    if (document.getElementById(element.id).style.backgroundColor == 'green') {
        document.getElementById(element.id).style.backgroundColor = 'white';
    }
    else if (document.getElementById(element.id).style.backgroundColor != 'grey') {
        document.getElementById(element.id).style.backgroundColor = 'green';
    }

    //console.log(element.id);//
    //console.log(`el valor de values es: ${element.value}`);

}

function buscarLugares(nroButacas, nombreSeccion) {
    
    
}
function confirmarButacas() {
    for (const iterator of arraySalon) {
        confirmarButacasSalon(iterator.nombreSeccion, iterator.canitidadButacas);
    }
}

function confirmarButacasSalon(seccion, cantidad) {
    for (let index = 1; index <= cantidad; index++) {
        //const element = array[index];
        if (document.getElementById(`${seccion}${index}`).style.backgroundColor == 'green') {
            document.getElementById(`${seccion}${index}`).style.backgroundColor = 'grey';
            document.getElementById(`${seccion}${index}`).value = '1';
            document.getElementById(`${seccion}${index}`).innerText = "R";
        }
    }
}