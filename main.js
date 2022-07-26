const contenedorTareas = document.querySelector("#contenedorTareas");

const añadirTareas = document.querySelector("#añadirTareas");

const ordenarTareas = document.querySelector("#ordenarTareas");


añadirTareas.addEventListener("click", (e)=>{
    event.preventDefault();
    const textoTarea = document.querySelector("#textoTarea");
    if(textoTarea.value == ""){
        alert("no se escribio ninguna tarea");
    }else {
        const tarea = document.createElement("div");
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