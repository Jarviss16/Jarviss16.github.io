let dizionario = {
  "ecografia": "Diagnostica",
  "analisi sangue": "Laboratorio",
  "visita cardiologica": "Visite Specialistiche"
};

let currentSection = "";
let modalMode = "";
let editingKey = null;

// Funzione di ricerca
function searchWord() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const resultDiv = document.getElementById("result");

  if (dizionario[input]) {
    resultDiv.textContent = `Categoria: ${dizionario[input]}`;
  } else {
    resultDiv.textContent = "Nessuna corrispondenza trovata.";
  }
}

// Popola lista dizionario
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
// FUNZIONE AGGIORNA PULSANTI
// ==============================
function aggiungiNuovaCategoria(tipo) {
  // --- APPUNTO: Questo era il vecchio codice che apriva il modal ---
  /*
  currentSection = tipo;
  modalMode = 'add';
  editingKey = null;
  document.getElementById("modalTitle").textContent =
    tipo === "categoria" ? "Aggiungi Categoria" : "Aggiungi Medicinale";
  document.getElementById("modalParola").value = "";
  document.getElementById("modalCategoria").value = "";
  document.getElementById("modal").classList.add("active");
  document.getElementById("modalParola").focus();
  */

  // 🔗 Ora invece apre il Google Form in una nuova scheda
  window.open("https://forms.gle/x2FanzzPzVdPveU57", "_blank");
}

// ==============================
// MODAL (vecchio codice, ora disabilitato)
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
};
