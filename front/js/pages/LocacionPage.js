//todo: ver si no pasa a ser 'HomePage.js'
export function  loadLocacionPage() {
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