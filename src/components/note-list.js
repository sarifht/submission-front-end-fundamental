import notesData from "../data/data.js";

class NoteList extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._style = document.createElement('style');
        this._note = {
            id: null,
            title: null,
            body: null,
            createdAt: null,
        };
    }

    _emptyContent() {
        this._shadowRoot.innerHTML = '';
    }

    set note(value) {
        this._note = value;
        this.render();
    }

    get note() {
        return this._note;
    }

    _updateStyle() {
        this._style.textContent = `
        :host {
          display: block;
        }

        .grid-wrapper {
          padding-top: 5%;
          display: grid;
        }

        .grid-wrapper .all-notes {
            padding-top: 1em;
            text-align: center;
        }

        hr {
            width: 20%;
            border: 1.8px solid #DE9D7E;
        }
      
        .grid-wrapper .grid-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            align-items: center;
            justify-items: center;
            gap: 2em;
            padding: 2em;
        }
        
        .grid-wrapper .grid-container .card {
            background-color: white;
            opacity: 0.8;
            border: none;
            border-radius: 10px;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
            width: 90%;
            height: 90%;
            padding: 1em;
        }

        .grid-wrapper .grid-container .card .date {
          font-size: 0.70em;
          margin-top: -9px;
        }
        
        .grid-wrapper .grid-container .card .desc {
              padding-top: 1em;
              font-size: 0.90em;
          }
        `;
        this._shadowRoot.appendChild(this._style);
    }

    render() {
        this._emptyContent();
        this._updateStyle();

        const wrapper = document.createElement('div');
        wrapper.className = 'grid-wrapper';
        wrapper.innerHTML = `
            <h1 class="all-notes">All Notes</h1>
            <hr>
            <div class="grid-container">
            ${notesData.map(note => `
                <div class="card">
                    <h4>${note.title}</h4>
                    <p class="date">${new Date(note.createdAt).toLocaleString()}</p>
                    <p class="desc">${note.body}</p>
                </div>
            `).join('')}
            </div>
        `;
        this._shadowRoot.appendChild(wrapper);
    }
}

customElements.define('note-list', NoteList);
