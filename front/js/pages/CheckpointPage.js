//todo: ver si no pasa a ser 'HomePage.js'

import { getChkPt, PatchChkPt, PostChkPt , DeleteChkPt} from "../api/apiCheckpoint.js";


export function loadCheckpointPage() {
    console.log('entra') //!sacar
    
    renderChkPtArray().then(chkPtArray => {
        const app = document.getElementById('app');


        //todo ver como centrar los input del popup
        app.innerHTML = `
                        
            <div class="animal-container">
                <h2 class="animal-title">Lista de CheckPoints</h2>
                <table class="animal-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Lat</th>
                            <th>Long</th>
                            <th>Descripcion</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${chkPtArray.map(chkPt => `
                            <tr>
                                <td>${chkPt.id}</td>
                                <td>${chkPt.lat}</td>
                                <td>${chkPt.long}</td>
                                <td>${chkPt.description}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <div class="button-container">
                    <button id="addChkPtButton" class="styled-button">Agregar CheckPoint</button>
                    <button id="editChkPtButton" class="styled-button">Editar CheckPoint</button>
                    <button id="deleteChkPtButton" class="styled-button">Eliminar CheckPoint</button>
                </div>
            </div>


            <!--popup para agregar-->
            <div id="popupAddForm" style="display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                background-color: white; padding: 20px; border: 1px solid #ccc; z-index: 1000;">
                <h3>Agregar Nuevo CheckPoint</h3>
                <form id="ChkPtAddForm">
                    <label for="ChkPtAddId">ID:</label> 
                    <input type="text" id="ChkPtAddId" name="Id" required><br><br>
                    <label for="ChkPtAddlat">lat</label>
                    <input type="text" id="ChkPtAddlat" name="Lat" required><br><br>
                    <label for="ChkPtAddlong">long</label>
                    <input type="text" id="ChkPtAddlong" name="Long" required><br><br>
                    <label for="ChkPtAddDescription">Descripción:</label>
                    <input type="text" id="ChkPtAddDescription" name="description" required><br><br>
                    <button type="submit" id = "submitAdd">Guardar</button>
                    <button type="button" id="closeButton">Cerrar</button>
                </form>
            </div>
            
            <!--popup para editar-->
            <div id="popupEditForm" style="display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                background-color: white; padding: 20px; border: 1px solid #ccc; z-index: 1000;">
                <h3>Editar ChkPt</h3>
                <form id="ChkPtEditForm">
                    <label for="ChkPtEditId">ID:</label> 
                    <select id="ChkPtSelectEdit">
                        <option value="">-- Selecciona un ChkPt --</option>
                        ${chkPtArray.map(chkPt => `
                            <option value="${chkPt.id}">${chkPt.id}</option>
                        `).join('')}
                    </select><br><br>
                    
                    <label for="ChkPtEditlat">lat</label>
                    <input type="text" id="ChkPtEditlat" name="Lat" required ><br><br>
                    <label for="ChkPtEditlong">long</label>
                    <input type="text" id="ChkPtEditlong" name="Long" required><br><br>
                    <label for="ChkPtEditDescription">Descripción:</label>
                    <input type="text" id="ChkPtEditDescription" name="description" required><br><br>
                    <button type="submit" id = "submitEdit">Guardar</button>
                    <button type="button" id="closeEditButton">Cerrar</button>
                </form>
            </div>

            <!--popup para eliminar-->
            <div id="popupDeleteForm" style="display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                background-color: white; padding: 20px; border: 1px solid #ccc; z-index: 1000;">
                <h3>Eliminar ChkPt</h3>
                <form id="ChkPtDeleteForm">
                    <label for="ChkPtDeleteId">ID:</label> 
                    <select id="ChkPtSelectDelete">
                        <option value="">-- Selecciona un ChkPt --</option>
                        ${chkPtArray.map(chkPt => `
                            <option value="${chkPt.id}">${chkPt.id}</option>
                        `).join('')}
                    </select><br><br>
                    
                    <label for="ChkPtDeletelat">lat</label>
                    <input type="text" id="ChkPtDeletelat" name="Lat" required readonly><br><br>
                    <label for="ChkPtDeletelonng">long</label>
                    <input type="text" id="ChkPtDeletelong" name="Long" required readonly><br><br>
                    <label for="ChkPtDeleteDescription">Descripción:</label>
                    <input type="text" id="ChkPtDeleteDescription" name="description" required readonly><br><br>
                    <button type="submit" id = "submitDelete">Guardar</button>
                    <button type="button" id="closeDeleteButton">Cerrar</button>
                </form>
            </div>


            <!--esto es para hacer el fondo mas oscuro-->
            <div id="popupOverlay" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
                background-color: rgba(0, 0, 0, 0.5); z-index: 999;"></div>
        `;
        
        // eventos
        const addChkPtButton = document.getElementById('addChkPtButton');
        const editChkPtButton = document.getElementById('editChkPtButton');
        const deleteChkPtButton = document.getElementById('deleteChkPtButton');
        const popupAddForm = document.getElementById('popupAddForm');
        const popupEditForm = document.getElementById('popupEditForm');
        const popupOverlay = document.getElementById('popupOverlay');
        const closeButton = document.getElementById('closeButton');
                    

        
        // popup para agregar
        addChkPtButton.addEventListener('click', () => {
            popupAddForm.style.display = 'block';
            popupOverlay.style.display = 'block';
        });
    

        // popup para editar
        editChkPtButton.addEventListener('click', () => {
            popupEditForm.style.display = 'block';
            popupOverlay.style.display = 'block';
        });

         // popup para eliminar
         deleteChkPtButton.addEventListener('click', () => {
            popupDeleteForm.style.display = 'block';
            popupOverlay.style.display = 'block';
        });

        //esto rellena los valores para el editado
        ChkPtSelectEdit.addEventListener('change', () => {
            const selectedChkPtId = ChkPtSelectEdit.value;
            console.log(selectedChkPtId)
            if (selectedChkPtId) {
                const selectedChkPt = chkPtArray.find(chkPt => chkPt.id.toString() === selectedChkPtId);
                if (selectedChkPt) {
                    console.log(selectedChkPt)
                    ChkPtEditlat.value = selectedChkPt.lat;
                    ChkPtEditlong.value = selectedChkPt.long;
                    ChkPtEditDescription.value = selectedChkPt.description;
                    
                }
                else {
                    console.log('no encontre')
                }
            } else {
                ChkPtName.value = '';
                ChkPtDescription.value = '';
            }
        });

        //esto rellena los valores para borrar el ChkPt
        ChkPtSelectDelete.addEventListener('change', () => {
            const selectedChkPtId = ChkPtSelectDelete.value;
            console.log(selectedChkPtId)
            if (selectedChkPtId) {
                const selectedChkPt = chkPtArray.find(chkPt  => chkPt .id.toString() === selectedChkPtId);
                if (selectedChkPt) {
                    console.log(selectedChkPt)
                    ChkPtDeletelat.value = selectedChkPt.lat;
                    ChkPtDeletelong.value = selectedChkPt.long;
                    ChkPtDeleteDescription.value = selectedChkPt.description;
                    
                }
                else {
                    console.log('no encontre')
                }
            } else {
                ChkPtName.value = '';
                ChkPtDescription.value = '';
            }
        });

        // cierra pop-up cuando se hace click en el boton de cerrar o en el fondo
        closeButton.addEventListener('click', () => {
            popupAddForm.style.display = 'none';
            popupOverlay.style.display = 'none';
        });

        closeEditButton.addEventListener('click', () => {
            popupEditForm.style.display = 'none';
            popupOverlay.style.display = 'none';
        });
        
        closeDeleteButton.addEventListener('click', () => {
            popupDeleteForm.style.display = 'none';
            popupOverlay.style.display = 'none';
        });

        popupOverlay.addEventListener('click', () => {
            popupAddForm.style.display = 'none';
            popupEditForm.style.display = 'none';
            popupDeleteForm.style.display = 'none';
            popupOverlay.style.display = 'none';
        });

    //manejo de los datos al apretar submit del formulario agregar (pegaria a la API)
    ChkPtAddForm.addEventListener('submit', (event) => {
        event.preventDefault(); // evita que se recarge la pagina
        
        const id = ChkPtAddId.value;
        const lat = ChkPtAddlat.value;
        const long = ChkPtAddlong.value;
        const description = ChkPtAddDescription.value;

        console.log("Datos del nuevo ChkPt:", {id, lat, long, description }); //para comprobar //!borrar

        PostChkPt(id, lat, long, description);

        popupAddForm.style.display = 'none';
        popupOverlay.style.display = 'none';
    });

    //manejo de los datos al apretar submit del formulario editar (pegaria a la API)
    ChkPtEditForm.addEventListener('submit', (event) => {
        event.preventDefault(); // evita que se recarge la pagina
        
        const id = ChkPtSelectEdit.value;
        const lat = ChkPtEditlat.value;
        const long = ChkPtEditlong.value;
        const description = ChkPtEditDescription.value;

        console.log("ChkPt editado:", {id, lat, long, description }); //para comprobar //!borrar

        PatchChkPt(id, lat, long, description);

        popupEditForm.style.display = 'none';
        popupOverlay.style.display = 'none';
    });

    //manejo de los datos al apretar submit del formulario delete (pegaria a la API)
    ChkPtDeleteForm.addEventListener('submit', (event) => {
        event.preventDefault(); // evita que se recarge la pagina
        
        const id = ChkPtSelectDelete.value;
        const lat = ChkPtDeletelat.value;
        const long = ChkPtDeletelong.value;
        const description = ChkPtDeleteDescription.value;

        console.log("ChkPt a eliminar:", {id, lat, long, description }); //para comprobar //!borrar

        DeleteChkPt(id);

        popupDeleteForm.style.display = 'none';
        popupOverlay.style.display = 'none';
    });

    });
}

export function renderChkPtArray() { //todo vendria siendo el get, cambiarlo
    // Llama a la función getChkPts (es la q esta en api.js) y espera su resultado
    return getChkPt().then(chkPtArray => { //devuelve promesa
        
        console.log("Array de checkpointss:", chkPtArray); // Muestra el array en la consola
        return chkPtArray
    });
}