class noteForm extends HTMLElement {
    _shadowRoot = null;

    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
    }

    _emptyContent() {
        this._shadowRoot.innerHTML = '';
    }

    connectedCallback() {
        this.render();
        this._shadowRoot.querySelector('#form').addEventListener('submit', this._handleSubmit.bind(this));
    }

    _handleSubmit(event) {
        event.preventDefault();

        const title = this._shadowRoot.querySelector('#title').value;
        const description = this._shadowRoot.querySelector('#description').value;

        const newNote = {
            id: `notes-${Math.random().toString(36).substring(2, 9)}`,
            title: title,
            body: description,
            createdAt: new Date().toISOString(),
            archived: false,
        };

        this.dispatchEvent(new CustomEvent('note-added', { detail: newNote }));

        this._shadowRoot.querySelector('#title').value = '';
        this._shadowRoot.querySelector('#description').value = '';
    }

    render() {
        this._emptyContent();

        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', 'src/styles/style.css');

        this._shadowRoot.appendChild(link);

        this._shadowRoot.innerHTML += `
        <div class="note-wrapper">
            <div class="note-form-wrapper">
                <h1>Menambahkan Catatan Baru</h1>
                <form action="" class="note-form" id="note-form">
                    <div class="form-group">
                        <div class="form-title">
                            <label for="note-title"></label>
                            <input type="text" id="note-title" name="note-title" placeholder="Judul Catatan" required>
                        </div>
                        <div class="form-description">
                            <label for="note-description"></label>
                            <textarea name="note-description" id="note-description" cols="30" rows="10" placeholder="Deskripsi Catatan..." required></textarea>
                        </div>
                        <button type="submit" name="submit" class="btn-submit">Simpan Catatanku</button>
                    </div>
                </form>
            </div>
        </div>
        `;
    }
}

customElements.define('note-form', noteForm);
