import AnimalAPIHelper from "../helper/api/AnimalAPIHelper.js";
import CheckpointsAPIHelper from "../helper/api/CheckpointAPIHelper.js";
import AuthStateHelper from "../helper/state/AuthStateHelper.js";
import { CONSTANTS } from "../constants/constants.js";

export default class AnimalPage {
  constructor(selector) {
    this.container = document.getElementById(selector);
    this.render();
    this.addListener();
  }

  altaAnimal = async (event) => {
    try {
      event.preventDefault();

      const animalId = event.target.elements.animalIdAlta.value.trim();
      const animalName = event.target.elements.animalNameAlta.value.trim();
      const animalDesc =
        event.target.elements.animalDescriptionAlta.value.trim();
      const accessToken = AuthStateHelper.getAccessToken();

      const animalData = {
        id: animalId,
        name: animalName,
        description: animalDesc,
      };

      //Manda POST a la API
      const response = await AnimalAPIHelper.handleAnimal(
        "post",
        animalData,
        accessToken
      );

      if (response.ok) {
        //codigo de exito
        alert("Animal registrado exitosamente.");
        event.target.reset();
      } else {
        alert("Error al registrar el animal: " + response.statusText);
      }
    } catch (error) {
      console.error("Error al dar de alta el animal:", error);
      alert("Ocurrió un error al registrar el animal.");
    }
  };

  //SEND BAJA a la API (DELETE)
  bajaAnimal = async (animalId) => {
    try {
      const accessToken = AuthStateHelper.getAccessToken();

      const animalData = {
        id: animalId,
      };

      //Manda DELETE a la API
      const response = await AnimalAPIHelper.handleAnimal(
        "delete",
        animalData,
        accessToken
      );

      if (response.ok) {
        //codigo de exito
        alert("Animal eliminado exitosamente.");
        this.renderPanelList();
      } else {
        alert("Error al eliminar el animal: " + response.statusText);
      }
    } catch (error) {
      console.error("Error al eliminar el animal:", error);
      alert("Ocurrió un error al eliminar el animal.");
    }
  };

  //SEND MODIFY A LA API (PATCH)
  modifAnimal = async (event) => {
    try {
      event.preventDefault();

      const animalId = event.target.elements.animalIdModif.value.trim();
      const animalName = event.target.elements.animalNameModif.value.trim();
      const animalDesc =
        event.target.elements.animalDescriptionModif.value.trim();
      const accessToken = AuthStateHelper.getAccessToken();

      const animalData = {
        id: animalId,
        name: animalName,
        description: animalDesc,
      };

      //Manda PATCH a la API
      const response = await AnimalAPIHelper.handleAnimal(
        "patch",
        animalData,
        accessToken
      );

      if (response.ok) {
        //codigo de exito
        alert("Animal modificado exitosamente.");
        this.renderPanelList();
      } else {
        alert("Error al modificar el animal: " + response.statusText);
      }
    } catch (error) {
      console.error("Error al modificar un animal:", error);
      alert("Ocurrió un error al modificar el animal.");
    }
  };

  getCheckpoints = async () => {
    try {
      const accessToken = AuthStateHelper.getAccessToken();
      const response = await CheckpointsAPIHelper.handleCheckpoint(
        "get",
        {},
        accessToken
      );
      if (response.ok) {
        return response.data.data;
      } else {
        alert("Error al traerte los animales: " + response.statusText);
        return;
      }
    } catch (error) {
      console.error("Error al traerte los animales", error);
      alert("Ocurrió un error al mostrar los animales");
      return;
    }
  };

  //get inicial
  showAnimals = async () => {
    const checkpoints = await this.getCheckpoints();
    this.map = L.map("map").setView(
      [checkpoints[0].lat, checkpoints[0].long],
      13
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
    }).addTo(this.map);

