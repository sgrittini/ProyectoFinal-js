let botonBuscar = document.getElementById("botonBuscar");
botonBuscar.onclick=()=> buscarLugares();

let botonConfirmar = document.getElementById("botonConfirmar");
botonConfirmar.onclick=()=>confirmarButacas();

let comboSelect = document.getElementById("idSelect");
comboSelect.onchange=()=>habilitarZona();

const botones = document.querySelectorAll('.butaca');
botones.forEach(boton => boton.addEventListener('click', ()=>seleccionaButaca(boton)));
/*
//declaramos la función que se ejecutará cuando ocurre el evento
function selectedButton(event) {
  //console.log(event);
  //console.log(this);
  seleccionaButaca(this);
}

//usamos el nombre de la función para asignarla a cada evento, reusándola
botones.forEach(boton => boton.addEventListener('click', selectedButton));
//botones.forEach(boton => boton.addEventListener('click', ()=>console.log(boton.id)));
*/