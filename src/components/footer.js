class footer extends HTMLElement {
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
                width: 100%;
                background-color: #005792;
                height: 50px;
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
           <div class="title-app">
               <h1 style="color: white;">Aplikasi Pencatatan Online</h1>
           </div>
       </footer>
       `
   }
}

customElements.define('footer', footer);