const BASE_URL = "https://notes-api.dicoding.dev/v2";

async function getNotes() {
  try {
    const response = await fetch(`${BASE_URL}/notes`);
    const result = await response.json();
    if (result.status !== "success") {
      throw new Error(result.message);
    }
    return result.data;
  } catch (error) {
    console.error("Error fetching notes:", error);
    return [];
  }
}

async function addNote(title, body) {
  try {
    const response = await fetch(`${BASE_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body }),
    });
    const result = await response.json();
    if (result.status !== "success") {
      throw new Error(result.message);
    }
    return result.data;
  } catch (error) {
    console.error("Error adding note:", error);
    return null;
  }
}

async function deleteNote(id) {
  try {
    console.log(`Attempting to delete note with ID: ${id}`);
    const response = await fetch(`${BASE_URL}/notes/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    console.log("API Response:", result);

    if (result.status !== "success") {
      throw new Error(result.message);
    }
    return true;
  } catch (error) {
    console.error("Error deleting note:", error);
    return false;
  }
}

export { getNotes, addNote, deleteNote };
