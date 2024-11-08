
import { getChkPt } from "./apiCheckpointHelper";


export function getLocFirst() { 
    const chkPts = getChkPt(); 
    return {...chkPts,animals:[]}
}


export function getLoc() { 


    const eventSource = new EventSource('http://localhost:3000/events');

    eventSource.onmessage = function(event) {
        const data = JSON.parse(event.data);
        //todo agregar al array
    };

    eventSource.onerror = function() {
        console.error('Error in connection, reconnecting...');
    };

}
    /*return axios.get('http://localhost:3000/api/position')
    .then(response => {

        const data = response.data.data; //obj .Json

        const chkPts = data.map(loc => ({
            id: loc.id,
            lat: loc.lat,
            long: loc.long,
            description: loc.description,
            animal: loc.animal
        }));

        return loc;
    })
    .catch(error => {
        console.error("Error en la solicitud:", error);
        return [];
    });


    
    const mockData = [
        { id: 'cee1f9bf-6e42-4071-859a-82d71e231cc1', lat: -38.00413285734509, long: -57.55136976361025 , description: "Casa grego", animal: [] },
        { id: '32c7e94b-2b08-4ff5-80e9-ecb0f7795425', lat: -38.-37.959956981123014, long: -57.54691270133813 , description: "Casa juli", animal: [] },
        { id: 'd5046589-a6be-4839-9454-f0ab184fa51a', lat: -37.995852166115476, long: -57.57091812136696, description: "Casa Manu" , animal: []},
        { id: '16bc808b-eb20-4aa9-8b3d-048fbf4c3025', lat: -38.021055327610185, long: -57.57736073202042, description: "Casa Fran", animal: [] }
    ];

    return new Promise(resolve => {
        setTimeout(() => resolve(mockData), 500); // Simula una espera de 500ms (no se pq es esto pero chatgpt)
    });*/

