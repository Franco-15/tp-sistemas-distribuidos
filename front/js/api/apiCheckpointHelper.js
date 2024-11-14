import {refresh} from './apiLoginHelper.js'

const port = 3000;

export function getChkPt() { 
    return axios.get(`http://localhost:${port}/api/checkpoints`,{
        headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
    })   .then(response => {
        const data = response.data.data; //obj .Json
        const chkPts = data.map(chkPt => ({
            id: chkPt.id,
            lat: chkPt.lat,
            long: chkPt.long,
            description: chkPt.description
        }));
        return chkPts;
    })
    .catch(error => {
        if(error.status == 403){
            refresh();
        }else{
            console.error("Error en la solicitud:", error);
            return [];
        }
    });
}


export function PostChkPt(id, lat, long, description) { 
    const data = {
        id: id,
        lat: lat,
        long: long,
        description: description,
    }

    axios.post(`http://localhost:${port}/api/checkpoints`, JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
    })
    .then((response) => {
        console.log(response.status, response.data);
    }).catch(error => {
        if(error.status == 403){
            refresh();
        }else{
            console.error("Error en la solicitud:", error);
            return [];
        }
    });
}

export function PatchChkPt(id, lat, long, description) { 
    const data = {
        lat: lat,
        long: long,
        description: description,
    }

    axios.patch(`http://localhost:${port}/api/checkpoints/`+id, JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
    })
    .then((response) => {
        console.log(response.status, response.data);
    }).catch(error => {
        if(error.status == 403){
            refresh();
        }else{
            console.error("Error en la solicitud:", error);
            return [];
        }
    });  

}

export function DeleteChkPt(id) { 
    axios.delete(`http://localhost:${port}/api/checkpoints/`+id, {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
    })
    .then((response) => {
        console.log(response.status, response.data);
    }).catch(error => {
        if(error.status == 403){
            refresh();
        }else{
            console.error("Error en la solicitud:", error);
            return [];
        }
    });
}