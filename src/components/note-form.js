class noteForm extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
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

    const link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", "src/style/style.css");

    this._shadowRoot.appendChild(link);

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
