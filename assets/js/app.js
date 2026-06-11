const personajes = []
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