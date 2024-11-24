import { CONSTANTS } from "../../constants/constants.js";
import AuthStateHelper from "../state/AuthStateHelper.js";

axios.interceptors.request.use(
  async function (config) {
    let accessToken = AuthStateHelper.getAccessToken();
    let refreshToken = AuthStateHelper.getRefreshToken();
    const url = CONSTANTS.IP_REFRESH;

    // Si el accessToken ha expirado, intenta obtener uno nuevo usando el refreshToken
    if (config.url == url) {
      return config;
    }
    if (!accessToken) return config;
    if (isTokenExpired(accessToken) && refreshToken) {
      console.log("Expirado");
      try {
        const headers = {
          Authorization: `Bearer ${refreshToken}`,
          "Content-Type": "application/json",
        };
        // Hacer una solicitud de actualización de token
        const response = await axios.post(url, "", { headers });
        // Guardar el nuevo accessToken en AuthStateHelper
        refreshToken = response.data.refreshToken;
        accessToken = response.data.accessToken;
        AuthStateHelper.setAuth({ accessToken, refreshToken });
        return config;
      } catch (error) {
        console.error("Error al actualizar el token:", error);
        // Manejar el error, como redirigir al usuario a la página de inicio de sesión
        return Promise.reject(error);
      }

      // Establecer el encabezado de autorización con el token actualizado
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

function isTokenExpired(token) {
  if (!token) return true;
  try {
    // Decodificar el token para obtener su payload
    const payload = JSON.parse(atob(token.split(".")[1])); // Segmento medio del token es el payload
    const now = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
    return payload.exp < now; // Verifica si el tiempo actual es mayor que el tiempo de expiración
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return true; // Si ocurre un error, asume que el token ha expirado
  }
}
