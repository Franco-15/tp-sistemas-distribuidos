
import { getAnimals, PatchAnimal, PostAnimal , DeleteAnimal, getNewAnimals} from "../api/apiAnimalHelper.js";


export function loadAnimalPage() {
    
    renderAnimalsArray().then(animalArray => {
        const app = document.getElementById('app');
        app.innerHTML = `
        <body>             
            <div class="animal-container">
                <h2 class="animal-title">Lista de Animales</h2>
                <table class="animal-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripcion</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${animalArray.map(animal => `
                            <tr>
                                <td>${animal.id}</td>
                                <td>${animal.name}</td>
                                <td>${animal.description}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <div class="button-container">
                    <button id="addAnimalButton" class="styled-button">Agregar Animal</button>
                    <button id="editAnimalButton" class="styled-button">Editar Animal</button>
                    <button id="deleteAnimalButton" class="styled-button">Eliminar Animal</button>
                </div>
            </div>


            <!--popup para agregar-->
            <div id="popupAddForm" class = "pop_up">
                <h3>Agregar Nuevo Animal</h3>
                <form id="animalAddForm">
                    <label for="animalAddId">ID:</label> 

                    <select id="animalSelectAdd">
                        <option value="">-- Selecciona un animal --</option>
                    </select><br><br>

                    <label for="animalAddName">Nombre:</label>
                    <input type="text" id="animalAddName" name="nombre" required><br><br>
                    <label for="animalAddDescription">Descripcion:</label>
                    <input type="text" id="animalAddDescription" name="description" required><br><br>
                    <button type="submit" id = "submitAdd">Guardar</button>
                    <button type="button" id="closeButton">Cerrar</button>
                </form>
            </div>
            
            <!--popup para editar-->
            <div id="popupEditForm" class = "pop_up">
                <h3>Editar animal</h3>
                <form id="animalEditForm">
                    <label for="animalEditId">ID:</label> 
                    <select id="animalSelectEdit">
                        <option value="">-- Selecciona un animal --</option>
                        ${animalArray.map(animal => `
                            <option value="${animal.id}">${animal.id}</option>
                        `).join('')}
                    </select><br><br>
                    
                    <label for="animalEditName">Nombre:</label>
                    <input type="text" id="animalEditName" name="nombre" required><br><br>
                    <label for="animalEditDescription">Descripcion:</label>
                    <input type="text" id="animalEditDescription" name="description" required><br><br>
                    <button type="submit" id = "submitEdit" disabled>Guardar</button>
                    <button type="button" id="closeEditButton">Cerrar</button>
                </form>
            </div>

            <!--popup para eliminar-->
            <div id="popupDeleteForm" class = "pop_up">
                <h3>Eliminar animal</h3>
                <form id="animalDeleteForm">
                    <label for="animalDeleteId">ID:</label> 
                    <select id="animalSelectDelete">
                        <option value="">-- Selecciona un animal --</option>
                        ${animalArray.map(animal => `
                            <option value="${animal.id}">${animal.id}</option>
                        `).join('')}
                    </select><br><br>
                    
                    <label for="animalDeleteName">Nombre:</label>
                    <input type="text" id="animalDeleteName" name="nombre" required readonly><br><br>
                    <label for="animalDeleteDescription">Descripcion:</label>
                    <input type="text" id="animalDeleteDescription" name="description" required readonly><br><br>
                    <button type="submit" id = "submitDelete" disabled>Eliminar</button>
                    <button type="button" id="closeDeleteButton">Cerrar</button>
                </form>
            </div>


            <!--esto es para hacer el fondo mas oscuro-->
            <div id="popupOverlay" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
                background-color: rgba(0, 0, 0, 0.5); z-index: 999;"></div>
        </body>   
        `;
        
        // eventos
        const addAnimalButton = document.getElementById('addAnimalButton');
        const editAnimalButton = document.getElementById('editAnimalButton');
        const deleteAnimalButton = document.getElementById('deleteAnimalButton');
        const popupAddForm = document.getElementById('popupAddForm');
        const popupEditForm = document.getElementById('popupEditForm');
        const popupOverlay = document.getElementById('popupOverlay');
        const closeButton = document.getElementById('closeButton');
                    

        
        // popup para agregar
        addAnimalButton.addEventListener('click', () => {
            document.getElementById('popupAddForm').style.display = 'block';
            fillAnimalSelectOptions();
            popupAddForm.style.display = 'block';
            popupOverlay.style.display = 'block';
        });
    

        // popup para editar
        editAnimalButton.addEventListener('click', () => {
            popupEditForm.style.display = 'block';
            popupOverlay.style.display = 'block';
        });

         // popup para eliminar
         deleteAnimalButton.addEventListener('click', () => {
            popupDeleteForm.style.display = 'block';
            popupOverlay.style.display = 'block';
        });

        //esto rellena los valores para el editado
        animalSelectEdit.addEventListener('change', () => {
            const selectedAnimalId = animalSelectEdit.value;
            if (selectedAnimalId) {
                const selectedAnimal = animalArray.find(animal => animal.id.toString() === selectedAnimalId);
                if (selectedAnimal) {
                    animalEditName.value = selectedAnimal.name;
                    animalEditDescription.value = selectedAnimal.description;
                    document.getElementById('submitEdit').disabled = false;
                }
                else {
                    animalEditName.value = "";
                    animalEditDescription.value = "";
                    document.getElementById('submitEdit').disabled = true;
                }
            } else {
                animalEditName.value = "";
                animalEditDescription.value = "";
                document.getElementById('submitEdit').disabled = true;
            }
        });

        //esto rellena los valores para borrar el animal
        animalSelectDelete.addEventListener('change', () => {
            const selectedAnimalId = animalSelectDelete.value;
            if (selectedAnimalId) {
                const selectedAnimal = animalArray.find(animal => animal.id.toString() === selectedAnimalId);
                if (selectedAnimal) {
                    animalDeleteName.value = selectedAnimal.name;
                    animalDeleteDescription.value = selectedAnimal.description;
                    document.getElementById('submitDelete').disabled = false;
                }
                else {
                    animalDeleteName.value = "";
                    animalDeleteDescription.value = "";
                    document.getElementById('submitDelete').disabled = true;
                }
            } else {
                animalDeleteName.value = "";
                animalDeleteDescription.value = "";
                document.getElementById('submitDelete').disabled = true;
            }
        });

        // cierra pop-up cuando se hace click en el boton de cerrar o en el fondo
        closeButton.addEventListener('click', () => {
            popupAddForm.style.display = 'none';
            popupOverlay.style.display = 'none';
            animalSelectAdd.value = '';
            animalAddName.value = ''; 
            animalAddDescription.value = '';
        });

        closeEditButton.addEventListener('click', () => {
            popupEditForm.style.display = 'none';
            popupOverlay.style.display = 'none';
            animalSelectEdit.value = '';
            animalEditName.value = ''; 
            animalEditDescription.value = '';
        });
        
        closeDeleteButton.addEventListener('click', () => {
            popupDeleteForm.style.display = 'none';
            popupOverlay.style.display = 'none';
            animalSelectDelete.value = '';
            animalDeleteName.value = ''; 
            animalDeleteDescription.value = '';
        });


        popupOverlay.addEventListener('click', () => {
            popupAddForm.style.display = 'none';
            popupEditForm.style.display = 'none';
            popupDeleteForm.style.display = 'none';
            popupOverlay.style.display = 'none';
            animalSelectDelete.value = '';
            animalSelectEdit.value = '';
            animalAddName.value = ''; 
            animalAddDescription.value = '';
            animalEditName.value = ''; 
            animalEditDescription.value = '';
            animalDeleteName.value = ''; 
            animalDeleteDescription.value = '';
        });

    //manejo de los datos al apretar submit del formulario agregar (pegaria a la API)
    animalAddForm.addEventListener('submit', (event) => {
        const id = animalSelectAdd.value;
        const name = animalAddName.value;
        const description = animalAddDescription.value;
        PostAnimal(id, name, description);
        popupAddForm.style.display = 'none';
        popupOverlay.style.display = 'none';
    });

    //manejo de los datos al apretar submit del formulario editar (pegaria a la API)
    animalEditForm.addEventListener('submit', (event) => {
        const id = animalSelectEdit.value;
        const name = animalEditName.value;
        const description = animalEditDescription.value;
        PatchAnimal(id, name, description);
        popupEditForm.style.display = 'none';
        popupOverlay.style.display = 'none';
    });

    //manejo de los datos al apretar submit del formulario delete (pegaria a la API)
    animalDeleteForm.addEventListener('submit', (event) => {
        const id = animalSelectDelete.value;
        DeleteAnimal(id);
        popupDeleteForm.style.display = 'none';
        popupOverlay.style.display = 'none';
    });

    });
}

export function renderAnimalsArray() { //todo vendria siendo el get, cambiarlo
    // Llama a la funcion getAnimals (es la q esta en api.js) y espera su resultado
    return getAnimals().then(animalArray => { //devuelve promesa
        return animalArray
    })
    .catch(error => {
        console.error("Error en la solicitud:", error);
        return [];
    });
}


export function renderNewAnimalsArray() { //para agarrar los nuevos id's
    return getNewAnimals().then(animalNewArray => { //devuelve promesa
        return animalNewArray
    })
    .catch(error => {
        console.error("Error en la solicitud:", error);
        return [];
    });
}


function fillAnimalSelectOptions() {
    renderNewAnimalsArray().then(newAnimalArray => {
        const select = document.getElementById('animalSelectAdd');
        select.innerHTML = '<option value="">-- Selecciona un animal --</option>'; 
        newAnimalArray.forEach(animal => {
            const option = document.createElement('option');
            option.value = animal;
            option.textContent = animal;
            select.appendChild(option);
        });
    }).catch(error => {
        console.error("Error al obtener los nuevos animales:", error);
    });
}

