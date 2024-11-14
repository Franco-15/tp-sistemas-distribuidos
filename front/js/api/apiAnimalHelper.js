

const port = 3000;
// obtener el array de animales desde el back
export function getAnimals() {

    return axios.get(`http://localhost:${port}/api/animals`,{
        headers: {
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
    return axios.get(`http://localhost:${port}/api/availableDevices`,{
        headers: {
            'Content-Type': 'application/json',
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
    const data = {
        id: id,
        name: name,
        description: description
    }
    console.log(data);
    axios.post(`http://localhost:${port}/api/animals`, JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((response) => {
        console.log(response.status, response.data);
    }).catch(error => {
        console.error("Error en la solicitud:", error);
        return [];
    });
}

export function PatchAnimal(id, name, description) {
    const data = {
        name: name,
        description: description
    }

    axios.patch(`http://localhost:${port}/api/animals/`+id, JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((response) => {
        console.log(response.status, response.data);
    }).catch(error => {
        console.error("Error en la solicitud:", error);
        return [];
    });   
}

export function DeleteAnimal(id) {
    axios.delete(`http://localhost:${port}/api/animals/`+id, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((response) => {
        console.log(response.status, response.data);
    }).catch(error => {
        console.error("Error en la solicitud:", error);
        return [];
    });

}
