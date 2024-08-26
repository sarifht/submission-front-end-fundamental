import notesData from "../data/data.js";

class noteList extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
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

  render() {
    this._emptyContent();

    // Tambahkan link ke file CSS
    const link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", "src/style/style.css");
    this._shadowRoot.appendChild(link);

    // Bungkus konten dalam div dengan class 'note-list'
    const wrapper = document.createElement("div");
    wrapper.className = "note-list";
    wrapper.innerHTML = `
        <div class="grid-wrapper">
            <h1 class="all-notes">All Notes</h1>
            <hr>
            <div class="grid-container">
            ${notesData
              .map((note) => {
                const date = new Date(note.createdAt);
                const formattedTime = date.toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                });

                const formattedDate = date.toLocaleDateString("id-ID", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                });

                return `
                    <div class="card">
                        <h4>${note.title}</h4>
                        <p class="date">${formattedTime}, - ${formattedDate} </p>
                        <p class="desc">${note.body}</p>
                    </div>
                `;
              })
              .join("")}
            </div>
        </div>
        `;
    this._shadowRoot.appendChild(wrapper);
  }
}

customElements.define("note-list", noteList);
