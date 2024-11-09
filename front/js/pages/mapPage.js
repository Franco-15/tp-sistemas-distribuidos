//import { getChkPt } from "../api/apiCheckpointHelper";



export function loadMapPage() {
    console.log('soy el mapa soy el mapa') //!sacar
    
    const app = document.getElementById('app');


    app.innerHTML = `
            <div class="map-container">
            <h2 class="map-title">Mapa</h2>
             <div class="map" id="map"></div>
        </div>
    `;



    var map = L.map('map').setView(calculaPos(), 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    

}


function calculaPos() { 
    const ptos = getChkPt(); 

    // promedio de lat
    const promedioLat = ptos.reduce((acc, item) => acc + item.lat, 0) / ptos.length;

    // promedio de long
    const promedioLong = ptos.reduce((acc, item) => acc + item.long, 0) / ptos.length;

    return [promedioLat, promedioLong];

}

