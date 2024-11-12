
import { postCredentials } from "../api/apiLoginHelper.js";



export function loadLoginView() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <form id="login-form" class="login-container">
            <h2 class="login-label">Iniciar Sesión</h2>
            <div class="input-field">
                <input type="text" id="username" required />
                <label for="username">Username</label>
            </div>
            <div class="input-field">
                <input type="password" id="password" required />
                <label for="password">Password</label>
            </div>
            <button type="submit" class="login-btn">LogIn</button>
        </form>
    `;

    document.getElementById("login-form").addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("Formulario de login enviado");

        
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        console.log(username, password);

        postCredentials(username, password).then(response  => {
            console.log(response);
            if (response == 200) {
                window.location.hash = '#/animals';
            } else {
                //todo: ver como poner el acceso invalido (posiblemente cambiando los campos a rojo)
            }
        });

    
    });
}


//* todo lo siguiente es de lo de martin:
//todo ver bien que sirve y que no 

/*
import { navigateTo } from '../index.js';
import AuthAPIHelper from '../helper/api/AuthAPIHelper.js';
import { validateLogin } from '../helper/validations/authValidations.js';
import UserStateHelper from '../helper/state/UserStateHelper.js';
import AuthStateHelper from '../helper/state/AuthStateHelper.js';

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
        try {
            event.preventDefault();
            const id = event.target.elements.id.value.trim();
            const password = event.target.elements.password.value.trim();
            validateLogin({ id, password })
            const userData = await AuthAPIHelper.login({ id, password });
            const { accessToken, refreshToken, ...rest } = userData;
            UserStateHelper.setUser(rest);
            AuthStateHelper.setAuth({ accessToken, refreshToken })
            navigateTo('/');
            window.removeEventListener('submit', this.handleSubmit)
        } catch (e) {
            alert('Usuario o contraseña incorrectos');
        }
    };

    addListener() {
        window.addEventListener('submit', this.handleSubmit);
    }

    render() {
        const formHtml = `
            <form id="login-form" class="login-form-container">
                <h2 class="login-form-title">Iniciar sesión</h2>
                <div class="input-container">
                    <label for="id" class="input-label">ID:</label>
                    <input type="text" id="id" name="id" class="input-field" required>
                </div>
                <div class="input-container">
                    <label for="password" class="input-label">Contraseña:</label>
                    <input type="password" id="password" name="password" class="input-field" required>
                </div>
                <button type="submit" form="login-form" class="form-submit-button">Iniciar sesión</button>
            </form>
        `;
        this.container.innerHTML = formHtml;
    }
}
    */