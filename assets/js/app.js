const personajes = []
const divPersonajes = document.querySelector("#tarjetasPersonajes");
const btnMostrar = document.querySelector("#btnMostrar");


const listarPersonajes = async () => {
    try {
        const response = await fetch('https://thesimpsonsapi.com/api/characters');
        const data = await response.json()
        personajes.push(...data.results)
        return data.results
    } catch (error) {
        console.log(error, 'Error al obtener los personajes');
        throw error;
    }
}
listarPersonajes()
const detallePersonaje = async (id) => {
    try {
        const res = await fetch(`https://thesimpsonsapi.com/api/characters/${id}`)
        const data = await res.json()
        return data
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
        <img src="${objeto.portrait_path}" class="card-img-top" alt="${objeto.nombre}">
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
    const personajesFiltrados = personajes.filter((personaje) => personaje.nombre.trim().toLowerCase().includes(nombre.toLowerCase()))
    mostrarPersonajes(personajesFiltrados)
}

btnMostrar.addEventListener("click", () => mostrarPersonajes(personajes));