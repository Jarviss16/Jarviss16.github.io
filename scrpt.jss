// Dizionario base (puoi modificarlo/aggiungere parole da UI)
let dictionary = JSON.parse(localStorage.getItem("dictionary")) || [
  { word: "ecografia", category: "Diagnostica", percent: 70 },
  { word: "analisi sangue", category: "Laboratorio", percent: 80 },
  { word: "visita cardiologica", category: "Visita specialistica", percent: 60 }
];

// Mostra la lista parole
function renderList() {
  const list = document.getElementById("wordList");
  list.innerHTML = "";
  dictionary.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.word} → <span>${item.category} (${item.percent}%)</span>
      <button onclick="deleteWord(${index})">❌</button>
    `;
    list.appendChild(li);
  });
  saveData();
}

// Aggiungi parola
function addWord(event) {
  event.preventDefault();
  const word = document.getElementById("newWord").value.toLowerCase();
  const category = document.getElementById("newCategory").value;
  const percent = document.getElementById("newPercent").value;

  dictionary.push({ word, category, percent });
  renderList();

  document.getElementById("newWord").value = "";
  document.getElementById("newCategory").value = "";
  document.getElementById("newPercent").value = "";
}

// Cancella parola
function deleteWord(index) {
  dictionary.splice(index, 1);
  renderList();
}

// Ricerca parola
function searchWord() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const result = document.getElementById("searchResult");

  const found = dictionary.find(item => input.includes(item.word));

  if (found) {
    result.textContent = `Categoria: ${found.category} → Rimborso: ${found.percent}%`;
  } else {
    result.textContent = "❌ Nessuna corrispondenza trovata";
  }
}

// Cambia pagina
function showPage(page) {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  document.getElementById(page).classList.remove("hidden");
}

// Salvataggio locale
function saveData() {
  localStorage.setItem("dictionary", JSON.stringify(dictionary));
}

// Avvio
renderList();
