// ==============================
// DIZIONARIO BASE
// ==============================
let dizionario = {
  "ecografia": "Diagnostica",
  "analisi sangue": "Laboratorio",
  "visita cardiologica": "Visite Specialistiche"
};

let modalMode = "";
let editingKey = null;

// ==============================
// CAMBIO SEZIONE (tabs/schede)
// ==============================
function showSection(section) {
  // Nascondo tutte le sezioni
  document.querySelectorAll(".section").forEach(div => {
    div.style.display = "none";
  });

  // Mostro solo quella scelta
  document.getElementById(section).style.display = "block";

  // Aggiorno lo stato dei bottoni
  document.querySelectorAll(".tab-button").forEach(btn => {
    btn.classList.remove("active");
  });
  document.querySelector(`.tab-button[data-section="${section}"]`).classList.add("active");
}

// ==============================
// FUNZIONE DI RICERCA
// ==============================
function searchWord() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const resultDiv = document.getElementById("result");

  if (dizionario[input]) {
    resultDiv.textContent = `Categoria: ${dizionario[input]}`;
  } else {
    resultDiv.textContent = "Nessuna corrispondenza trovata.";
  }
}

// ==============================
// POPOLA LISTA
// ==============================
function populateList() {
  const list = document.getElementById("wordList");
  list.innerHTML = "";

  for (const [parola, categoria] of Object.entries(dizionario)) {
    const li = document.createElement("li");
    li.textContent = `${parola} → ${categoria}`;
    list.appendChild(li);
  }
}

// ==============================
// PULSANTI NUOVA CATEGORIA/MEDICINALE
// ==============================
function aggiungiNuovaCategoria(tipo) {
  // Ora apre direttamente Google Form
  window.open("https://forms.gle/x2FanzzPzVdPveU57", "_blank");
}

// ==============================
// MODAL (non più usato, lasciato per upgrade futuri)
// ==============================
function closeModal() {
  document.getElementById("modal").classList.remove("active");
}

function saveModal() {
  const parola = document.getElementById("modalParola").value.trim().toLowerCase();
  const categoria = document.getElementById("modalCategoria").value.trim();

  if (parola && categoria) {
    if (modalMode === "add") {
      dizionario[parola] = categoria;
    } else if (modalMode === "edit" && editingKey) {
      delete dizionario[editingKey];
      dizionario[parola] = categoria;
    }
    populateList();
    closeModal();
  }
}

// ==============================
// INIT
// ==============================
window.onload = () => {
  populateList();
  showSection("search"); // Avvia dalla scheda ricerca
};
