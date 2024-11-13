
export function startEventSource() {
  const eventSource = new EventSource('http://localhost:3000/api/animals/position');

  eventSource.onmessage = function (event) {
    const checkpointPositionData = JSON.parse(JSON.parse(event.data));
    console.log(checkpointPositionData);
    if (window.location.hash === '#/locacion') {
      renderLocationPage(checkpointPositionData);
    }
  };

  eventSource.onerror = function (error) {
    console.error("Error in SSE connection:", error);
    eventSource.close();
  };
}

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
        <td>${item.animals?.map(animal => animal.id).join('\n') || 'No data'}</td>
    `;
    positionsTableBody.appendChild(row);
  });
}