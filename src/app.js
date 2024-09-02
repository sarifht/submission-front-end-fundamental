import "./style/style.css";
import "./components/index.js";
import { animate, glide } from "motion";

const baseUrl = "https://notes-api.dicoding.dev/v2";

const getNote = () => {
  fetch(`${baseUrl}/notes`)
    .then((response) => {
      return response.json();
    })
    .then((responseJson) => {
      if (responseJson.error) {
        showResponseMessage(responseJson.message);
      } else {
        console.log(responseJson.data);
        renderNotes(responseJson.data);
      }
    })
    .catch((error) => {
      showResponseMessage(error);
    });
};

const addNote = (note) => {
  showLoadingIndicator();
  fetch(`${baseUrl}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": "12345",
    },
    body: JSON.stringify({ title: note.title, body: note.body }),
  });
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Notes has been added",
    showConfirmButton: false,
    timer: 1500,
  })
    .then((responseJson) => {
      hideLoadingIndicator();
      getNote();
    })
    .catch((error) => {
      hideLoadingIndicator();
      showResponseMessage(error);
    });
};

const removeNote = (noteId) => {
  fetch(`${baseUrl}/notes/${noteId}`, {
    method: "DELETE",
    headers: {
      "X-Auth-Token": "12345",
    },
  });
  Swal.fire({
    title: "Deleted!",
    text: "Your note has been deleted.",
    icon: "success",
  })
    .then((responseJson) => {
      getNote();
    })
    .catch((error) => {
      hideLoadingIndicator();
      showResponseMessage(error);
    });
};

const renderNotes = (notes) => {
  const noteItems = document.querySelectorAll("note-list");
  noteItems.innerHTML = "";

  noteItems.forEach((noteItem) => {
    noteItem.note = notes;
    const shadowRoot = noteItem.shadowRoot;

    const cardNotes = shadowRoot.querySelectorAll(".note-delete");
    cardNotes.forEach((cardNote) => {
      const deleteButton = cardNote.querySelector(".button-delete");
      if (deleteButton) {
        deleteButton.addEventListener("click", (event) => {
          const noteId = event.target.dataset.id;

          removeNote(noteId);
        });
      }
    });
  });
};

const showResponseMessage = (message) => {
  Swal.fire({
    title: "The Internet?",
    text: "That thing is still around?",
    icon: "question",
  });
  showResponseMessage(message);
};

document.addEventListener("DOMContentLoaded", () => {
  getNote();

  const inputNoteElement = document.querySelector("note-form");
  if (inputNoteElement) {
    inputNoteElement.addEventListener("note-added", (event) => {
      const newNote = event.detail;
      addNote(newNote);
    });
  }
});

const showLoadingIndicator = () => {
  const loadingIndicator = document.querySelector(".loadingIndicator");
  loadingIndicator.style.display = "flex";
};

const hideLoadingIndicator = () => {
  const loadingIndicator = document.querySelector(".loadingIndicator");
  loadingIndicator.style.display = "none";
};

// animasi
animate("#itemNotes", { y: 0 }, { easing: glide({ velocity: -50 }) });
