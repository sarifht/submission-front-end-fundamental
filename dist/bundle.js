(() => {
  var e = {
      842: () => {
        class e extends HTMLElement {
          _shadowRoot = null;
          constructor() {
            super(), (this._shadowRoot = this.attachShadow({ mode: "open" }));
          }
          emptyContent() {
            this._shadowRoot.innerHTML = "";
          }
          connectedCallback() {
            this.render();
          }
          render() {
            this.emptyContent();
            const e = document.createElement("link");
            e.setAttribute("rel", "stylesheet"),
              e.setAttribute("href", "src/style/style.css"),
              this._shadowRoot.appendChild(e),
              (this._shadowRoot.innerHTML +=
                "\n       <footer-bar>\n            <p>&copy; 2024 - Aplikasi Pencatatan Online oleh Sarif Hidayatullah</p>\n       </footer-bar>\n       ");
          }
        }
        customElements.define("footer-bar", e);
      },
      828: () => {
        class e extends HTMLElement {
          _shadowRoot = null;
          constructor() {
            super(), (this._shadowRoot = this.attachShadow({ mode: "open" }));
          }
          _emptyContent() {
            this._shadowRoot.innerHTML = "";
          }
          connectedCallback() {
            this.render();
          }
          render() {
            this._emptyContent();
            const e = document.createElement("link");
            e.setAttribute("rel", "stylesheet"),
              e.setAttribute("href", "src/style/style.css"),
              this._shadowRoot.appendChild(e),
              (this._shadowRoot.innerHTML +=
                '\n        <nav> \n            <div class="title-app">\n                <h1>Aplikasi Pencatatan Online</h1>\n            </div>\n        </nav>\n        ');
          }
        }
        customElements.define("header-bar", e);
      },
      236: () => {
        class e extends HTMLElement {
          constructor() {
            super(), (this._shadowRoot = this.attachShadow({ mode: "open" }));
          }
          _emptyContent() {
            this._shadowRoot.innerHTML = "";
          }
          connectedCallback() {
            this.render(),
              this._shadowRoot
                .querySelector("#note-form")
                .addEventListener("submit", this._handleSubmit.bind(this)),
              this._shadowRoot
                .querySelector("#note-title")
                .addEventListener(
                  "input",
                  this._updateTitleCharCount.bind(this),
                ),
              this._shadowRoot
                .querySelector("#note-description")
                .addEventListener(
                  "input",
                  this._updateDescriptionCharCount.bind(this),
                ),
              this._shadowRoot
                .querySelector("#note-title")
                .addEventListener("input", this._validateTitle.bind(this)),
              this._shadowRoot
                .querySelector("#note-description")
                .addEventListener(
                  "input",
                  this._validateDescription.bind(this),
                );
          }
          _handleSubmit(e) {
            e.preventDefault();
            const t = this._shadowRoot.querySelector("#note-title"),
              o = this._shadowRoot.querySelector("#note-description"),
              n = this._shadowRoot.querySelector("#title-error"),
              i = this._shadowRoot.querySelector("#description-error"),
              a = t.value.trim(),
              s = o.value.trim();
            (n.textContent = ""), (i.textContent = "");
            let r = !1;
            if (
              (a.length < 5 &&
                ((n.textContent =
                  "Judul catatan harus memiliki minimal 5 karakter."),
                (r = !0)),
              s.length < 15 &&
                ((i.textContent =
                  "Deskripsi catatan harus memiliki minimal 15 karakter."),
                (r = !0)),
              r)
            )
              return;
            const d = {
              id: `notes-${Math.random().toString(36).substring(2, 9)}`,
              title: a,
              body: s,
              createdAt: new Date().toISOString(),
              archived: !1,
            };
            this.dispatchEvent(new CustomEvent("note-added", { detail: d })),
              (t.value = ""),
              (o.value = "");
          }
          _updateTitleCharCount() {
            const e = this._shadowRoot.querySelector("#note-title");
            this._shadowRoot.querySelector("#title-char-count").textContent =
              `${e.value.length}/50`;
          }
          _updateDescriptionCharCount() {
            const e = this._shadowRoot.querySelector("#note-description");
            this._shadowRoot.querySelector(
              "#description-char-count",
            ).textContent = `${e.value.length}/300`;
          }
          _validateTitle() {
            const e = this._shadowRoot.querySelector("#note-title"),
              t = this._shadowRoot.querySelector("#title-error");
            e.value.length < 5
              ? ((t.textContent =
                  "Judul catatan harus memiliki minimal 5 karakter."),
                (t.style.display = "block"))
              : ((t.textContent = ""), (t.style.display = "none"));
          }
          _validateDescription() {
            const e = this._shadowRoot.querySelector("#note-description"),
              t = this._shadowRoot.querySelector("#description-error");
            e.value.length < 15
              ? ((t.textContent =
                  "Deskripsi catatan harus memiliki minimal 15 karakter."),
                (t.style.display = "block"))
              : ((t.textContent = ""), (t.style.display = "none"));
          }
          render() {
            this._emptyContent();
            const e = document.createElement("link");
            e.setAttribute("rel", "stylesheet"),
              e.setAttribute("href", "src/style/style.css"),
              this._shadowRoot.appendChild(e),
              (this._shadowRoot.innerHTML +=
                '\n        <div class="note-wrapper">\n            <div class="note-form-wrapper">\n                <h1>Menambahkan Catatan Baru</h1>\n                <form action="" class="note-form" id="note-form">\n                    <div class="form-group">\n                        <div class="form-title">\n                            <label for="note-title"></label>\n                            <input type="text" id="note-title" name="note-title" placeholder="Judul Catatan" maxlength="50" required>\n                            <div id="title-error" class="error-message"></div>\n                            <small id="title-char-count" class="char-count">0/50</small>\n                        </div>\n                        <div class="form-description">\n                            <label for="note-description"></label>\n                            <textarea name="note-description" id="note-description" cols="30" rows="10" placeholder="Deskripsi Catatan..." maxlength="300" required></textarea>\n                            <div id="description-error" class="error-message"></div>\n                            <small id="description-char-count" class="char-count">0/300</small>\n                        </div>\n                        <button type="submit" name="submit" class="btn-submit">Simpan Catatanku</button>\n                    </div>\n                </form>\n            </div>\n        </div>\n        ');
          }
        }
        customElements.define("note-form", e);
      },
    },
    t = {};
  function o(n) {
    var i = t[n];
    if (void 0 !== i) return i.exports;
    var a = (t[n] = { exports: {} });
    return e[n](a, a.exports, o), a.exports;
  }
  (() => {
    "use strict";
    o(828), o(236);
    const e = [
        {
          id: "notes-jT-jjsyz61J8XKiI",
          title: "Welcome to Notes, Dimas!",
          body: "Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.",
          createdAt: "2022-07-28T10:03:12.594Z",
          archived: !1,
        },
        {
          id: "notes-aB-cdefg12345",
          title: "Meeting Agenda",
          body: "Discuss project updates and assign tasks for the upcoming week.",
          createdAt: "2022-08-05T15:30:00.000Z",
          archived: !1,
        },
        {
          id: "notes-XyZ-789012345",
          title: "Shopping List",
          body: "Milk, eggs, bread, fruits, and vegetables.",
          createdAt: "2022-08-10T08:45:23.120Z",
          archived: !1,
        },
        {
          id: "notes-1a-2b3c4d5e6f",
          title: "Personal Goals",
          body: "Read two books per month, exercise three times a week, learn a new language.",
          createdAt: "2022-08-15T18:12:55.789Z",
          archived: !1,
        },
        {
          id: "notes-LMN-456789",
          title: "Recipe: Spaghetti Bolognese",
          body: "Ingredients: ground beef, tomatoes, onions, garlic, pasta. Steps:...",
          createdAt: "2022-08-20T12:30:40.200Z",
          archived: !1,
        },
        {
          id: "notes-QwErTyUiOp",
          title: "Workout Routine",
          body: "Monday: Cardio, Tuesday: Upper body, Wednesday: Rest, Thursday: Lower body, Friday: Cardio.",
          createdAt: "2022-08-25T09:15:17.890Z",
          archived: !1,
        },
        {
          id: "notes-abcdef-987654",
          title: "Book Recommendations",
          body: "1. 'The Alchemist' by Paulo Coelho\n2. '1984' by George Orwell\n3. 'To Kill a Mockingbird' by Harper Lee",
          createdAt: "2022-09-01T14:20:05.321Z",
          archived: !1,
        },
        {
          id: "notes-zyxwv-54321",
          title: "Daily Reflections",
          body: "Write down three positive things that happened today and one thing to improve tomorrow.",
          createdAt: "2022-09-07T20:40:30.150Z",
          archived: !1,
        },
        {
          id: "notes-poiuyt-987654",
          title: "Travel Bucket List",
          body: "1. Paris, France\n2. Kyoto, Japan\n3. Santorini, Greece\n4. New York City, USA",
          createdAt: "2022-09-15T11:55:44.678Z",
          archived: !1,
        },
        {
          id: "notes-asdfgh-123456",
          title: "Coding Projects",
          body: "1. Build a personal website\n2. Create a mobile app\n3. Contribute to an open-source project",
          createdAt: "2022-09-20T17:10:12.987Z",
          archived: !1,
        },
        {
          id: "notes-5678-abcd-efgh",
          title: "Project Deadline",
          body: "Complete project tasks by the deadline on October 1st.",
          createdAt: "2022-09-28T14:00:00.000Z",
          archived: !1,
        },
        {
          id: "notes-9876-wxyz-1234",
          title: "Health Checkup",
          body: "Schedule a routine health checkup with the doctor.",
          createdAt: "2022-10-05T09:30:45.600Z",
          archived: !1,
        },
        {
          id: "notes-qwerty-8765-4321",
          title: "Financial Goals",
          body: "1. Create a monthly budget\n2. Save 20% of income\n3. Invest in a retirement fund.",
          createdAt: "2022-10-12T12:15:30.890Z",
          archived: !1,
        },
        {
          id: "notes-98765-54321-12345",
          title: "Holiday Plans",
          body: "Research and plan for the upcoming holiday destination.",
          createdAt: "2022-10-20T16:45:00.000Z",
          archived: !1,
        },
        {
          id: "notes-1234-abcd-5678",
          title: "Language Learning",
          body: "Practice Spanish vocabulary for 30 minutes every day.",
          createdAt: "2022-10-28T08:00:20.120Z",
          archived: !1,
        },
      ],
      t = e;
    console.log(e);
    class n extends HTMLElement {
      constructor() {
        super(), (this._shadowRoot = this.attachShadow({ mode: "open" }));
      }
      _emptyContent() {
        this._shadowRoot.innerHTML = "";
      }
      set note(e) {
        (this._note = e), this.render();
      }
      get note() {
        return this._note;
      }
      render() {
        this._emptyContent();
        const e = document.createElement("link");
        e.setAttribute("rel", "stylesheet"),
          e.setAttribute("href", "src/style/style.css"),
          this._shadowRoot.appendChild(e);
        const o = document.createElement("div");
        (o.className = "note-list"),
          (o.innerHTML = `\n        <div class="grid-wrapper">\n            <h1 class="all-notes">All Notes</h1>\n            <hr>\n            <div class="grid-container">\n            ${t
            .map((e) => {
              const t = new Date(e.createdAt),
                o = t.toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: !1,
                }),
                n = t.toLocaleDateString("id-ID", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                });
              return `\n                    <div class="card">\n                        <h4>${e.title}</h4>\n                        <p class="date">${o}, - ${n} </p>\n                        <p class="desc">${e.body}</p>\n                    </div>\n                `;
            })
            .join("")}\n            </div>\n        </div>\n        `),
          this._shadowRoot.appendChild(o);
      }
    }
    customElements.define("note-list", n),
      o(842),
      (document.querySelector("note-list").note = t),
      document
        .querySelector("note-form")
        .addEventListener("note-added", (e) => {
          t.push(e.detail), (document.querySelector("note-list").note = t);
        });
  })();
})();
