export default class HomePage {
  constructor(selector) {
    console.log(selector);
    this.container = document.getElementById(selector);
    this.loadHome();
  }

  async loadHome() {
    this.render();
  }

  render() {
    let homeHtml = `
       <div class="header">
        <h3>Trabajo práctico para sistemas distribuidos</h3>
        <h3>Grupo 31</h3>
        <h3>Integrantes:</h3>
      </div>
      <div class ="integrante-container">
        <div class="integrante">
          <h4>Trinitario, Bruno</h4>
          <img src="static/img/bruno.jpeg" alt="Foto de Bruno" width="100">
        </div>
        <div class="integrante">
          <h4>Cardelli, Ramiro</h4>
          <img src="static/img/rama.jpeg" alt="Foto de Ramiro" width="100">
        </div>
        <div class="integrante">
          <h4>Frasca, Josefina</h4>
          <img src="static/img/jose.jpeg" alt="Foto de Josefina" width="100">
        </div>
        <div class="integrante">
          <h4>Olave, Juan</h4>
          <img src="static/img/juan.jpeg" alt="Foto de Juan" width="100">
        </div>
      </div>
    `;
    this.container.innerHTML = homeHtml;
  }
}
