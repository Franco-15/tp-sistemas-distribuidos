// Función para editar un animal
function editAnimal(id) {
    alert(`Editar animal con ID: ${id}`);
    // Aquí podrías cargar la información del animal y mostrar el formulario para editarlo
}

// Función para eliminar un animal
function deleteAnimal(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este animal?')) {
        alert(`Animal con ID ${id} eliminado`);
        // Aquí llamaría al backend para eliminarlo y luego actualiza la lista
        renderAnimalList();
    }
}
