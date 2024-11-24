import CheckpointAPIHelper from "../helper/api/CheckpointAPIHelper.js";
import AuthStateHelper from "../helper/state/AuthStateHelper.js";

export default class CheckpointPage {
  constructor(selector) {
    this.container = document.getElementById(selector);
    this.render();
    this.addListeners();
  }

  async altaCheckpoint(event) {
    try {
      event.preventDefault();

      const id = event.target.elements.checkpointIdAlta.value.trim();
      const lat = event.target.elements.lat.value.trim();
      const long = event.target.elements.long.value.trim();
      const description = event.target.elements.checkpointDescAlta.value.trim();
      const accessToken = AuthStateHelper.getAccessToken();

      const checkpoint = {
        id,
        lat,
        long,
        description,
      };

      //Manda POST a la API
      const response = await CheckpointAPIHelper.handleCheckpoint(
        "post",
        checkpoint,
        accessToken
      );

      if (response.ok) {
        //codigo de exito
        alert("checkpoint registrado exitosamente.");
        event.target.reset();
      } else {
        alert("Error al registrar el checkpoint: " + response.statusText);
      }
    } catch (error) {
      console.error("Error al dar de alta el checkpoint:", error);
      alert("Ocurrió un error al registrar el checkpoint.");
    }
  }

  //SEND BAJA a la API (DELETE)
  async bajaCheckpoint(id) {
    try {
      const accessToken = AuthStateHelper.getAccessToken();

      const checkpoint = {
        id: id,
      };

      //Manda DELETE a la API
      const response = await CheckpointAPIHelper.handleCheckpoint(
        "delete",
        checkpoint,
        accessToken
      );

      if (response.ok) {
        //codigo de exito
        alert("checkpoint eliminado exitosamente.");
        this.renderPanelList();
      } else {
        alert("Error al eliminar el checkpoint: " + response.statusText);
      }
    } catch (error) {
      console.error("Error al eliminar el checkpoint:", error);
      alert("Ocurrió un error al eliminar el checkpoint.");
    }
  }

  //SEND MODIFY A LA API (PATCH)
  async modifCheckpoint(event) {
    try {
      event.preventDefault();
      const id = event.target.elements.checkpointIdModif.value.trim();
      const lat = event.target.elements.checkpointLatModif.value.trim();
      const long = event.target.elements.checkpointLongModif.value.trim();
      const description =
        event.target.elements.checkpointDescriptionModif.value.trim();

      const accessToken = AuthStateHelper.getAccessToken();

      const checkpoint = {
        id,
        lat,
        long,
        description,
      };
      //Manda PATCH a la API
      const response = await CheckpointAPIHelper.handleCheckpoint(
        "patch",
        checkpoint,
        accessToken
      );

      if (response.ok) {
        //codigo de exito
        alert("checkpoint modificado exitosamente.");
        this.renderPanelList();
      } else {
        alert("Error al modificar el checkpoint: " + response.statusText);
      }
    } catch (error) {
      console.error("Error al modificar el checkpoint:", error);
    }
  }

  createRow = (element) => {
    const tr = document.createElement("tr");
    // Latitud
    const tr_lat = document.createElement("th");
    tr_lat.id = `lat-${element.id}`;
    tr_lat.textContent = element.lat;

    // Longitud
    const tr_long = document.createElement("th");
    tr_long.id = `long-${element.id}`;
    tr_long.textContent = element.long;

    // Descripción
    const tr_desc = document.createElement("th");
    tr_desc.id = `description-${element.id}`;
    tr_desc.textContent = element.description;

    // Botón eliminar
    const tr_eliminar_rh = document.createElement("th");
    const tr_form_eliminar = document.createElement("form");
    const tr_eliminar = document.createElement("button");
    tr_eliminar.type = "submit";
    tr_eliminar.textContent = "Eliminar";
    tr_eliminar.className = "eliminar-checkpoint";
    tr_eliminar.id = element.id;
    tr_form_eliminar.appendChild(tr_eliminar);
    tr_eliminar_rh.appendChild(tr_form_eliminar);

    // Botón modificar
    const tr_modificar_rh = document.createElement("th");
    const tr_form_modificar = document.createElement("form");
    const tr_modificar = document.createElement("button");
    tr_modificar.type = "submit";
    tr_modificar.textContent = "Modificar";
    tr_modificar.className = "modificar-checkpoint";
    tr_modificar.id = element.id;
    tr_form_modificar.appendChild(tr_modificar);
    tr_modificar_rh.appendChild(tr_form_modificar);

    tr.appendChild(tr_lat);
    tr.appendChild(tr_long);
    tr.appendChild(tr_desc);
    tr.appendChild(tr_eliminar_rh);
    tr.appendChild(tr_modificar_rh);
    return tr;
  };

  async listarCheckpoints() {
    const accessToken = AuthStateHelper.getAccessToken();

    const response = await CheckpointAPIHelper.handleCheckpoint(
      "get",
      "",
      accessToken
    );

    const listado = document.getElementById("listado");
    listado.querySelectorAll("tr").forEach((tr) => {
      tr.remove();
    });

    const tr = document.createElement("tr");
    const tr_lat = document.createElement("th");
    tr_lat.textContent = "Latitud";
    const tr_long = document.createElement("th");
    tr_long.textContent = "Longitud";
    const tr_desc = document.createElement("th");
    tr_desc.textContent = "Descripción";
    const tr_eliminar = document.createElement("th");
    const tr_modificar = document.createElement("th");
    tr.appendChild(tr_lat);
    tr.appendChild(tr_long);
    tr.appendChild(tr_desc);
    tr.appendChild(tr_eliminar);
    tr.appendChild(tr_modificar);
    listado.appendChild(tr);

    response.data?.data?.forEach((element) => {
      listado.appendChild(this.createRow(element));
    });
  }

