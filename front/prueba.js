getAnimalsArray().then(animalArray => {
    // Generar el HTML en tu página de carga
    const app = document.getElementById('app');
    app.innerHTML = `
        <h2>Lista de Animales</h2>
        <ul>
            ${animalArray.map(animal => `
                <li>ID: ${animal.id}, Nombre: ${animal.nombre}, Descripción: ${animal.description}</li>
            `).join('')}
        </ul>
        <button id="addAnimalButton">Agregar Animal</button>
        <button id="editAnimalButton">Editar Animal</button> <!-- Botón para editar un animal -->
        
        <!-- Ventana emergente para agregar/editar animal (inicialmente oculta) -->
        <div id="popupForm" style="display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
            background-color: white; padding: 20px; border: 1px solid #ccc; z-index: 1000;">
            <h3>Editar Animal</h3>
            <form id="animalForm">
                <label for="animalSelect">Seleccionar Animal:</label>
                <select id="animalSelect">
                    <option value="">-- Selecciona un animal --</option>
                    ${animalArray.map(animal => `
                        <option value="${animal.id}">${animal.nombre}</option>
                    `).join('')}
                </select><br><br>

                <label for="animalName">Nombre:</label>
                <input type="text" id="animalName" name="nombre" required><br><br>
                <label for="animalDescription">Descripción:</label>
                <input type="text" id="animalDescription" name="description" required><br><br>
                <button type="submit" id="saveButton" disabled>Guardar</button>
                <button type="button" id="closeButton">Cerrar</button>
            </form>
        </div>

        <!-- Fondo semi-transparente para el pop-up -->
        <div id="popupOverlay" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
            background-color: rgba(0, 0, 0, 0.5); z-index: 999;"></div>
    `;

    // Agregar eventos
    const addAnimalButton = document.getElementById('addAnimalButton');
    const editAnimalButton = document.getElementById('editAnimalButton');
    const popupForm = document.getElementById('popupForm');
    const popupOverlay = document.getElementById('popupOverlay');
    const closeButton = document.getElementById('closeButton');
    const saveButton = document.getElementById('saveButton');
    const animalForm = document.getElementById('animalForm');
    const animalSelect = document.getElementById('animalSelect');
    const animalName = document.getElementById('animalName');
    const animalDescription = document.getElementById('animalDescription');

    // Mostrar el pop-up para agregar un nuevo animal
    addAnimalButton.addEventListener('click', () => {
        popupForm.style.display = 'block';
        popupOverlay.style.display = 'block';
        animalForm.reset(); // Limpiar el formulario
        saveButton.disabled = true; // Deshabilitar el botón "Guardar" por defecto
    });

    // Mostrar el pop-up para editar un animal existente
    editAnimalButton.addEventListener('click', () => {
        popupForm.style.display = 'block';
        popupOverlay.style.display = 'block';
    });

    // Cerrar el pop-up cuando se hace clic en el botón de cerrar o en el fondo
    closeButton.addEventListener('click', () => {
        popupForm.style.display = 'none';
        popupOverlay.style.display = 'none';
    });

    popupOverlay.addEventListener('click', () => {
        popupForm.style.display = 'none';
        popupOverlay.style.display = 'none';
    });

    // Actualizar los campos de "Nombre" y "Descripción" cuando se selecciona un animal
    animalSelect.addEventListener('change', () => {
        const selectedAnimalId = animalSelect.value;
        if (selectedAnimalId) {
            const selectedAnimal = animalArray.find(animal => animal.id === parseInt(selectedAnimalId));
            if (selectedAnimal) {
                animalName.value = selectedAnimal.nombre;
                animalDescription.value = selectedAnimal.description;
                saveButton.disabled = false; // Habilitar el botón "Guardar"
            }
        } else {
            animalName.value = '';
            animalDescription.value = '';
            saveButton.disabled = true; // Deshabilitar el botón "Guardar"
        }
    });

    // Evitar que el formulario se envíe y recargue la página
    animalForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita el comportamiento por defecto de recargar la página

        // Aquí puedes manejar los datos del formulario
        const nombre = animalName.value;
        const description = animalDescription.value;

        console.log("Datos del nuevo/actualizado animal:", { nombre, description });

        // Cerrar el pop-up después de guardar los datos
        popupForm.style.display = 'none';
        popupOverlay.style.display = 'none';
    });

    // Función para habilitar/deshabilitar el botón "Guardar" (si se está editando)
    function checkFormFields() {
        if (animalName.value.trim() !== '' && animalDescription.value.trim() !== '') {
            saveButton.disabled = false; // Habilita el botón
        } else {
            saveButton.disabled = true; // Deshabilita el botón
        }
    }

    // Escuchar los eventos "input" en los campos para validar en tiempo real
    animalName.addEventListener('input', checkFormFields);
    animalDescription.addEventListener('input', checkFormFields);
});
