import { CONSTANTS } from "../../constants/constants.js";
export default class AnimalAPIHelper {
  static async requestAvailableDevices() {
    return await this.handleAnimal("getAvailableDevices");
  }

  static async handleAnimal(action, animalData, accessToken) {
    try {
      //Configuracion header
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };

      //Configuracion url - se modifica segun lo establecido con la catedra
      const url = CONSTANTS.IP_ANIMALS;

      let response;
      switch (action) {
        case "post": {
          response = await axios.post(url, animalData, { headers });
          break;
        }
        case "delete": {
          response = await axios.delete(`${url}/${animalData.id}`, { headers });
          break;
        }
        case "patch": {
          response = await axios.patch(`${url}/${animalData.id}`, animalData, {
            headers,
          }); //se esta mandando el id en el body, chequear si causa problemas
          break;
        }
        case "getAnimals": {
          response = await axios.get(`${url}`, { headers }); //en get el header es el segundo param
          break;
        }
        case "getAnimalsPositions": {
          response = await axios.get(`${url}/position`, { headers }); //en get el header es el segundo param
          break;
        }
        case "getAvailableDevices": {
          const url_api = CONSTANTS.IP;
          response = await axios.get(`${url_api}/availableDevices`, {
            headers,
          });
          break;
        }
        default:
          throw new Error("Acción no válida");
      }

      return {
        status: response.status,
        statusText: response.statusText,
        data: response.data,
        ok: true, // solicitud exitosa
      };
    } catch (error) {
      console.error("Error en la solicitud de animales:", error);
      return {
        status: error.response?.status || 500,
        statusText: error.response?.statusText || "Error en la solicitud",
        data: error.response?.data,
        ok: false, // error
      };
    }
  }
}
