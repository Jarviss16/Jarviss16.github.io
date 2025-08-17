// Dizionario di prestazioni e medicinali (aggiungi tu qui dentro!)
const prestazioni = {
  "visita cardiologica": "Prestazione - Rimborso 70%",
  "radiografia": "Prestazione - Rimborso 50%",
  "analisi del sangue": "Prestazione - Rimborso 60%"
};

const medicinali = {
  "tachipirina": "Medicinale - Rimborso 40%",
  "ibuprofene": "Medicinale - Rimborso 30%",
  "antibiotico": "Medicinale - Rimborso 20%"
};

// Funzione per ricerca
document.getElementById("searchBtn").addEventListener("click", () => {
  const query = document.getElementById("searchInput").value.toLowerCase();
  let result = "";

  if (prestazioni[query]) {
    result = prestazioni[query];
  } else if (medicinali[query]) {
    result = medicinali[query];
  } else {
    result = "❌ Nessun risultato trovato.";
  }

  document.getElementById("result").textContent = result;
});

// Riempio le liste
const prestazioniList = document.getElementById("prestazioniList");
for (let key in prestazioni) {
  let li = document.createElement("li");
  li.textContent = `${key} → ${prestazioni[key]}`;
  prestazioniList.appendChild(li);
}

const medicinaliList = document.getElementById("medicinaliList");
for (let key in medicinali) {
  let li = document.createElement("li");
  li.textContent = `${key} → ${medicinali[key]}`;
  medicinaliList.appendChild(li);
}

// Navigazione tra schede
const tabs = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(btn => {
  btn.addEventListener("click", () => {
    tabs.forEach(b => b.classList.remove("active"));
    contents.forEach(c => c.classList.remove("active"));

    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});
