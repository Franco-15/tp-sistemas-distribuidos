

// obtener el array de animales desde el back
export function getAnimals() {

    /*
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
    */
    

    axios.get('http://localhost:3000/animals')
    .then(response => {
        
        const data = response.data; //obj .Json
        
        const animals = data.map(animal => ({
            id: animal.id,
            nombre: animal.name,
            description: animal.description
        }));

        return animals;
    })
    .catch(error => {
        console.error("Error en la solicitud:", error);
        return [];
    });

 
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
