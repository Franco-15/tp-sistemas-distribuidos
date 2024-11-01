//todo: ver si no pasa a ser 'HomePage.js'

import { getAnimals, PatchAnimal, PostAnimal , DeleteAnimal} from "../api/apiAnimal.js";


export function loadAnimalPage() {
    console.log('entra') //!sacar
    
    renderAnimalsArray().then(animalArray => {
        const app = document.getElementById('app');


        //todo ver como centrar los input del popup
        app.innerHTML = `
                        
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
                                <td>${animal.nombre}</td>
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
            <div id="popupAddForm" style="display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                background-color: white; padding: 20px; border: 1px solid #ccc; z-index: 1000;">
                <h3>Agregar Nuevo Animal</h3>
                <form id="animalAddForm">
                    <label for="animalAddId">ID:</label> 
                    <input type="text" id="animalAddId" name="Id" required><br><br>
                    <label for="animalAddName">Nombre:</label>
                    <input type="text" id="animalAddName" name="nombre" required><br><br>
                    <label for="animalAddDescription">Descripción:</label>
                    <input type="text" id="animalAddDescription" name="description" required><br><br>
                    <button type="submit" id = "submitAdd">Guardar</button>
                    <button type="button" id="closeButton">Cerrar</button>
                </form>
            </div>
            
            <!--popup para editar-->
            <div id="popupEditForm" style="display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                background-color: white; padding: 20px; border: 1px solid #ccc; z-index: 1000;">
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
                    <label for="animalEditDescription">Descripción:</label>
                    <input type="text" id="animalEditDescription" name="description" required><br><br>
                    <button type="submit" id = "submitEdit">Guardar</button>
                    <button type="button" id="closeEditButton">Cerrar</button>
                </form>
            </div>

            <!--popup para eliminar-->
            <div id="popupDeleteForm" style="display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                background-color: white; padding: 20px; border: 1px solid #ccc; z-index: 1000;">
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
                    <label for="animalDeleteDescription">Descripción:</label>
                    <input type="text" id="animalDeleteDescription" name="description" required readonly><br><br>
                    <button type="submit" id = "submitDelete">Guardar</button>
                    <button type="button" id="closeDeleteButton">Cerrar</button>
                </form>
            </div>


            <!--esto es para hacer el fondo mas oscuro-->
            <div id="popupOverlay" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
                background-color: rgba(0, 0, 0, 0.5); z-index: 999;"></div>
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
            console.log(selectedAnimalId)
            if (selectedAnimalId) {
                const selectedAnimal = animalArray.find(animal => animal.id.toString() === selectedAnimalId);
                if (selectedAnimal) {
                    console.log(selectedAnimal)
                    animalEditName.value = selectedAnimal.nombre;
                    animalEditDescription.value = selectedAnimal.description;
                    
                }
                else {
                    console.log('no encontre')
                }
            } else {
                animalName.value = '';
                animalDescription.value = '';
            }
        });

        //esto rellena los valores para borrar el animal
        animalSelectDelete.addEventListener('change', () => {
            const selectedAnimalId = animalSelectDelete.value;
            console.log(selectedAnimalId)
            if (selectedAnimalId) {
                const selectedAnimal = animalArray.find(animal => animal.id.toString() === selectedAnimalId);
                if (selectedAnimal) {
                    console.log(selectedAnimal)
                    animalDeleteName.value = selectedAnimal.nombre;
                    animalDeleteDescription.value = selectedAnimal.description;
                    
                }
                else {
                    console.log('no encontre')
                }
            } else {
                animalName.value = '';
                animalDescription.value = '';
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
    animalAddForm.addEventListener('submit', (event) => {
        event.preventDefault(); // evita que se recarge la pagina
        
        const id = animalAddId.value;
        const nombre = animalAddName.value;
        const description = animalAddDescription.value;

        console.log("Datos del nuevo animal:", {id, nombre, description }); //para comprobar //!borrar

        PostAnimal(id, nombre, description);

        popupAddForm.style.display = 'none';
        popupOverlay.style.display = 'none';
    });

    //manejo de los datos al apretar submit del formulario editar (pegaria a la API)
    animalEditForm.addEventListener('submit', (event) => {
        event.preventDefault(); // evita que se recarge la pagina
        
        const id = animalSelectEdit.value;
        const nombre = animalEditName.value;
        const description = animalEditDescription.value;

        console.log("Animal editado:", {id, nombre, description }); //para comprobar //!borrar

        PatchAnimal(id, nombre, description);

        popupEditForm.style.display = 'none';
        popupOverlay.style.display = 'none';
    });

    //manejo de los datos al apretar submit del formulario delete (pegaria a la API)
    animalDeleteForm.addEventListener('submit', (event) => {
        event.preventDefault(); // evita que se recarge la pagina
        
        const id = animalSelectDelete.value;
        const nombre = animalDeleteName.value;
        const description = animalDeleteDescription.value;

        console.log("animal a eliminar:", {id, nombre, description }); //para comprobar //!borrar

        DeleteAnimal(id);

        popupDeleteForm.style.display = 'none';
        popupOverlay.style.display = 'none';
    });

    });
}

export function renderAnimalsArray() { //todo vendria siendo el get, cambiarlo
    // Llama a la función getAnimals (es la q esta en api.js) y espera su resultado
    return getAnimals().then(animalArray => { //devuelve promesa
        
        console.log("Array de animales:", animalArray); // Muestra el array en la consola
        return animalArray
    });
}