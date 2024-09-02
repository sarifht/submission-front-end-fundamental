// header-bar.js
class headerBar extends HTMLElement {
  _shadowRoot = null;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", "src/style/style.css"); // Pastikan path ini benar setelah Webpack build

    this._shadowRoot.appendChild(link);
    this._shadowRoot.innerHTML += `
      <nav>    
        <div class="title-app">
          <h1>Aplikasi Pencatatan Online</h1>
        </div>
      </nav>
    `;
  }
}

customElements.define("header-bar", headerBar);
