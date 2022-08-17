
window.addEventListener('load', ()=>{

    let lon;
    let lat;

    let temperaturaValor = document.getElementById('temperaturaValor');
    let temperaturaDescripcion = document.getElementById('temperaturaDescripcion');
    
    let ubicacion = document.getElementById('temperaturaValor');
    let icono = document.getElementById('icono');

    
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(posicion => {
            lon = posicion.coords.longitude;
            lat = posicion.coords.latitude;

            const url = 'https://api.openweathermap.org/data/3.0/weather?lat=${lat}&lon=${lon}&appid={545248949c060fcc462871118becc18a}';

            fetch(url)
                .then(response => {return response.json()} )
                .then(data => {

                    let temp = Math.round(data.main.temp);
                    temperaturaValor.textContent = '${temp}°C';

                    let desc = data.weather[0].description;
                    temperaturaDescripcion.textContent = desc.toUpperCase();

                    ubicacion.textContent = data.name;

                    let iconCode = (data.weather[0].icon);
                    const urlIcon = 'http://openweathermap.org/img/wn/${iconCode}.png'

                })
                .catch(error =>{
                    console.log(error);
                })
        })
    }
})









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
        guardarStorage();
        textoTarea.value = "";
    }
});

let listadoTareas = [];

const guardarStorage = (tarea) => {

    if(tarea !== null){
        listadoTareas.push(textoTarea.value);
        let echoOporhacer = contenedorTareas.childNodes.forEach( el => {
            el.classList.contains("echo") ?  estado = "Echo": estado = "Por Hacer";
        })
        
        localStorage.setItem(listadoTareas,estado);
        
    }
};


const cambiarEstado = event => {
    event.target.classList.toggle("echo");
    guardarStorage();

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



