

// obtener el array de animales desde el back
export function getAnimals() {

    return axios.get('http://localhost:3000/api/animals')
    .then(response => {
        console.log("llegue a la api papa") //!borra

        const data = response.data.data; //obj .Json

        console.log(data) //!borrar

        const animals = data.map(animal => ({
            id: animal.id,
            name: animal.name,
            description: animal.description
        }));

        console.log(typeof(animals)) //!borrar
        return animals;
    })
    .catch(error => {
        console.error("Error en la solicitud:", error);
        return [];
    });

}

export function PostAnimal(id, name, description) {
    // axios.post('')
    const data = {
        id: id,
        name: name,
        description: description
    }
    console.log('data antes de mandar:', data);
    axios.post('http://localhost:3000/api/animals', JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((response) => {
        console.log(response.status, response.data);
    }).catch(error => {
        console.error(error);
    });
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
