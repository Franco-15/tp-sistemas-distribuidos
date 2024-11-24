import { getChkPt } from "../api/apiCheckpointHelper.js";


export function loadLocacionPage() {
    getInfoChkpt().then(PosArray => {
        const app = document.getElementById('app');

        app.innerHTML = `
            <div class="animal-container">
                <h2 class="animal-title">Locaciones</h2>
                <table class="animal-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Latitud</th>
                            <th>Longitud</th>
                            <th>Descripción</th>
                            <th>Animales</th>
                        </tr>
                    </thead>
                    <tbody id="positionsBody">
                        ${PosArray.map(item => `
                            <tr>
                                <td>${item.id}</td>
                                <td>${item.lat}</td>
                                <td>${item.long}</td>
                                <td>${item.description}</td>
                                <td class="animals-column" data-id="${item.id}">No data</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    });
}

export function getInfoChkpt() { 
    return getChkPt()
        .then(PosArray => PosArray)
        .catch(error => {
            console.error("Error en la solicitud:", error);
            return [];
        });
}
