import { getSnippets, deleteSnippet } from "./snippet-db.js";

export async function loadSnippets() {
  const list = document.getElementById("snippet-list");
  list.innerHTML = "";

  const snippets = await getSnippets();
  
  snippets.forEach(sn => {
    const div = document.createElement("div");
    div.className = "snippet-item";
    div.innerHTML = `
      <b>${sn.title}</b> <br>
      <pre>${sn.code}</pre>
      <button data-id="${sn.id}">Delete</button>
    `;
    list.appendChild(div);

    div.querySelector("button").onclick = async () => {
      await deleteSnippet(sn.id);
      loadSnippets();
    };
  });
}
