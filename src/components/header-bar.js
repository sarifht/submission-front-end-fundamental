class headerBar extends HTMLElement {
  _shadowRoot = null;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._emptyContent();

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
