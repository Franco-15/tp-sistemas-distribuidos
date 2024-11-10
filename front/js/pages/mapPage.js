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

    
    calculaPos().then(pos => {
        console.log(pos)
        var map = L.map('map').setView([-38.00413285734509,	-57.55136976361025], 18);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        var marker = L.marker([-38.00413285734509,-57.55136976361025]).addTo(map);
        marker.bindPopup("<b>Casa de Grego</b>").openPopup();
    })   
}


function calculaPos() { 
    return getChkPt().then(ptos => {

        const sumaLat = ptos.reduce((acc, pto) => acc + parseFloat(pto.lat), 0);
        const sumaLong = ptos.reduce((acc, pto) => acc + parseFloat(pto.long), 0);
        const promedioLat = sumaLat / ptos.length;
        const promedioLong = sumaLong / ptos.length;

        return [promedioLat, promedioLong];
    });
}

/*function addChkPt() { 
    getChkPt().then(ptos => {
        var marker = L.marker([-38.00413285734509,-57.55136976361025]).addTo(map);
    })
}*/
    



