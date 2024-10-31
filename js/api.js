
//* creo que aca deberian ir todos los llamados a la api asi centralizo todo lo del back en algun lado 
//? deberia ser asi lo de arriba? 


// obtener el array de animales desde el back
export function getAnimals() {

    //! funcion solo de testeo, borrar despues
    // Datos simulados de animales
    const mockData = [
        { id: 1, nombre: "Animal 1", description: "Descripción del Animal 1" },
        { id: 2, nombre: "Animal 2", description: "Descripción del Animal 2" },
        { id: 3, nombre: "Animal 3", description: "Descripción del Animal 3" }
    ];

    // Retorna los datos simulados como una promesa
    return new Promise(resolve => {
        setTimeout(() => resolve(mockData), 500); // Simula una espera de 500ms (no se pq es esto pero chatgpt)
    });


    
    /*
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
        */
}

export function getPtosControl() { 
    const mockData = [
        { id: 1, nombre: "pto 1", description: "agua" },
        { id: 2, nombre: "pto 2", description: "comida" },
        { id: 3, nombre: "pto 3", description: "lugar de fornicado" }
    ];

    // Retorna los datos simulados como una promesa
    return new Promise(resolve => {
        setTimeout(() => resolve(mockData), 500); // Simula una espera de 500ms (no se pq es esto pero chatgpt)
    });
}