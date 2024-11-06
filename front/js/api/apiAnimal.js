import { type } from "os";


// obtener el array de animales desde el back
export function getAnimals() {

    axios.get('http://localhost:3000/api/animals')
    .then(response => {
        console.log("llegue a la api papa") //!borra

        const data = response.data; //obj .Json

        //console.log(typeof(response)) //!borrar

        const animals = data.content.map(animal => ({
            id: animal.id,
            name: animal.name,
            description: animal.description
        }));

        console.log(animals) //!borrar
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
