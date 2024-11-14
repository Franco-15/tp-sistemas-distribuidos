
import { postCredentials } from "../api/apiLoginHelper.js";



export function loadLoginView() {
    const app = document.getElementById('app');
    app.innerHTML = `
    <body>
        <form id="login-form" class="login-container" onsubmit="validateLogin(event)">
            <h2 class="login-label">Inicio de sesión</h2>
            <div id="userField" class="input-field">
                <input type="text" id="username" required />
                <label for="username">Usuario</label>
            </div>
            <div id="PassField" class="input-field">
                <input type="password" id="password" required />
                <label for="password">Contraseña</label>
            </div>
            <button type="submit" class="login-btn">Iniciar sesión</button>
        </form>
    </body>
    `;

    document.getElementById("login-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        postCredentials(username, password).then(response  => {
            if (response == 200) {
                window.location.hash = '#/animals';
            } else {
                const userField = document.getElementById("userField");
                const passField = document.getElementById("PassField");
                userField.classList.add("input-error", "shake");
                passField.classList.add("input-error", "shake");
                setTimeout(() => {
                    userField.classList.remove("input-error", "shake");
                    passField.classList.remove("input-error","shake");
                  }, 500); 
            } 
        });
    });
}
