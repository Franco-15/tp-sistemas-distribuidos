
//* creo que aca deberian ir todos los llamados a la api asi centralizo todo lo del back en algun lado 
//? deberia ser asi lo de arriba? 


// obtener el array de animales desde el back
export function getAnimals() {
    return fetch('http://localhost:3000/animals')
    //! USAR AXIOS
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al obtener los datos de los animales");
            }
            return response.json(); //? es necesario esto pq creo que ya viene en formato json?
        })
        .then(data => {
            // Mapea solo los datos relevantes (id, nombre, descripción)
            return data.map(animal => ({
                id: animal.id,
                nombre: animal.name,
                description: animal.description
            }));
        })
        .catch(error => {
            console.error("Error en la solicitud:", error);
            return [];
        });
}
