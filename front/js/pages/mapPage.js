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
    const posChkPt = locAll.map(item => [item.lat, item.long, item.description]); 
    const posAnimales = locAll.map(item => [item.lat, item.long, item.animals]); 

    const posMap = calculaPos(posChkPt);

    var map = L.map('map').setView(posMap, 16);
    var animalIcon = L.icon({
        iconUrl: 'css/items/cow-icon.png',

        iconSize:     [38, 38], // size of the icon
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });


    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        
    }).addTo(map);

    posChkPt.forEach(([lat,long, description])=> { 
        console.log(description);
        var marker = L.marker([lat,long]).addTo(map); 
        marker.bindPopup(description).openPopup();   
    })
    
    //console.log(posAnimales);

    posAnimales.forEach(([lat, long, animal]) => animal.forEach(()=> {
        const posAnimal = [lat + rnd(), long + rnd()];
        L.marker(posAnimal, {icon: animalIcon}).addTo(map);
        //marker.bindPopup(animal.description).openPopup(); 
    }))
    
}


function calculaPos(posChkPt) { 
    let sumaLat = 0;
    let sumaLng = 0;

    posChkPt.forEach(([lat, lng]) => {
        sumaLat += lat;
        sumaLng += lng;
    });

    const cantidad = posChkPt.length;
    const puntoMedio = [
        sumaLat / cantidad,
        sumaLng / cantidad
    ];

    return puntoMedio;
}

/*function addChkPt() { 
    getChkPt().then(ptos => {
        var marker = L.marker([-38.00413285734509,-57.55136976361025]).addTo(map);
    })
}*/
    

function rnd() {
    const rango = 0.0005;
    const min = -rango;
    const max = rango;
    return Math.random() * (max - min) + min;
  }



