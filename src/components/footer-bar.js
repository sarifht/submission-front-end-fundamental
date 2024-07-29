class footerBar extends HTMLElement {
   _shadowRoot = null;
   _style = null;
   
   constructor() {
       super();
       
       this._shadowRoot = this.attachShadow({ mode: 'open' });
       this._style = document.createElement('style');
   }

   _updateStyle() {
       this._style.textContent = `
           :host {
               display: block;
           }
           
           footer {
                background-color: #D1F4FA;
                height: 50px;
                text-align: center;
                bottom: 0;
                margin-top: 72px;
                color: black;
                padding: 15px;
                font-size: 16px;
           }
       `;
   }

   emptyContent() {
       this._shadowRoot.innerHTML = '';
   }

   connectedCallback() {
       this.render();
   }

   render() {
       this.emptyContent();
       this._updateStyle();

       this._shadowRoot.appendChild(this._style);
       this._shadowRoot.innerHTML += `
       <footer>
            <p>&copy; 2024 - Aplikasi Pencatatan Online oleh Sarif Hidayatullah</p>
       </footer>
       `
   }
}

customElements.define('footer-bar', footerBar);