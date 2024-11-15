import { getChkPt, PatchChkPt, PostChkPt , DeleteChkPt} from "../api/apiCheckpointHelper.js";


export function loadCheckpointPage() {

    renderChkPtArray().then(chkPtArray => {

        const app = document.getElementById('app');
        //todo ver como centrar los input del popup
        app.innerHTML = `
            <div class="animal-container">
                <h2 class="animal-title">Lista de puntos de control</h2>
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
            <div id="popupAddForm" class = "pop_up">
                <h3>Agregar Nuevo CheckPoint</h3>
                <form id="ChkPtAddForm">
                    <label for="ChkPtAddId">ID:</label>
                        <input type="text" id="ChkPtAddId" name="Id" required><br><br>
                    <label for="ChkPtAddlat">lat</label>
                        <input type="text" id="ChkPtAddlat" name="Lat" required><br><br>
                    <label for="ChkPtAddlong">long</label>
                        <input type="text" id="ChkPtAddlong" name="Long" required><br><br>
                    <label for="ChkPtAddDescription">Descripcion:</label>
                         <input type="text" id="ChkPtAddDescription" name="description" required><br><br>
                    <button type="submit" id = "submitAdd">Guardar</button>
                    <button type="button" id="closeButton">Cerrar</button>
                </form>
            </div>
            
            <!--popup para editar-->
            <div id="popupEditForm" class = "pop_up">
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
                    <label for="ChkPtEditDescription">Descripcion:</label>
                    <input type="text" id="ChkPtEditDescription" name="description" required><br><br>
                    <button type="submit" id = "submitEdit" disabled>Guardar</button>
                    <button type="button" id="closeEditButton">Cerrar</button>
                </form>
            </div>

            <!--popup para eliminar-->
            <div id="popupDeleteForm" class = "pop_up">
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
                    <label for="ChkPtDeleteDescription">Descripcion:</label>
                    <input type="text" id="ChkPtDeleteDescription" name="description" required readonly><br><br>
                    <button type="submit" id = "submitDelete" disabled>Eliminar</button>
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
            if (selectedChkPtId) {
                const selectedChkPt = chkPtArray.find(chkPt => chkPt.id.toString() === selectedChkPtId);
                if (selectedChkPt) {
                    ChkPtEditlat.value = selectedChkPt.lat;
                    ChkPtEditlong.value = selectedChkPt.long;
                    ChkPtEditDescription.value = selectedChkPt.description;
                    document.getElementById('submitEdit').disabled = false;
                }
                else {
                    console.log('no encontre')
                }
            } else {
                ChkPtEditlat.value = "";
                ChkPtEditlong.value = "";
                ChkPtEditDescription.value = "";
                document.getElementById('submitEdit').disabled = true;
            }
        });

        //esto rellena los valores para borrar el ChkPt
        ChkPtSelectDelete.addEventListener('change', () => {
            const selectedChkPtId = ChkPtSelectDelete.value;
            if (selectedChkPtId) {
                const selectedChkPt = chkPtArray.find(chkPt  => chkPt .id.toString() === selectedChkPtId);
                if (selectedChkPt) {
                    ChkPtDeletelat.value = selectedChkPt.lat;
                    ChkPtDeletelong.value = selectedChkPt.long;
                    ChkPtDeleteDescription.value = selectedChkPt.description;
                    document.getElementById('submitDelete').disabled = false;
                }
            } else {
                ChkPtDeletelat.value = '';
                ChkPtDeletelong.value = '';
                ChkPtDeleteDescription.value = '';
                document.getElementById('submitDelete').disabled = true;
            }
        });

        // cierra pop-up cuando se hace click en el boton de cerrar o en el fondo
        closeButton.addEventListener('click', () => {
            popupAddForm.style.display = 'none';
            popupOverlay.style.display = 'none';
            ChkPtAddId.value = '';
            ChkPtAddlat.value = '';
            ChkPtAddlong.value = '';
            ChkPtAddDescription.value = '';
        });

        closeEditButton.addEventListener('click', () => {
            popupEditForm.style.display = 'none';
            popupOverlay.style.display = 'none';
            ChkPtSelectEdit.value = '';
            ChkPtEditlat.value = '';
            ChkPtEditlong.value = '';
            ChkPtEditDescription.value = '';
        });
        
        closeDeleteButton.addEventListener('click', () => {
            popupDeleteForm.style.display = 'none';
            popupOverlay.style.display = 'none';
            ChkPtSelectDelete.value = '';
            ChkPtDeletelat.value = '';
            ChkPtDeletelong.value = '';
            ChkPtDeleteDescription.value = '';
        });

        popupOverlay.addEventListener('click', () => {
            popupAddForm.style.display = 'none';
            popupEditForm.style.display = 'none';
            popupDeleteForm.style.display = 'none';
            popupOverlay.style.display = 'none';
            ChkPtAddId.value = '';
            ChkPtAddlat.value = '';
            ChkPtAddlong.value = '';
            ChkPtAddDescription.value = '';

            ChkPtSelectEdit.value = '';
            ChkPtEditlat.value = '';
            ChkPtEditlong.value = '';
            ChkPtEditDescription.value = '';

            ChkPtSelectDelete.value = '';
            ChkPtDeletelat.value = '';
            ChkPtDeletelong.value = '';
            ChkPtDeleteDescription.value = '';
        });

    //manejo de los datos al apretar submit del formulario agregar (pegaria a la API)
    ChkPtAddForm.addEventListener('submit', (event) => {
        const id = ChkPtAddId.value;
        const lat = ChkPtAddlat.value;
        const long = ChkPtAddlong.value;
        const description = ChkPtAddDescription.value;
        PostChkPt(id, lat, long, description);
        popupAddForm.style.display = 'none';
        popupOverlay.style.display = 'none';
    });

    //manejo de los datos al apretar submit del formulario editar (pegaria a la API)
    ChkPtEditForm.addEventListener('submit', (event) => {
        const id = ChkPtSelectEdit.value;
        const lat = ChkPtEditlat.value;
        const long = ChkPtEditlong.value;
        const description = ChkPtEditDescription.value;
        PatchChkPt(id, lat, long, description);
        popupEditForm.style.display = 'none';
        popupOverlay.style.display = 'none';
    });

    //manejo de los datos al apretar submit del formulario delete (pegaria a la API)
    ChkPtDeleteForm.addEventListener('submit', (event) => {
        const id = ChkPtSelectDelete.value;
        DeleteChkPt(id);
        popupDeleteForm.style.display = 'none';
        popupOverlay.style.display = 'none';
    });
    });
}

export function renderChkPtArray() { //todo vendria siendo el get, cambiarlo
    // Llama a la función getChkPts (es la q esta en api.js) y espera su resultado
    return getChkPt().then(chkPtArray => { //devuelve promesa
        return chkPtArray
    });
}