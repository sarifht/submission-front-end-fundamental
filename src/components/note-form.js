class noteForm extends HTMLElement {
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
            
            .wrapper {
                display: flex;
                align-items: center;
                flex-direction: column;
                padding-top: 10%;
            }

            .wrapper .form-wrapper {
                background-color: white;
                opacity: 0.8;
                border: none;
                border-radius: 10px;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                justify-content: center;
                padding-left: 2em;
                padding-right: 1em;
                padding-bottom: 3em;
                width: 600px;
                height: 350px;
            }
            
            .form-wrapper h1 {
                text-align: center;
                margin-bottom: 1em;
            }

            .form-title input {
                margin-bottom: 10px;
                width: 80%;
                padding: 10px;
            }

            .form-desc textarea {
                padding: 10px;
                width: 90%;
            }
            
            .form-group button {
                color: black;
                background-color: #FFB200;
                padding: 1rem;
                font-size: 1rem;
                border-radius: 6px;
                border: none;
                width: 90%;
                cursor: pointer;
            }

        `;
    }

    _emptyContent() {
        this._shadowRoot.innerHTML = '';
    }

    connectedCallback() {
        this.render();
        this.shadowRoot.querySelector('#form').addEventListener('submit', this._handleSubmit.blind(this));
    }

    _handleSubmit (event) {
        event.preventDefault ();

        const title = this._shadowRoot.querySelector('#title').value;
        const description = this._shadowRoot.querySelector('#description').value;

        const newNote = {
            id: `notes-$(Math.random().toString(36).substring(2, 9))`,
            title: title,
            body: description,
            createdAt: new Date().toISOString(),
            archived: false,
        };

        this.dispatchEvent(new customElements('note-added', {detail: newNote}));
        this._shadowRoot.querySelector('#title').value = '';
        this._shadowRoot.querySelector('#description').value = '';
    }


    render() {
        this._emptyContent();
        this._updateStyle();

        this._shadowRoot.appendChild(this._style);
        this._shadowRoot.innerHTML += `
        <div class="wrapper">
            <div class="form-wrapper">
                <h1>Tambah Catatan Baru</h1>
                <form action="" class="form" id="form">
                <div class="form-group">
                    <div class="form-title">
                        <label for="title"></label>
                        <input type="text" id="title" name="title" placeholder="Judul Catatan" required>
                    </div>

                    <div class="form-desc">
                        <label for="description"></label>
                        <textarea name="description" id="description" cols="30" rows="10" placeholder="Silahkan tulis catatan disini..." required>
                        </textarea>
                    </div>

                    <button type="submit" name="submit" class="btn-submit">Tambah Catatan</button>
                </div>
                </form>
            </div>
        </div>
        `;
    }
}

customElements.define('note-form', noteForm);