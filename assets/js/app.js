const personajes = []
const divPersonajes = document.querySelector("#tarjetasPersonajes")
const modalPj = document.querySelector("#modalPersonaje")


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
        modalPj.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${data.name}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <img src="https://cdn.thesimpsonsapi.com/500${data.portrait_path}" class="card-img-top" alt="${data.name}">
                        <p><strong>Edad y Fecha de Nacimiento:</strong> ${data.age} años - Nacimiento: ${data.birthdate}</p>
                        <p><strong>Género:</strong> ${data.gender}</p>
                        <p><strong>Ocupación:</strong> ${data.occupation}</p>
                        <p><strong>Estado:</strong> ${data.status}</p>
                        <p><strong>Frase más célebre:</strong> ${data.phrases[0]}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>`
        // Mostrar el modal
        const modal = new bootstrap.Modal(modalPj)
        modal.show()
    } catch (error) {
        console.log(error, 'Error al obtener el detalle del personaje')
    }
}

const mostrarPersonajes = (array) => {
    divPersonajes.innerHTML = '' // Limpiar el div:row antes de mostrar los personajes. 
    // Esto evita que se dupliquen los personajes cada vez que se ejecuta la función.
    array.forEach((objeto) => {
        const col = document.createElement("div");
        col.classList.add("col-md-4", "mb-4", "mt-4");
        const card = document.createElement("div");
        card.classList.add("card", "h-100");
        card.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
        card.style.backgroundColor = "#03afffe1"
        card.style.color = "#ffffff"
        card.style.borderRadius = "7px";
        card.innerHTML = `
        <img src="https://cdn.thesimpsonsapi.com/500${objeto.portrait_path}" class="card-img-top" alt="${objeto.name}" style="border-radius: 7px 7px 0 0; box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);">
        <div class="card-body">
            <h5 class="card-title" style="background-color: #F4FF03; border-radius: 3px; font-weight: bold; color: #000000dc; font-family: Comic Sans MS; text-align: center">${objeto.name}</h5>
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
    } else {
        mostrarPersonajes(personajesFiltrados)
    }
}