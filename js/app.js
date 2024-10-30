

//!esto se va entero, tengo que mudar las funciones nomas

// Función para cargar la vista de Animales
function loadAnimalsView() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="container">
            <h2>Administración de Animales</h2>
            <button onclick="showAddAnimalForm()">Agregar Animal</button>
            <div id="animal-list"></div>
            <div id="animal-form" style="display:none;"></div>
        </div>
    `;
    renderAnimalList();
}

// Función para renderizar la lista de animales
function renderAnimalList() {
    const animalList = document.getElementById('animal-list');
    // Aquí realizarías la llamada al backend
    animalList.innerHTML = `
        <ul>
            <li>Animal 1 - <button onclick="editAnimal(1)">Editar</button> <button onclick="deleteAnimal(1)">Eliminar</button></li>/
            <li>Animal 2 - <button onclick="editAnimal(2)">Editar</button> <button onclick="deleteAnimal(2)">Eliminar</button></li>
        </ul>
    `;
}

// Función para mostrar el formulario de agregar animal
function showAddAnimalForm() {
    const form = document.getElementById('animal-form');
    form.style.display = 'block';
    form.innerHTML = `
        <h3>Agregar Nuevo Animal</h3>
        <input type="text" id="animal-name" placeholder="Nombre del Animal">
        <button onclick="addAnimal()">Guardar</button>
    `;
}

// Función para agregar un animal (solo un ejemplo)
function addAnimal() {
    const name = document.getElementById('animal-name').value;
    // Aquí realizarías la lógica de guardado en el backend
    alert(`Animal ${name} agregado!`);
    renderAnimalList(); // Actualizar la lista
}
