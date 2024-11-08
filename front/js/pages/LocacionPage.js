//todo: ver si no pasa a ser 'HomePage.js'

import { getLoc, getLocFirst} from "../api/apiLocacionHelper.js";



export function loadLocacionPage(flag) {
    console.log('entra') //!sacar
    
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
                    ${renderItem(flag)}
                </tbody>
            </table>
        </div>
    `;
    
}

export function renderLocArray() { //todo vendria siendo el get, cambiarlo
    // Llama a la función getLocs (es la q esta en api.js) y espera su resultado
    return getLoc().then(LocArray => { //devuelve promesa
        
        console.log("Array de checkpointss:", LocArray); // Muestra el array en la consola
        return LocArray

    });
}

export function renderTable(flag) {
    let locations;
    if (flag = '#/location') { 
        locations = getLocFirst(); //retorna array con loc 
    } else {
        locations = getLoc();
    }
    return locations.map(loc => `
        <tr>
            <td>${loc.id}</td>
            <td>${loc.lat}</td>
            <td>${loc.long}</td>
            <td>${loc.description}</td>
            <td>
                <ul>
                    ${[(Array.isArray(loc.animal) ? animal.map(animal => `
                        <li>
                            <strong>Nombre:</strong> ${animal.name}<br>
                        </li>
                    `).join('') : 'No hay animales asociados')]}
                </ul>
            </td>
        </tr>
    `).join('')
}