    checkpoints.forEach((checkpoint) => {
      const { id, lat, long, description } = checkpoint;
      // Animals es un array con: {id, name, description}
      // Añade un marcador en el mapa para cada checkpoint
      let marker = `<b>${description}</b><br><span>${id}</span>`;
      L.marker([lat, long]).addTo(this.map).bindPopup(marker); // Popup con la descripción del checkpoint, ID y animales
    });
  };

  listDevices = async () => {
    const accessToken = AuthStateHelper.getAccessToken();

    const response = await AnimalAPIHelper.handleAnimal(
      "getAnimals",
      "",
      accessToken
    );
    const listado = document.getElementById("listado");
    const tr = document.createElement("tr");
    const tr_name = document.createElement("th");
    tr_name.innerHTML = "Nombre";
    const tr_desc = document.createElement("th");
    tr_desc.innerHTML = "Descripción";
    const tr_eliminar = document.createElement("th");
    const tr_modificar = document.createElement("th");
    tr.appendChild(tr_name);
    tr.appendChild(tr_desc);
    tr.appendChild(tr_eliminar);
    tr.appendChild(tr_modificar);
    listado.appendChild(tr);

    response.data?.data?.forEach((element) => {
      const tr = document.createElement("tr");
      // Nombre
      const tr_name = document.createElement("th");
      tr_name.id = `name-${element.id}`;
      tr_name.innerHTML = element.name;
      // Descripción
      const tr_desc = document.createElement("th");
      tr_desc.id = `description-${element.id}`;
      tr_desc.innerHTML = element.description;

      // Botón eliminar
      const tr_eliminar_rh = document.createElement("th");
      const tr_form_eliminar = document.createElement("form");
      const tr_eliminar = document.createElement("button");
      tr_eliminar.type = "submit";
      tr_eliminar.innerHTML = "Eliminar";
      tr_eliminar.className = "eliminar-animal";
      tr_eliminar.id = element.id;
      tr_form_eliminar.appendChild(tr_eliminar);
      tr_eliminar_rh.appendChild(tr_form_eliminar);

      // Botón modificar
      const tr_modificar_rh = document.createElement("th");
      const tr_form_modificar = document.createElement("form");
      const tr_modificar = document.createElement("button");
      tr_modificar.type = "submit";
      tr_modificar.innerHTML = "Modificar";
      tr_modificar.className = "modificar-animal";
      tr_modificar.id = element.id;
      tr_form_modificar.appendChild(tr_modificar);
      tr_modificar_rh.appendChild(tr_form_modificar);

      tr.appendChild(tr_name);
      tr.appendChild(tr_desc);
      tr.appendChild(tr_eliminar_rh);
      tr.appendChild(tr_modificar_rh);
      listado.appendChild(tr);
    });
  };

  //Manejo de las acciones
  handleSubmit = async (event) => {
    event.preventDefault();
    const action = event.submitter.className;

    switch (action) {
      case "alta-animal":
        this.altaAnimal(event);
        break;
      case "modif-animal":
        this.modifAnimal(event);
        break;
      case "eliminar-animal":
        this.bajaAnimal(event.target[0].id);
        break;
      case "modificar-animal":
        this.modificarAnimalId(event.target[0].id);
        break;
    }
  };

  modificarAnimalId = (id) => {
    const name = document.getElementById(`name-${id}`).innerHTML;
    const description = document.getElementById(`description-${id}`).innerHTML;
    const animal = { id, name, description };
    this.renderPanelModif(animal);
  };

  highlightButton = (buttonDataPanel) => {
    const buttons = document.querySelectorAll(".sidebar-secundaria button");
    buttons.forEach((button) => {
      if (button.getAttribute("data-panel") === buttonDataPanel) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
  };

  render = () => {
    let homeHtml = `
              <div class="sidebar-secundaria">
                <button data-panel="alta" id="reg-animals-button" onclick="">Registrar animal</button>
                <button data-panel="mostrar" id="show-animals-button">Mostrar animales</button>
                <button data-panel="listar" id="list-animals-button" >Listar animales</button>
              </div>
              <div id="page-container-animal">
              </div>

            <!-- modificacion -->
            <div id="modificacion" class="form-panel-animal" style="display: none;">
                <form class="login-form-animal">
                    <h2>Modificar animal</h2>

                    <label for="modificar-id">Id del animal:</label>
                    <input type="text" id="animalIdModif" name="animalIdModif" required>

                    <label for="modificar-name">Nuevo nombre del animal:</label>
                    <input type="text" id="animalNameModif" name="animalNameModif" required>

                    <label for="nuevo-nombre">Nueva descripcion:</label>
                    <input type="text" id="animalDescriptionModif" name="animalDescriptionModif" required>

                    <div class="button-container-animal">
                    <button type="submit" id="modif" class="modif-animal">Modificar</button>
                    </div>
                </form>
            </div>
        `;
    this.container.innerHTML = homeHtml;
  };

  initializeSSE = () => {
    const eventSource = new EventSource(
      CONSTANTS.IP_POSITIONS
    );

    eventSource.onmessage = (event) => {
      console.log(event);
      const checkpoints = JSON.parse(event.data); // ver si no llega ya JSON
      console.log(checkpoints);
      this.updateMap(checkpoints);
    };
    eventSource.onerror = (error) => {
      console.error("Error en el envio - SSE:", error);
    };
  };

  updateMap = (checkpoints) => {
    this.map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer);
      }
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
    }).addTo(this.map);

    console.log(checkpoints[0]);
    checkpoints.forEach((checkpoint) => {
      const { id, lat, long, description, animals } = checkpoint;
      // Animals es un array con: {id, name, description}
      // Añade un marcador en el mapa para cada checkpoint
      let marker = `<b>${description}</b><br><br><b>Animales:</b>`;
      animals.forEach((animal) => {
        marker += `<br><span>${animal.id}</span>`;
      });
      L.marker([lat, long]).addTo(this.map).bindPopup(marker); // Popup con la descripción del checkpoint, ID y animales
    });
  };

  renderPanelList = () => {
    this.highlightButton("listar");
    const container = document.getElementById("page-container-animal");
    container.innerHTML = `
              <!-- listar -->
              <div id="listar" class="listar-animal form-panel-animal">
                <table id="listado" class="listado">
                </table>
              <form class="login-form-animal">  
              </form>   
              </div>
                  `;
    this.listDevices();
  };

  renderPanelMap = () => {
    this.highlightButton("mostrar");
    const container = document.getElementById("page-container-animal");
    container.innerHTML = `
            <!-- Mostrar animales -->
            <div id="mostrar" class="form-panel-animal map-panel-animals">
              <h2>Mostrar animales en el Mapa</h2>
              <div id="map"></div>
            </div>
                  `;
    this.initializeSSE();
    this.showAnimals(); // Inicializa el mapa
  };

  renderPanelAlta = () => {
    this.highlightButton("alta");
    const container = document.getElementById("page-container-animal");
    container.innerHTML = `<div id="alta" class="alta-animal form-panel-animal">
                  <h2>Registrar animal</h2>
                  <form class="login-form-animal">
  
                      <!-- Listar animales disponibles -->
                      <label for="list-mac-addr">Animales disponibles:</label>
                      <select id="list-mac-addr" name="list-mac-addr" onchange="actualizarId()">
                          <option selected="true" disabled="disabled">Collares disponibles</option>
                      </select>
  
                      <label for="identificador">Número de identificador de collar:</label>
                      <input type="text" id="animalIdAlta" name="animalIdAlta" required>
  
                      <label for="nombre">Nombre del animal:</label>
                      <input type="text" id="animalNameAlta" name="animalNameAlta" required>
  
                      <label for="nombre">Descripcion:</label>
                      <input type="text" id="animalDescriptionAlta" name="animalDescriptionAlta" required>
  
                      <div class="button-container-animal">
                          <button type="submit" id="alta" class="alta-animal">Registrar</button>
                      </div>
                  </form>
              </div>`;
    this.listAvailableDevices();
  };

  renderPanelModif = (animal) => {
    const container = document.getElementById("page-container-animal");
    container.innerHTML = `
            <!-- modificacion -->
            <div id="modificacion" class="form-panel-animal">
                <form class="login-form-animal">
                    <h2>Modificar animal</h2>

                    <label for="modificar-id">Id del animal:</label>
                    <input type="text" id="animalIdModif" name="animalIdModif" value="${animal.id}" required>

                    <label for="modificar-name">Nuevo nombre del animal:</label>
                    <input type="text" id="animalNameModif" name="animalNameModif" value="${animal.name}" required>

                    <label for="nuevo-nombre">Nueva descripcion:</label>
                    <input type="text" id="animalDescriptionModif" name="animalDescriptionModif" value="${animal.description}" required>

                    <div class="button-container-animal">
                    <button type="submit" id="modif" class="modif-animal">Modificar</button>
                    </div>
                </form>
            </div>`;
  };

  listAvailableDevices = async () => {
    const accessToken = AuthStateHelper.getAccessToken();
    const response = await AnimalAPIHelper.handleAnimal(
      "getAvailableDevices",
      "",
      accessToken
    );

    const select = document.getElementById("list-mac-addr");
    if (response.ok) {
      response.data?.data?.devices?.forEach((device) => {
        const option = document.createElement("option");
        option.value = device;
        option.innerHTML = device;
        select.appendChild(option);
      });
    } else {
      alert(
        "Error al listar los dispositivos disponibles: " + response.statusText
      );
    }
  };

  replaceListener(id, callback) {
    const old_element = document.getElementById(id);
    const new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
    new_element.addEventListener("click", callback);
  }

  addListener = () => {
    // Remove listeners before
    const old_container = this.container;
    const new_container = old_container.cloneNode(true);
    old_container.parentNode.replaceChild(new_container, old_container);
    this.container = new_container;
    this.container.addEventListener("submit", this.handleSubmit);

    // Boton de alta
    this.replaceListener("reg-animals-button", this.renderPanelAlta);

    // Boton de mostrar
    this.replaceListener("show-animals-button", this.renderPanelMap);

    // Boton de listar
    this.replaceListener("list-animals-button", this.renderPanelList);
  };
}
