export function startEventSource() {
  const eventSource = new EventSource('http://localhost:3000/api/animals/position');

  eventSource.onmessage = function (event) {
    const checkpointPositionData = JSON.parse(JSON.parse(event.data));
    if (window.location.hash === '#/locacion') {
      renderLocationPage(checkpointPositionData);
    }
    if (window.location.hash === '#/map') {
      renderMapPage(checkpointPositionData);
    };

    eventSource.onerror = function (error) {
      console.error("Error in SSE connection:", error);
      eventSource.close();
    };
  }
}

function renderLocationPage(data) {
  const positionsTableBody = document.getElementById('positionsBody');

  // Limpiar las filas existentes
  positionsTableBody.innerHTML = '';

  // Renderizar los nuevos datos
  data.forEach((item) => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.lat}</td>
        <td>${item.long}</td>
        <td>${item.description}</td>
        <td>${item.animals?.map(animal => animal.name).join(',\n') || 'No data'}</td>
    `;
    positionsTableBody.appendChild(row);
  });
}

var map;
var initial = true;
var animalIcon;

function mapToRender(posChkPt){
    const posMap = calculaPos(posChkPt);

    // Inicializamos el nuevo mapa
    map = L.map('map').setView(posMap, 16);
    animalIcon = L.icon({
      iconUrl: 'css/items/cow-icon.png',
      iconSize: [38, 38], // size of the icon
      iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
      popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
  
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  
    }).addTo(map);
}

let markers = []; // Array global para almacenar los marcadores

export function renderMapPage(data) {
  // Eliminar todos los marcadores previos
  markers.forEach(marker => map.removeLayer(marker));
  markers = []; // Vaciar el array de marcadores

  const locAll = data;
  const posChkPt = locAll.map(item => [item.lat, item.long, item.description]);
  const posAnimales = locAll.map(item => [item.lat, item.long, item.animals]);

  if (initial) {
    mapToRender(posChkPt);
    initial = false;
  }

  posChkPt.forEach(([lat, long, description]) => {
    var marker = L.marker([lat, long]).addTo(map);
    marker.bindPopup(description).openPopup();
    markers.push(marker); // Agregar el marcador al array
  });

  posAnimales.forEach(([lat, long, animal]) =>
    animal.forEach((a) => {
      const posAnimal = [lat + rnd(), long + rnd()];
      var marker = L.marker(posAnimal, { icon: animalIcon }).addTo(map);
      marker.bindPopup(a.name).openPopup();
      markers.push(marker); // Agregar el marcador al array
    })
  );
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

function rnd() {
  const rango = 0.0005;
  const min = -rango;
  const max = rango;
  return Math.random() * (max - min) + min;
}
