import { getHeaderHTML } from "./components/header.js";
import { getMainHTML } from "./components/main.js";
import { getFooterHTML } from "./components/footer.js";

window.addEventListener("DOMContentLoaded", () => {
  console.log("La pagina si è caricata");

  const appEl = document.querySelector("#app");

  if (appEl) {
    renderPage(appEl);
  }
});

function renderPage(appEl) {
  const header = getHeaderHTML();
  const main = getMainHTML();
  const footer = getFooterHTML();

  appEl.innerHTML = header + main + footer;

  // Fetch dei dati dei post da JSONPlaceholder
  const url = "https://jsonplaceholder.typicode.com/posts";

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errore nella richiesta fetch");
      }
      return response.json();
    })
    .then((data) => {
      // Creazione del contenuto HTML dinamicamente utilizzando i dati ottenuti
      const postList = document.getElementById("post-list");
      if (postList) {
        postList.innerHTML = ""; // Pulizia del contenuto precedente
        data.forEach((post) => {
          const postItem = createPostElement(post);
          postList.appendChild(postItem);
        });
      }
    })
    .catch((error) => {
      console.error("Si è verificato un errore:", error);
      // Gestione dell'errore, ad esempio mostrando un messaggio nel DOM
      const errorMessage = document.createElement("p");
      errorMessage.textContent =
        "Si è verificato un errore durante il recupero dei dati.";
      appEl.appendChild(errorMessage);
    });
}

function createPostElement(post) {
  const postItem = document.createElement("div");
  postItem.classList.add("post-item");

  const title = document.createElement("h2");
  title.textContent = post.title;

  const body = document.createElement("p");
  body.textContent = post.body;

  const userId = document.createElement("h3");
  userId.textContent = `User ID: ${post.userId}`;

  postItem.appendChild(title);
  postItem.appendChild(body);
  postItem.appendChild(userId);

  return postItem;
}
