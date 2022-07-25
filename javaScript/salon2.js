const platea = {
    nombre: 'b',
    cantidad: 24
};
const pullIz = {
    nombre: 'PI',
    cantidad: 16
};

const pullDe = {
    nombre: 'PD',
    cantidad: 16
};

const pullCe = {
    nombre: 'PC',
    cantidad: 144
};


function butaca(element) {

    if (document.getElementById(element.id).style.backgroundColor == 'green') {
        document.getElementById(element.id).style.backgroundColor = 'white';
    }
    else if (document.getElementById(element.id).style.backgroundColor != 'grey') {
        document.getElementById(element.id).style.backgroundColor = 'green';
    }

    console.log(element.id);
    console.log(`el valor de values es: ${element.value}`);

}

function buscarLugares(nroButacas) {
    for (let index = 0; index < 12; index++) {
        const element = array[index];
        if (document.getElementById(`b${index}`).value != 0) {
            let flag = false;
            for (let index = 0; index < nroButacas; index++) {
                const element = array[index];

            }

        }
    }
}
function confirmarButacas() {

    confirmarButacasSalon(platea.nombre, platea.cantidad);
    confirmarButacasSalon(pullIz.nombre, pullIz.cantidad);
    confirmarButacasSalon(pullCe.nombre, pullCe.cantidad);
    confirmarButacasSalon(pullDe.nombre, pullDe.cantidad);


}

function confirmarButacasSalon(seccion, cantidad) {
    for (let index = 1; index <= cantidad; index++) {
        //const element = array[index];
        if (document.getElementById(`${seccion}${index}`).style.backgroundColor == 'green') {
            document.getElementById(`${seccion}${index}`).style.backgroundColor = 'grey';
            document.getElementById(`${seccion}${index}`).style.value = '1';
            document.getElementById(`${seccion}${index}`).innerText="R";
        }
    }
}