let botonBuscar = document.getElementById("botonBuscar");
botonBuscar.onclick=()=> buscarLugares();

let botonConfirmar = document.getElementById("botonConfirmar");
botonConfirmar.addEventListener("click",(e)=>{
  e.preventDefault;
  confirmarButacas();
})

let comboSelect = document.getElementById("idSelect");
comboSelect.onchange=()=>habilitarZona();

const botones = document.querySelectorAll('.butaca');
botones.forEach(boton => boton.addEventListener('click', ()=>seleccionaButaca(boton)));

let cerrarModal = document.querySelector(".modal__close");
cerrarModal.addEventListener('click',(e)=>{
  e.preventDefault;
  let modal = document.querySelector(".modal");  
  modal.classList.remove('modal--show');
  
})