class AppBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
            <style>
                header {
                    background-color: #333;
                    color: white;
                    padding: 1rem;
                    text-align: center;
                    width:100%;
                }
            </style>
            <header>
                <h1>Notes App</h1>
            </header>
        `;
  }
}
customElements.define("app-bar", AppBar);

class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.shadowRoot
      .querySelector("form")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        const title = this.shadowRoot.querySelector("#title").value;
        const body = this.shadowRoot.querySelector("#body").value;

        if (title && body) {
          this.dispatchEvent(
            new CustomEvent("note-added", {
              detail: { title, body },
              bubbles: true,
              composed: true,
            }),
          );
          this.shadowRoot.querySelector("form").reset();
        }
      });
  }

  render() {
    this.shadowRoot.innerHTML = `
            <style>
                form {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    width: 80%;
                    margin: auto;
                }
                input, textarea {
                    padding: 0.5rem;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }
                button {
                    padding: 0.5rem;
                    background-color: #28a745;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }
                button:hover {
                    background-color: #218838;
                }
            </style>
            <form>
                <input type="text" id="title" placeholder="Note Title" required>
                <textarea id="body" placeholder="Note Content" required></textarea>
                <button type="submit">Add Note</button>
            </form>
        `;
  }
}
customElements.define("note-form", NoteForm);

class NoteItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const title = this.getAttribute("title");
    const body = this.getAttribute("body");
    const createdAt = new Date(this.getAttribute("createdAt")).toLocaleString();
    const id = this.getAttribute("id");

    this.shadowRoot.innerHTML = `
            <style>
                .note-card {
                    background: white;
                    padding: 1rem;
                    border-radius: 8px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    margin-bottom: 10px;
                    position: relative;
                }
                button {
                    position: absolute;
                    top: 5px;
                    right: 5px;
                    background: red;
                    color: white;
                    border: none;
                    padding: 5px;
                    cursor: pointer;
                    border-radius: 3px;
                }
                button:hover {
                    background: darkred;
                }
            </style>
            <div class="note-card">
                <h3>${title}</h3>
                <p>${body}</p>
                <small>${createdAt}</small>
                <button id="delete-btn">Delete</button>
            </div>
        `;

    this.shadowRoot
      .querySelector("#delete-btn")
      .addEventListener("click", () => {
        console.log("Delete button clicked, ID:", id);
        this.dispatchEvent(
          new CustomEvent("note-deleted", {
            detail: { id },
            bubbles: true,
            composed: true,
          }),
        );
      });
  }
}
customElements.define("note-item", NoteItem);
