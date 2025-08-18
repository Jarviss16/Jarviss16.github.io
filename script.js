// Lista Prestazioni (AGGIUNTO campo "categoria")
const prestazioni = [
  {
    descrizione: "Visita specialistica",
    categoria: "Visita",
    sinonimi: ["controllo medico", "check-up"],
    rimborso: "50€"
  },
  {
    descrizione: "Terapia fisioterapica",
    categoria: "Terapia",
    sinonimi: ["fisioterapia", "riabilitazione"],
    rimborso: "30€"
  }
];

// Lista Medicinali (uguale a prima)
const medicinali = [
  {
    nome: "Paracetamolo",
    sinonimi: ["tachipirina", "acetaminofene"],
    rimborso: "10€"
  },
  {
    nome: "Ibuprofene",
    sinonimi: ["brufen", "moment"],
    rimborso: "8€"
  }
];

// Rendering lista prestazioni
const listaPrestazioni = document.getElementById("prestazioni-list");
prestazioni.forEach(item => {
  const li = document.createElement("li");
  li.innerHTML = `
    <p><strong>Descrizione:</strong> ${item.descrizione}</p>
    <p><strong>Categoria:</strong> ${item.categoria}</p>
    <p><strong>Sinonimi:</strong> ${item.sinonimi.join(", ")}</p>
    <p><strong>Rimborso:</strong> ${item.rimborso}</p>
  `;
  listaPrestazioni.appendChild(li);
});

// Rendering lista medicinali
const listaMedicinali = document.getElementById("medicinali-list");
medicinali.forEach(item => {
  const li = document.createElement("li");
  li.innerHTML = `
    <p><strong>Nome:</strong> ${item.nome}</p>
    <p><strong>Sinonimi:</strong> ${item.sinonimi.join(", ")}</p>
    <p><strong>Rimborso:</strong> ${item.rimborso}</p>
  `;
  listaMedicinali.appendChild(li);
});