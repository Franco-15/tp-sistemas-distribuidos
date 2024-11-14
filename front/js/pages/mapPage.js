

export function loadMapPage() {
    const app = document.getElementById('app');
    //startEventSource();

    app.innerHTML = `
    <div class="map-container">
        <div class="map" id="map"></div>
    </div>
    `;
}


