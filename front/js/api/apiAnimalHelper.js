

// obtener el array de animales desde el back
export function getAnimals() {

    return axios.get('http://localhost:3000/api/animals',{
        headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
    })
    .then(response => {

        const data = response.data.data; //obj .Json

        const animals = data.map(animal => ({
            id: animal.id,
            name: animal.name,
            description: animal.description
        }));

        return animals;
    })
    .catch(error => {
        console.error("Error en la solicitud:", error);
        return [];
    });

}

export function getNewAnimals() {

    return axios.get('http://localhost:3000/api/availableDevices',{
        headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
    })
    .then(response => {

        const data = response.data.devices; //obj .Json
        
        return data;
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

    axios.post('http://localhost:3000/api/animals', JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
             authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
    })
    .then((response) => {
        console.log(response.status, response.data);
    }).catch(error => {
        console.error(error);
    });

}

export function PatchAnimal(id, name, description) {
    
    const data = {
        name: name,
        description: description
    }

    axios.patch('http://localhost:3000/api/animals/'+id, JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
    })
    .then((response) => {
        console.log(response.status, response.data);
    }).catch(error => {
        console.error(error);
    });   
}
export function DeleteAnimal(id) {


    axios.delete('http://localhost:3000/api/animals/'+id, {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
    })
    .then((response) => {
        console.log(response.status, response.data);
    }).catch(error => {
        console.error(error);
    });

}