  //Manejo de las acciones
  handleSubmit = async (event) => {
    event.preventDefault();
    const action = event.submitter.className;

    switch (action) {
      case "alta-checkpoint":
        this.altaCheckpoint(event);
        break;
      case "baja-checkpoint":
        const checkpointId =
          event.target.elements.checkpointIdBaja.value.trim();
        this.bajaCheckpoint(checkpointId);
        break;
      case "modif-checkpoint":
        this.modifCheckpoint(event);
        break;
      case "eliminar-checkpoint":
        this.bajaCheckpoint(event.target[0].id);
        break;
      case "modificar-checkpoint":
        this.modificarCheckpointId(event.target[0].id);
        break;
    }
  };

  modificarCheckpointId(id) {
    const lat = document.getElementById(`lat-${id}`).innerHTML;
    const long = document.getElementById(`long-${id}`).innerHTML;
    const description = document.getElementById(
      `description-${id}`
    ).textContent;

    const checkpoint = {
      id,
      lat,
      long,
      description,
    };

    this.renderPanelModif(checkpoint);
  }

  renderPanelModif = (checkpoint) => {
    const container = document.getElementById("page-container-check");
    container.innerHTML = `
            <!-- modificacion -->
            <div id="modificacion" class="modif-checkpoint form-panel-check">
                <form class="login-form-check">
                    <h2>Modificar punto de control</h2>

                    <label for="checkpointIdModif">Id de punto de control:</label>
                    <input type="text" id="checkpointIdModif" name="checkpointIdModif" value="${checkpoint.id}" required>

                    <label for="checkpointLatModif">Nueva latitud:</label> <!-- texto ver pasar a coordenadas?-->
                    <input type="number" step="any" min="-90" max="90" id="checkpointLatModif" name="checkpointLatModif" value="${checkpoint.lat}" required>

                    <label for="checkpointLongModif">Nueva longitud:</label> <!-- texto ver pasar a coordenadas?-->
                    <input type="number" step="any" min="-180" max="180" id="checkpointLongModif" name="checkpointLongModif" value="${checkpoint.long}" required>

                    <label for="checkpointDescriptionModif">Nueva descripcion:</label> <!-- texto ver pasar a coordenadas?-->
                    <input type="text" id="checkpointDescriptionModif" name="checkpointDescriptionModif" value="${checkpoint.description}" required>
                    
                    <div class="button-container-check">
                        <button type="submit" class="modif-checkpoint">Modificar</button>
                    </div>
                </form>
            </div>`;
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

  render() {
    const formHtml = `        <div class="sidebar-secundaria">
            <button data-panel="alta" id="alta-checkpoints-button">Agregar punto de control</button>
            <button data-panel="listar" id="list-checkpoints-button" >Listar puntos de control</button>
        </div>

        <div id="page-container-check">
        </div>
    </div>
        `;
    this.container.innerHTML = formHtml;
  }

  renderPanelAlta = () => {
    this.highlightButton("alta");
    const container = document.getElementById("page-container-check");
    container.innerHTML = `<!-- alta -->
            <div id="alta" class="alta-checkpoint form-panel-check">
                <h2>Agregar punto de control</h2>
                <form class="login-form-check">

                    <label for="identificador">Id de punto de control:</label>
                    <input type="text" id="checkpointIdAlta" name="checkpointIdAlta" required>

                    <label for="lat">Coordenadas latitud:</label>
                    <input type="number" id="lat" name="lat" required>
                    
                    <label for="long">Coordenadas longitud:</label>
                    <input type="number" id="long" name="long" required>

                    <label for="checkpointDescAlta">Descripcion:</label>
                    <input type="text" id="checkpointDescAlta" name="checkpointDescAlta" required>

                    <div class="button-container-check">
                        <button type="submit" class="alta-checkpoint">Agregar</button>
                    </div>  

                </form>
            </div>`;
  };

  renderPanelList = () => {
    this.highlightButton("listar");
    const container = document.getElementById("page-container-check");
    container.innerHTML = `
                  <!-- listar -->
                  <div id="listar" class="listar-checkpoint form-panel-check">
                    <table id="listado" class="listado">
                    </table>
                  </div>
                  `;
    this.listarCheckpoints();
  };

  replaceListener(id, callback) {
    const old_element = document.getElementById(id);
    const new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
    new_element.addEventListener("click", callback);
  }

  addListeners = () => {
    // Remove listeners before
    const old_container = this.container;
    const new_container = old_container.cloneNode(true);
    old_container.parentNode.replaceChild(new_container, old_container);
    this.container = new_container;
    this.container.addEventListener("submit", this.handleSubmit);

    // Boton de alta
    this.replaceListener("alta-checkpoints-button", this.renderPanelAlta);

    // Boton de listar
    this.replaceListener("list-checkpoints-button", this.renderPanelList);
  };
}
