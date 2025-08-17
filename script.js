// Prestazioni con sinonimi / descrizioni
const prestazioni = [
  {
    nome: "Visita cardiologica",
    descrizione: "Controllo medico specializzato sul cuore",
    sinonimi: ["cardiologia", "check-up cuore"],
    rimborso: "70%"
  },
  {
    nome: "Radiografia",
    descrizione: "Esame diagnostico con raggi X",
    sinonimi: ["lastra", "rx"],
    rimborso: "50%"
  },
  {
    nome: "Analisi del sangue",
    descrizione: "Prelievo e analisi di laboratorio",
    sinonimi: ["esami sangue", "emocromo"],
    rimborso: "60%"
  }
];

// Medicinali con sinonimi / descrizioni
const medicinali = [
  {
    nome: "Tachipirina",
    descrizione: "Farmaco antipiretico e antidolorifico",
    sinonimi: ["paracetamolo"],
    rimborso: "40%"
  },
  {
    nome: "Ibuprofene",
    descrizione: "Farmaco antinfiammatorio non steroideo",
    sinonimi: ["brufen"],
    rimborso: "30%"
  },
  {
    nome: "Antibiotico",
    descrizione: "Farmaco contro le infezioni batteriche",
    sinonimi: ["amoxicillina"],
    rimborso: "20%"
  }
];

// Funzione ricerca
document.getElementById("searchBtn").addEventListener("click", () => {
  const query = document.getElementById("searchInput").value.toLowerCase();
  let found = null;

  // cerca nelle prestazioni
  for (let p of prestazioni) {
    if (
      p.nome.toLowerCase() === query ||
      p.sinonimi.some(s => s.toLowerCase() === query)
    ) {
      found = p;
      break;
    }
  }

  // cerca nei medicinali
  if (!found) {
    for (let m of medicinali) {
      if (
        m.nome.toLowerCase() === query ||
        m.sinonimi.some(s => s.toLowerCase() === query)
      ) {
        found = m;
        break;
      }
    }
  }

  if (found) {
    document.getElementById("result").innerHTML = `
      <div class="card">
        <h3>${found.nome}</h3>
        <p><strong>Descrizione:</strong> ${found.descrizione}</p>
        <p><strong>Sinonimi:</strong> ${found.sinonimi.join(", ")}</p>
        <p><strong>Rimborso:</strong> ${found.rimborso}</p>
      </div>
    `;
  } else {
    document.getElementById("result").innerHTML = "❌ Nessun risultato trovato.";
  }
});

// Riempio lista prestazioni
const prestazioniList = document.getElementById("prestazioniList");
prestazioni.forEach(p => {
  let div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
    <h3>${p.nome}</h3>
    <p><strong>Descrizione:</strong> ${p.descrizione}</p>
    <p><strong>Sinonimi:</strong> ${p.sinonimi.join(", ")}</p>
    <p><strong>Rimborso:</strong> ${p.rimborso}</p>
  `;
  prestazioniList.appendChild(div);
});

// Riempio lista medicinali
const medicinaliList = document.getElementById("medicinaliList");
medicinali.forEach(m => {
  let div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
    <h3>${m.nome}</h3>
    <p><strong>Descrizione:</strong> ${m.descrizione}</p>
    <p><strong>Sinonimi:</strong> ${m.sinonimi.join(", ")}</p>
    <p><strong>Rimborso:</strong> ${m.rimborso}</p>
  `;
  medicinaliList.appendChild(div);
});

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
