//import { getChkPt } from "../api/apiCheckpointHelper";
import {getChkPt} from "../api/apiCheckpointHelper.js";


export function loadMapPage() {
    console.log('soy el mapa soy el mapa') //!sacar
    
    const app = document.getElementById('app');


    app.innerHTML = `
            <div class="map-container">
            <h2 class="map-title">Mapa</h2>
             <div class="map" id="map"></div>
        </div>
    `;

    const locAll = getLoc(); 
    const posChkPt = locAll.map(item => [item.lat, item.long]); 
    const posAnimales = locAll.map(item => item.animals); 


    calculaPos(posChkPt).then(posMap => {
        console.log(posMap)
        var map = L.map('map').setView(posMap, 18); //todo: cambiar
        
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        var marker = L.marker([-38.00413285734509,-57.55136976361025]).addTo(map);
        marker.bindPopup("<b>Casa de Grego</b>").openPopup();
    })   
}


function calculaPos(posChkPt) { 
    const suma = posChkPt.reduce(
        (acum, coord) => {
            acum.lat += coord[0];
            acum.long += coord[1];
            return acum; 
        },
        {lat: 0, long: 0}
    ); 

    return [(suma.lat / posChkPt.lenght),(suma.long / posChkPt.lenght)];
}

/*function addChkPt() { 
    getChkPt().then(ptos => {
        var marker = L.marker([-38.00413285734509,-57.55136976361025]).addTo(map);
    })
}*/
    



