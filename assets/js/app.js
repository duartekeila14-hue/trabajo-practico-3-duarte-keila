const personajes = []
const divPersonajes = document.querySelector("#tarjetasPersonajes")


const listarPersonajes = async () => {
    // Esta funcion trae los personajes desde la API y los guarda en el array personajes para que se pueda utilizar
    try {
        const response = await fetch('https://thesimpsonsapi.com/api/characters');
        const data = await response.json()
        await personajes.push(...data.results)
    } catch (error) {
        console.log(error, 'Error al obtener los personajes');
        throw error;
    }
}

// Inicializar la página renderizando los cards cuando carga
(async () => {
    await listarPersonajes()
    mostrarPersonajes(personajes)
})()

const detallePersonaje = async (id) => {
    try {
        const res = await fetch(`https://thesimpsonsapi.com/api/characters/${id}`)
        const data = await res.json()
    } catch (error) {
        console.log(error, 'Error al obtener el detalle del personaje')
    }
}

const mostrarPersonajes = (array) => {
    divPersonajes.innerHTML = '' // Limpiar el div:row antes de mostrar los personajes. 
    // Esto evita que se dupliquen los personajes cada vez que se ejecuta la función.
     array.forEach((objeto) => {
        const col = document.createElement("div");
        col.classList.add("col-md-4", "mb-4");
        const card = document.createElement("div");
        card.classList.add("card", "h-100");
        card.innerHTML = `
        <img src="https://cdn.thesimpsonsapi.com/500${objeto.portrait_path}" class="card-img-top" alt="${objeto.name}">
        <div class="card-body">
            <h5 class="card-title">${objeto.name}</h5>
            <p class="card-text">Ocupación: ${objeto.occupation}</p>
            <p class="card-text">Estado: ${objeto.status}</p>
            <button class="btn btn-primary btn-sm" onclick="detallePersonaje(${objeto.id})">
            Detalles
            </button>
        </div>
        `
        col.appendChild(card)
        divPersonajes.appendChild(col)
    })
}

const filtrarPersonaje = (nombre) => {
    // filtra el array personajes por el nombre ingresado en el input y muestra los personajes filtrados
    // si no encuentra ningun personaje con ese nombre, muestra un mensaje indicando que no se encontró
    const personajesFiltrados = personajes.filter((personaje) => personaje.name.trim().toLowerCase().includes(nombre.toLowerCase()))
    if (personajesFiltrados.length === 0) {
        divPersonajes.innerHTML = `<p class="text-center">No se encontraron personajes con el nombre "${nombre}".</p>`
    }else{
        mostrarPersonajes(personajesFiltrados)
    }
}