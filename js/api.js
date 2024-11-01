//import axios from 'axios';
//* creo que aca deberian ir todos los llamados a la api asi centralizo todo lo del back en algun lado 
//? deberia ser asi lo de arriba? 


// obtener el array de animales desde el back
export function getAnimals() {

    //! funcion solo de testeo, borrar despues
    // Datos simulados de animales
    const mockData = [
        { id: '11:5e:e7:84:c4:f6', nombre: "Grego", description: "Vaca" },
        { id: '7c:0a:3f:83:db:93', nombre: "Alan", description: "Goat" },
        { id: 'c2:5a:3d:ae:10:28', nombre: "Tomi", description: "Gallina" }
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

export function PostAnimal(id, nombre, description) {
    // axios.post('')
    //todo: enviar aca los datos del animal para el post y usar el res para determinar si llego bien o no
    //todo en el caso que llegue bien, disparar el get
}

export function PatchAnimal(id, nombre, description) {
    // axios.post('') en la ruta tiene que ir el id
    //todo: enviar aca los datos del animal para el post y usar el res para determinar si llego bien o no
    //todo en el caso que llegue bien, disparar el get
}

export function DeleteAnimal(id) {
    // axios.post('') en la ruta tiene que ir el id
    //todo: enviar aca los datos del animal para el post y usar el res para determinar si llego bien o no
    
    //todo en el caso que llegue bien, disparar el get
}

export function getPtosControl() { 
    const mockData = [
        { id: 'cee1f9bf-6e42-4071-859a-82d71e231cc1', nombre: "pto 1", description: "agua" },
        { id: '32c7e94b-2b08-4ff5-80e9-ecb0f7795425', nombre: "pto 2", description: "comida" },
        { id: 'd5046589-a6be-4839-9454-f0ab184fa51a', nombre: "pto 3", description: "lugar de fornicado" },
        { id: '16bc808b-eb20-4aa9-8b3d-048fbf4c3025', nombre: "pto 4", description: "matadero" }
    ];

    // Retorna los datos simulados como una promesa
    return new Promise(resolve => {
        setTimeout(() => resolve(mockData), 500); // Simula una espera de 500ms (no se pq es esto pero chatgpt)
    });
}


