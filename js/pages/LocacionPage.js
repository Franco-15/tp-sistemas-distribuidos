//todo: ver si no pasa a ser 'HomePage.js'

import { getLoc, PatchLoc, PostLoc , DeleteLoc} from "../api/apiLocacion.js";


export function loadLocacionPage() {
    console.log('entra') //!sacar
    
    renderLocArray().then(LocArray => {
        const app = document.getElementById('app');


        //todo ver como centrar los input del popup
        app.innerHTML = `
                <div class="animal-container">
                <h2 class="animal-title">Locaciones</h2>
                <table class="animal-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Lat</th>
                            <th>Long</th>
                            <th>Descripción</th>
                            <th>Animales</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${LocArray.map(loc => `
                            <tr>
                                <td>${loc.id}</td>
                                <td>${loc.lat}</td>
                                <td>${loc.long}</td>
                                <td>${loc.description}</td>
                                <td>
                                    <ul>
                                        ${(Array.isArray(loc.animal) ? loc.animal.map(animal => `
                                            <li>
                                                <strong>ID:</strong> ${animal.id}<br>
                                            
                                            </li>
                                        `).join('') : 'No hay animales asociados')}
                                    </ul>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
        
    });
}

export function renderLocArray() { //todo vendria siendo el get, cambiarlo
    // Llama a la función getLocs (es la q esta en api.js) y espera su resultado
    return getLoc().then(LocArray => { //devuelve promesa
        
        console.log("Array de checkpointss:", LocArray); // Muestra el array en la consola
        return LocArray
    });
}