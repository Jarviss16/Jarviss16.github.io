// Dizionario parole -> categorie
const dizionario = {
  "visita": "Visita specialistica (50% rimborso)",
  "analisi": "Analisi di laboratorio (70% rimborso)",
  "radiografia": "Esame diagnostico (60% rimborso)"
};

// --- Gestione tabs ---
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    // togli active da tutti
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(sec => sec.classList.remove("active"));

    // attiva quello cliccato
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});

// --- Ricerca ---
function cerca() {
  const parola = document.getElementById("searchInput").value.toLowerCase();
  const risultatoDiv = document.getElementById("risultato");

  if (dizionario[parola]) {
    risultatoDiv.textContent = `Risultato: ${dizionario[parola]}`;
  } else {
    risultatoDiv.textContent = "Nessuna corrispondenza trovata.";
  }
}

// --- Lista parole ---
function mostraLista() {
  const lista = document.getElementById("listaParole");
  lista.innerHTML = "";
  for (let parola in dizionario) {
    const li = document.createElement("li");
    li.textContent = `${parola} → ${dizionario[parola]}`;
    lista.appendChild(li);
  }
}

// Carica lista quando entri nella scheda
document.querySelector("[data-tab='lista']").addEventListener("click", mostraLista);
