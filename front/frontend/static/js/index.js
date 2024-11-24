import LoginPage from "./pages/LoginPage.js";
import _404Page from "./pages/404Page.js";
import HomePage from "./pages/HomePage.js";
import AuthStateHelper from "./helper/state/AuthStateHelper.js";
import AuthLayout from "./components/layouts/AuthLayout.js";
import LoggedInLayout from "./components/layouts/LoggedInLayout.js";
import "./helper/api/AxiosRequestInterceptor.js";
import AnimalPage from "./pages/AnimalPage.js";
import CheckpointPage from "./pages/CheckpointPage.js";

export const navigateTo = (url) => {
  history.pushState({}, "", url);
  loadPage();
};

const route = (event) => {
  event = event || window.event;
  event.preventDefault();
  const isAuth = !!AuthStateHelper.getAccessToken();
  if (!isAuth && event.target.href !== "/login") {
    navigateTo("/login");
  } else {
    navigateTo(event.target.href);
  }
};

function loadLayout() {
  const isAuth = !!AuthStateHelper.getAccessToken();
  if (isAuth) {
    new LoggedInLayout("container");
    return;
  }
  new AuthLayout("container");
}

function loadPage() {
  loadLayout();
  const isAuth = !!AuthStateHelper.getAccessToken();
  if (!isAuth) {
    history.pushState({}, "", "/login");
    return new LoginPage("layout-content");
  }
  if (location.pathname === "/home") {
    new HomePage("layout-content");
  } else if (location.pathname === "/animals") {
    new AnimalPage("layout-content");
  } else if (location.pathname === "/checkpoints") {
    new CheckpointPage("layout-content");
  } else if (location.pathname === "/logout"){
    localStorage.removeItem("auth")
    window.location.reload()
  } else {
    new _404Page("layout-content");
  } 
}

window.route = route;
window.onpopstate = loadPage;

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });
  loadPage();
});
