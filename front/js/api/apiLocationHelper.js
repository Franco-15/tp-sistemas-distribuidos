// Funcion para obtener la posicion de los animales utilizando el SSE
export function startEventSource() {
  const eventSource = new EventSource('http://localhost:3000/api/animals/position');

  eventSource.onmessage = function (event) {
    const checkpointPositionData = JSON.parse(JSON.parse(event.data));
    if (window.location.hash === '#/locacion') {
      renderLocationPage(checkpointPositionData);
    }
    if (window.location.hash === '#/map') {
      renderMapPage(checkpointPositionData);
    };

    eventSource.onerror = function (error) {
      console.error("Error in SSE connection:", error);
      eventSource.close();
    };
  }
}

//Funcion para renderizar la pagina de locacion
function renderLocationPage(data) {
  const positionsTableBody = document.getElementById('positionsBody');

  // Limpiar las filas existentes
  positionsTableBody.innerHTML = '';

  // Renderizar los nuevos datos
  data.forEach((item) => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.lat}</td>
        <td>${item.long}</td>
        <td>${item.description}</td>
        <td>${item.animals?.map(animal => animal.name).join(',\n') || 'No data'}</td>
    `;
    positionsTableBody.appendChild(row);
  });
}