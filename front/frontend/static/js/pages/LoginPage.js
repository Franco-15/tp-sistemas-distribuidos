import { navigateTo } from "../index.js";
import AuthAPIHelper from "../helper/api/AuthAPIHelper.js";
import UserStateHelper from "../helper/state/UserStateHelper.js";
import AuthStateHelper from "../helper/state/AuthStateHelper.js";

export default class LoginPage {
  constructor(selector) {
    this.container = document.getElementById(selector);
    this.loadForm();
  }

  async loadForm() {
    this.render();
    this.addListener();
  }

  async handleSubmit(event) {
    console.log("Iniciando proceso de inicio de sesión...");
    try {
      event.preventDefault();
      const username = event.target.elements.username.value.trim();
      const password = event.target.elements.password.value.trim();

      console.log("Datos enviados:", { username, password });
      
      //enviar solicitud a la API - retorna tokens
      const userData = await AuthAPIHelper.login({ username, password }); 

      //debug
      console.log("Datos de usuario:", userData);

      const { accessToken, refreshToken, ...rest } = userData;
      UserStateHelper.setUser(rest);
      //almacenar access token
      AuthStateHelper.setAuth({ accessToken, refreshToken }); 
      window.location.href = "../home";
    } catch (error) {
      console.log(error);
      alert("Usuario o contraseña incorrectos");
    }
  }

  addListener() {
    window.addEventListener("submit", this.handleSubmit);
  }

  render() {
    const formHtml = `
            <form id="login-form" class="login-form-container">
                <h2 class="login-form-title">Bienvenido nuevamente!</h2>
                <div class="input-container">
                    <input type="text" id="username" name="username" class="input-field" placeholder="Introduce tu usuario" required>
                </div>
                <div class="input-container">
                    <input type="password" id="password" name="password" class="input-field" placeholder="Introduce tu contraseña" required>  
                </div>
                <button type="submit" form="login-form" class="form-submit-button">Iniciar sesión</button>
            </form>
        `;
    this.container.innerHTML = formHtml;
  }
}
