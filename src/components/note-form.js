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
                padding: 10%;
            }

            .wrapper .form-wrapper {
                background-color: white;
                justify-content: center;
                padding: 2em;
                width: 500px;
                height: 250px;
                border: none;
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

        `;
    }

    _emptyContent() {
        this._shadowRoot.innerHTML = '';
    }

    connectedCallback() {
        this.render();
        this.shadowRoot.querySelector('#form').addEventListener('submit', this._handleSubmit.blind(this));
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