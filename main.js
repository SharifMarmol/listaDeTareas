
const contenedorTareas = document.querySelector("#contenedorTareas");

const añadirTareas = document.querySelector("#añadirTareas");

const ordenarTareas = document.querySelector("#ordenarTareas");

let textoTarea = document.querySelector("#textoTarea");

añadirTareas.addEventListener("click", (e)=>{
    e.preventDefault();
    
    if(textoTarea.value == ""){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se escribio ninguna tarea',
            timer: 2000,
            confirmButtonColor: '#DF7861'

          })
    }else {
        let tarea = document.createElement("div");
        tarea.classList.add("tarea","borde");
        tarea.addEventListener("click", cambiarEstado);
        tarea.textContent = textoTarea.value;
        contenedorTareas.prepend(tarea);
        textoTarea.value = "";
    }
});


const cambiarEstado = event => {
    event.target.classList.toggle("echo");

};

const ordenar = () => {
    const echo = [];
    const porHacer = [];

    contenedorTareas.childNodes.forEach( el => {
        el.classList.contains("echo") ? echo.push(el) : porHacer.push(el);
    })
    return [...porHacer, ...echo];
};

ordenarTareas.addEventListener("click", ()=> {
    ordenar().forEach(el => contenedorTareas.appendChild(el));
});



