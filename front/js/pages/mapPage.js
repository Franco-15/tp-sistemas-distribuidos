//import { getChkPt } from "../api/apiCheckpointHelper";
import {getChkPt} from "../api/apiCheckpointHelper.js";
import { getLoc } from "../api/apiLocationHelper.js";


export function loadMapPage() {
    console.log('soy el mapa soy el mapa') //!sacar
    
    const app = document.getElementById('app');

    app.innerHTML = `
            <div class="map-container">
             <div class="map" id="map"></div>
            </div>
    `;


    const locAll = getLoc(); 
    const posChkPt = locAll.map(item => [item.lat, item.long]); 
    const posAnimales = locAll.map(item => item.animals); 

    const posMap = calculaPos(posChkPt);

    var map = L.map('map').setView(posMap, 18); //todo: cambiar

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {

        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    var marker = L.marker([-38.00413285734509,-57.55136976361025]).addTo(map);
    marker.bindPopup("<b>Casa de Grego</b>").openPopup();
       

    var animalIcon = L.icon({
        iconUrl: 'leaf-green.png',
        shadowUrl: 'leaf-shadow.png',

        iconSize:     [38, 95], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
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

    return [(suma.lat / posChkPt.length),(suma.long / posChkPt.length)];
}

/*function addChkPt() { 
    getChkPt().then(ptos => {
        var marker = L.marker([-38.00413285734509,-57.55136976361025]).addTo(map);
    })
}*/
    



