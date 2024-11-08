export function loadMapPage() {
    console.log('soy el mapa soy el mapa') //!sacar
    
    renderLocArray().then(LocArray => {
        const app = document.getElementById('app');


        //todo ver como centrar los input del popup
        app.innerHTML = `
                <div class="map-container">
                <h2 class="map-title">Mapa</h2>
                <map> </map>
            </div>
        `;
        
    });
}