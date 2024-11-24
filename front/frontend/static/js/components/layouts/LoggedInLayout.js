import UserStateHelper from "../../helper/state/UserStateHelper.js";
import AuthStateHelper from "../../helper/state/AuthStateHelper.js";
import { navigateTo } from "../../index.js";

window.logout = () => {
  AuthStateHelper.deleteAuth();
  UserStateHelper.deleteUser();
  navigateTo("/login");
};

export default class LoggedInLayout {
  constructor(selector) {
    // const userData = UserStateHelper.getUser();
    this.container = document.getElementById(selector);
    // this.userName = userData.name;
    this.userName = "User";
    this.render();
  }

  render() {
    const layoutHtml = `
        <nav id="main-nav" class="sidebar-principal">
            <a href="/home" class="sidebar-link" onclick="route(event)">Home</a>
            <a href="/animals" class="sidebar-link" onclick="route(event)">Gestion Animales</a>
            <a href="/checkpoints" class="sidebar-link" onclick="route(event)">Checkpoints</a>
            <a href="/logout" class="sidebar-link" onclick="route(event)">Cerrar sesion</a>
        </nav>
        `;
    this.container.innerHTML = layoutHtml;
  }
}
