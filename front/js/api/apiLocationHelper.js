import { renderMapPage } from "../pages/mapPage";

export function startEventSource() {
  const eventSource = new EventSource('http://localhost:3000/api/animals/position');

  eventSource.onmessage = function (event) {
    const checkpointPositionData = JSON.parse(JSON.parse(event.data));
    console.log(checkpointPositionData);

    if (window.location.hash === '#/locacion') {
      renderLocationPage(checkpointPositionData);
    }

    if (window.location.hash === '#/map') {
      renderMapPage(checkpointPositionData);
    }

  };

  eventSource.onerror = function (error) {
    console.error("Error in SSE connection:", error);
    eventSource.close();
  };
}


