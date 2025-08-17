// Dati prestazioni e medicinali pre-caricati
const prestazioni = [
  { parola: "Visita cardiologica", sinonimi: "cuore, cardiologia", categoria: "Visite specialistiche", rimborso: "70%" },
  { parola: "Analisi del sangue", sinonimi: "prelievo, emocromo", categoria: "Laboratorio", rimborso: "80%" }
];

const medicinali = [
  { parola: "Paracetamolo", sinonimi: "tachipirina, antifebbrile", categoria: "Antidolorifici", rimborso: "60%" },
  { parola: "Ibuprofene", sinonimi: "brufen, antinfiammatorio", categoria: "FANS", rimborso: "65%" }
];

// Funzione cambio tab
document.querySelectorAll(".tab-btn").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));

    button.classList.add("active");
    document.getElementById(button.dataset.tab).classList.add("active");
  });
});

// Popola tabella prestazioni
function caricaPrestazioni() {
  const corpo = document.getElementById("corpoTabella");
  corpo.innerHTML = "";
  prestazioni.forEach(p => {
    corpo.innerHTML += `
      <tr>
        <td>${p.parola}</td>
        <td>${p.sinonimi}</td>
        <td>${p.categoria}</td>
        <td>${p.rimborso}</td>
      </tr>`;
  });
}

// Popola tabella medicinali
function caricaMedicinali() {
  const corpo = document.getElementById("corpoTabellaMedicinali");
  corpo.innerHTML = "";
  medicinali.forEach(m => {
    corpo.innerHTML += `
      <tr>
        <td>${m.parola}</td>
        <td>${m.sinonimi}</td>
        <td>${m.categoria}</td>
        <td>${m.rimborso}</td>
      </tr>`;
  });
}

// Ricerca su entrambe le liste
function cerca() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const risultato = document.getElementById("risultato");
  risultato.innerHTML = "";

  const trovati = [
    ...prestazioni.filter(p =>
      p.parola.toLowerCase().includes(query) || p.sinonimi.toLowerCase().includes(query)
    ),
    ...medicinali.filter(m =>
      m.parola.toLowerCase().includes(query) || m.sinonimi.toLowerCase().includes(query)
    )
  ];

  if (trovati.length > 0) {
    trovati.forEach(item => {
      risultato.innerHTML += `
        <div class="result-item">
          <strong>${item.parola}</strong><br>
          <small>Sinonimi: ${item.sinonimi}</small><br>
          <small>Categoria: ${item.categoria}</small><br>
          <small>Rimborso: ${item.rimborso}</small>
        </div>`;
    });
  } else {
    risultato.innerHTML = "<p>Nessun risultato trovato</p>";
  }
}

// Avvio
caricaPrestazioni();
caricaMedicinali();
