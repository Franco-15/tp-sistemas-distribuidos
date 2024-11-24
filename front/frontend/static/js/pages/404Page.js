export default class _404Page {
  constructor(selector) {
    this.container = document.getElementById(selector);
    this.load404();
  }

  async load404() {
    this.render();
  }

  render() {
    const formHtml = `
        <div class="full-width-text">
            <h1>404 Not Found</h1>
            <p>Oh no! It looks like the page you're trying to get to is missing!</p>
        </div>
        `;
    this.container.innerHTML = formHtml;
  }
}
