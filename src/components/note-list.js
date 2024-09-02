class notesData extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _note = {
    id: null,
    title: null,
    body: null,
    createdAt: null,
  };

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
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
        
        .grid-container .card-note {
            background-color: white;
            opacity: 0.8;
            border: none;
            border-radius: 10px;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
            width: 90%;
            height: 90%;
            padding: 1em;
        }

        .card-note .date {
          font-size: 0.70em;
          margin-top: -9px;
        }
        
        .card-note .desc {
              padding-top: 1em;
              font-size: 0.90em;
          }

        .card-note .note-delete {
            padding-top: 1em;
        }

        .note-delete .button-delete {
            background-color: red;
            color: white;
            border: none;
            border-radius: 5px;
            padding: 8px;
            cursor: pointer;
        }
    `;
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `

          <div class="grid-wrapper">
            <h1 class="all-notes">All Notes</h1><hr>
            <div class="grid-container">
            ${this._note
              .map(
                (note) => `
                <div class="card-note">
                    <h4>${note.title}</h4>
                    <p class="date">${new Date(note.createdAt).toLocaleString()}</p>
                    <p class="desc">${note.body}</p>

                    <div class="note-delete">
                        <button class="button-delete" type="button" data-id="${note.id}" >Delete</button>
                    </div>
                </div>
                `,
              )
              .join("")}
            </div>
        </div>
    `;
  }
}

customElements.define("note-list", notesData);
