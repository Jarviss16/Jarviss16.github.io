// script.js

// --- GESTIONE TAB ---
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const tabId = btn.getAttribute("data-tab");

    // Rimuovi la classe "active" da tutti i bottoni
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));

    // Nascondi tutte le sezioni
    document.querySelectorAll(".tab-content").forEach(sec => sec.classList.remove("active"));

    // Aggiungi "active" al bottone cliccato
    btn.classList.add("active");

    // Mostra la sezione corrispondente
    const target = document.getElementById(tabId);
    if (target) {
      target.classList.add("active");
    }
  });
});

// --- GESTIONE RICERCA ---
function cerca() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const risultato = document.getElementById("risultato");

  if (input.trim() === "") {
    risultato.innerHTML = "<p>Inserisci una parola chiave per avviare la ricerca.</p>";
    return;
  }

  // Per ora mostriamo solo la parola cercata (puoi collegare il vero DB più avanti)
  risultato.innerHTML = `<p>Hai cercato: <strong>${input}</strong></p>`;
}

// --- MODAL ---
const modal = document.getElementById("modal");
const modalForm = document.getElementById("modalForm");
let currentMode = null; // "prestazioni" o "medicinali"

function aggiungiNuovaCategoria(tipo) {
  currentMode = tipo;
  document.getElementById("modalTitle").innerText =
    tipo === "prestazioni" ? "Aggiungi Prestazione" : "Aggiungi Medicinale";
  modal.style.display = "flex";
}

function chiudiModal() {
  modal.style.display = "none";
  modalForm.reset();
}

// Salvataggio voce
modalForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const parola = document.getElementById("modalParola").value;
  const sinonimi = document.getElementById("modalSinonimi").value;
  const categoria = document.getElementById("modalCategoria").value;
  const rimborso = document.getElementById("modalRimborso").value;

  const nuovaRiga = `
    <tr>
      <td>${parola}</td>
      <td>${sinonimi}</td>
      <td>${categoria}</td>
      <td>${rimborso}%</td>
      <td><button onclick="this.closest('tr').remove()">🗑️ Elimina</button></td>
    </tr>
  `;

  if (currentMode === "prestazioni") {
    document.getElementById("corpoTabella").insertAdjacentHTML("beforeend", nuovaRiga);
  } else if (currentMode === "medicinali") {
    document.getElementById("corpoTabellaMedicinali").insertAdjacentHTML("beforeend", nuovaRiga);
  }

  chiudiModal();
});
