class noteForm extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  _updateStyle() {
    this._style.textContent = `
    :host {
      display: block;
    }

    .note-wrapper {
      display: flex;
      width: 100%;
      align-items: center;
      padding-top: 10%;
      flex-direction: column;
    }

    .note-form-wrapper {
      background-color: white;
      opacity: 0.8;
      border: none;
      border-radius: 10px;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      justify-content: center;
      padding: 2em;
      width: 100%;
      max-width: 400px;
      margin: auto;
    }

    .form-title,
    .form-description {
      position: relative;
    }

    .error-message {
      color: #ef5a6f;
      font-size: 0.75rem;
      margin-top: 0;
      display: none; /* Tersembunyi secara default */
    }

    .char-count {
      display: block;
      text-align: right;
      font-size: 0.7rem;
      color: #666;
      margin-bottom: 1em;
    }

    #note-title,
    #note-description {
      padding-right: 3em;
    }

    .note-form-wrapper h1 {
      text-align: center;
      margin-bottom: 1em;
      font-weight: 700;
      font-size: 24px;
      width: 100%;
    }

    .note-form {
      display: grid;
      grid-template-columns: 1fr;
      grid-gap: 1em;
      width: 100%;
    }

    .note-form .form-title {
      width: 100%;
      margin-bottom: auto;
    }

    .note-form .form-title input {
      font-size: 1rem;
      width: 100%;
      margin-bottom: 10px;
      padding: 10px;
      box-sizing: border-box;
    }

    .note-form .form-description {
      width: 100%;
    }

    .note-form .form-description textarea {
      font-size: 1rem;
      padding: 6px;
      width: 100%;
      height: 9rem;
      box-sizing: border-box;
    }

    .note-form .form-group {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .form-description {
      margin-bottom: 1em;
    }

    .note-form .form-group button {
      color: black;
      font-weight: 600;
      font-size: 1rem;
      line-height: 1.5rem;
      background-color: #ffb200;
      padding-top: 0.4rem;
      padding-bottom: 0.4rem;
      padding-left: 2rem;
      padding-right: 2rem;
      border-radius: 5px;
      transition: all 0.2s ease-in-out;
      border: white;
      width: 100%;
      cursor: pointer;
    }

    .note-form .form-group button:hover {
      opacity: 0.8;
    }
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  connectedCallback() {
    this.render();
    this._shadowRoot
      .querySelector("#note-form")
      .addEventListener("submit", this._handleSubmit.bind(this));

    // Tambahkan event listener untuk update jumlah karakter yang tersisa
    this._shadowRoot
      .querySelector("#note-title")
      .addEventListener("input", this._updateTitleCharCount.bind(this));
    this._shadowRoot
      .querySelector("#note-description")
      .addEventListener("input", this._updateDescriptionCharCount.bind(this));

    // Tambahkan event listener untuk validasi
    this._shadowRoot
      .querySelector("#note-title")
      .addEventListener("input", this._validateTitle.bind(this));
    this._shadowRoot
      .querySelector("#note-description")
      .addEventListener("input", this._validateDescription.bind(this));
  }

  _handleSubmit(event) {
    event.preventDefault();

    const titleInput = this._shadowRoot.querySelector("#note-title");
    const descriptionInput =
      this._shadowRoot.querySelector("#note-description");
    const titleError = this._shadowRoot.querySelector("#title-error");
    const descriptionError =
      this._shadowRoot.querySelector("#description-error");

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();

    // Batasan karakter minimal
    const minTitleLength = 5;
    const minDescriptionLength = 15;

    // Reset pesan error
    titleError.textContent = "";
    descriptionError.textContent = "";

    let hasError = false;

    // Validasi jumlah karakter minimal
    if (title.length < minTitleLength) {
      titleError.textContent = `Judul catatan harus memiliki minimal ${minTitleLength} karakter.`;
      hasError = true;
    }

    if (description.length < minDescriptionLength) {
      descriptionError.textContent = `Deskripsi catatan harus memiliki minimal ${minDescriptionLength} karakter.`;
      hasError = true;
    }

    if (hasError) {
      return; // Tidak mengirim form jika ada error
    }

    const newNote = {
      id: `notes-${Math.random().toString(36).substring(2, 9)}`,
      title: title,
      body: description,
      createdAt: new Date().toISOString(),
      archived: false,
    };

    this.dispatchEvent(new CustomEvent("note-added", { detail: newNote }));

    titleInput.value = "";
    descriptionInput.value = "";
  }

  _updateTitleCharCount() {
    const titleInput = this._shadowRoot.querySelector("#note-title");
    const charCount = this._shadowRoot.querySelector("#title-char-count");
    charCount.textContent = `${titleInput.value.length}/50`;
  }

  _updateDescriptionCharCount() {
    const descriptionInput =
      this._shadowRoot.querySelector("#note-description");
    const charCount = this._shadowRoot.querySelector("#description-char-count");
    charCount.textContent = `${descriptionInput.value.length}/300`;
  }

  _validateTitle() {
    const titleInput = this._shadowRoot.querySelector("#note-title");
    const titleError = this._shadowRoot.querySelector("#title-error");

    if (titleInput.value.length < 5) {
      titleError.textContent = `Judul catatan harus memiliki minimal 5 karakter.`;
      titleError.style.display = "block";
    } else {
      titleError.textContent = "";
      titleError.style.display = "none";
    }
  }

  _validateDescription() {
    const descriptionInput =
      this._shadowRoot.querySelector("#note-description");
    const descriptionError =
      this._shadowRoot.querySelector("#description-error");

    if (descriptionInput.value.length < 15) {
      descriptionError.textContent = `Deskripsi catatan harus memiliki minimal 15 karakter.`;
      descriptionError.style.display = "block";
    } else {
      descriptionError.textContent = "";
      descriptionError.style.display = "none";
    }
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
    <div class="note-wrapper">
      <div class="note-form-wrapper">
        <h1>Menambahkan Catatan Baru</h1>
        <form action="" class="note-form" id="note-form">
          <div class="form-group">
            <div class="form-title">
              <label for="note-title"></label>
              <input type="text" id="note-title" name="note-title" placeholder="Judul Catatan" maxlength="50" required>
              <div id="title-error" class="error-message"></div>
              <small id="title-char-count" class="char-count">0/50</small>
            </div>
            <div class="form-description">
              <label for="note-description"></label>
              <textarea name="note-description" id="note-description" cols="30" rows="10" placeholder="Deskripsi Catatan..." maxlength="300" required></textarea>
              <div id="description-error" class="error-message"></div>
              <small id="description-char-count" class="char-count">0/300</small>
            </div>
            <button type="submit" name="submit" class="btn-submit">Simpan Catatanku</button>
          </div>
        </form>
      </div>
    </div>
    `;
  }
}

customElements.define("note-form", noteForm);
