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
}