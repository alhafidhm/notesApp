import { getNotes, addNote, deleteNote } from "./api.js";
import "./components.js";
import css from "../css/style.css";

document.addEventListener("DOMContentLoaded", async () => {
  const notesContainer = document.getElementById("notes-container");
  const noteForm = document.getElementById("note-form");

  const loadingIndicator = document.createElement("div");
  loadingIndicator.id = "loading";
  loadingIndicator.textContent = "Loading...";
  loadingIndicator.style = `
        display: none;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
    `;
  document.body.appendChild(loadingIndicator);

  function showLoading() {
    loadingIndicator.style.display = "block";
  }

  function hideLoading() {
    setTimeout(() => {
      loadingIndicator.style.display = "none";
    }, 500);
  }

  async function renderNotes() {
    showLoading();
    notesContainer.innerHTML = "<p>Loading notes...</p>";

    const notesData = await getNotes();

    notesContainer.innerHTML = "";
    notesData.forEach((note) => {
      const noteElement = document.createElement("note-item");
      noteElement.setAttribute("id", note.id);
      noteElement.setAttribute("title", note.title);
      noteElement.setAttribute("body", note.body);
      noteElement.setAttribute("createdAt", note.createdAt);
      notesContainer.appendChild(noteElement);
    });

    hideLoading();
  }

  document.addEventListener("note-added", async (event) => {
    showLoading();
    await addNote(event.detail.title, event.detail.body);
    renderNotes();
  });

  document.addEventListener("note-deleted", async (event) => {
    showLoading();
    const { id } = event.detail;
    console.log("Deleting note with ID:", id);

    const success = await deleteNote(id);
    if (success) {
      console.log("Note deleted successfully, refreshing notes...");
      renderNotes();
    } else {
      console.error("Failed to delete note.");
      hideLoading();
    }
  });

  renderNotes();
});
