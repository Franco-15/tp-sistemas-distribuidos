

export function loadMapPage() {
    console.log('soy el mapa soy el mapa') //!sacar
    
    renderLocArray().then(LocArray => {
        const app = document.getElementById('app');

        app.innerHTML = `
                <div class="map-container">
                <h2 class="map-title">Mapa</h2>
                 <div id="map"></div>
            </div>
        `;
        
    });



    var map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

}

