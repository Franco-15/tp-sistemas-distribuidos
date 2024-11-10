//todo: ver si no pasa a ser 'HomePage.js'
import { getChkPt } from "../api/apiCheckpointHelper.js";

export async function  loadLocacionPage() {
    // Ejecutar funciones al cargar la página
    getInitialLocationData();
    startEventSource();
    const app = document.getElementById('app');

    //todo ver como centrar los input del popup
    app.innerHTML = `
            <div class="animal-container">
            <h2 class="animal-title">Locaciones</h2>
            <table class="animal-table">
                <thead>
                    <tr>
                        <th>Checkpoint ID</th>
                        <th>Lat</th>
                        <th>Long</th>
                        <th>Descripción</th>
                        <th>Animales</th>
                    </tr>
                </thead>
                <tbody id="positionsBody">
                </tbody>
            </table>
        </div>
    `;
    
}

function renderRow(data) {
    const positionsTableBody = document.getElementById('positionsBody');
    const row = document.createElement('tr');
    row.setAttribute('data-id', data.id);

    row.innerHTML = `
        <td>${data.id}</td>
        <td>${data.lat}</td>
        <td>${data.long}</td>
        <td>${data.description}</td>
        <td id="animals-${data.id}">${data.animals.join(', ') || 'No data'}</td>
    `;
    positionsTableBody.appendChild(row);
}

// Obtener datos iniciales
async function getInitialLocationData() {
    try {
        const checkpointsLoc = await getChkPt();
        const locationData = checkpointsLoc.map(loc => ({
            ...loc,
            animals: [],
        }));

        locationData.forEach(renderRow);
    } catch (error) {
        console.error("Error fetching positions:", error);
    }
}


// Escuchar actualizaciones de SSE
function startEventSource() {
    const eventSource = new EventSource('http://localhost:3000/api/animals/position');

    eventSource.onmessage = function(event) {
        const checkpointPositionData = JSON.parse(JSON.parse(event.data));
        const animalsCell = document.getElementById(`animals-${checkpointPositionData.id}`);
        if (animalsCell) {
            let animalsChain;
            checkpointPositionData.animals.forEach(animal => {
                if (animalsChain) {
                    animalsChain += `, ${animal.name}`;
                } else {
                    animalsChain = animal.name;
                }
            });
            animalsCell.textContent =animalsChain
        } else {
            console.log(`No row found for ID ${checkpointPositionData.id}`);
        }
    };

    eventSource.onerror = function(error) {
        console.error("Error in SSE connection:", error);
        eventSource.close();
    };
}