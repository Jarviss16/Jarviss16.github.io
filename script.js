// Dati di esempio aggiornati con struttura simile allo screenshot
let prestazioni = [
  {
    nome: "Ecografia addominale",
    descrizione: "Esame diagnostico per visualizzare gli organi addominali",
    sinonimi: ["eco addome", "ultrasuoni addome"],
    categoria: "Diagnostica per immagini",
    rimborso: "70%",
    autori: 15,
    anno: "2023"
  },
  {
    nome: "Analisi del sangue",
    descrizione: "Esame di laboratorio per valutare parametri ematici",
    sinonimi: ["esame emocromocitometrico", "prelievo venoso"],
    categoria: "Analisi di laboratorio",
    rimborso: "60%",
    autori: 12,
    anno: "2023"
  }
];

let medicinali = [
  {
    nome: "Relaggetti",
    descrizione: "Farmaco per il trattamento di condizioni specifiche",
    sinonimi: ["Relaget", "Relaxget"],
    categoria: "Farmaci specialistici",
    rimborso: "25%",
    autori: 8,
    anno: "2023"
  }
];

// Funzione per visualizzare le tabelle
function displayTables() {
  const prestazioniTable = document.createElement('div');
  prestazioniTable.innerHTML = `
    <h2 class="section-title">Lista Prestazioni</h2>
    ${generateTermList(prestazioni)}
    <h3 class="subsection-title">Categorie</h3>
    <div class="category-list">
      ${Array.from(new Set(prestazioni.map(p => p.categoria))).map(cat => 
        `<div class="category-item">${cat}</div>`
      ).join('')}
    </div>
    <h3 class="subsection-title">Aggiornamenti Recenti</h3>
    ${generateUpdateTable(prestazioni)}
  `;
  document.getElementById('prestazioniList').appendChild(prestazioniTable);

  const medicinaliTable = document.createElement('div');
  medicinaliTable.innerHTML = `
    <h2 class="section-title">Lista Medicinali</h2>
    ${generateTermList(medicinali)}
    <h3 class="subsection-title">Categorie</h3>
    <div class="category-list">
      ${Array.from(new Set(medicinali.map(m => m.categoria))).map(cat => 
        `<div class="category-item">${cat}</div>`
      ).join('')}
    </div>
    <h3 class="subsection-title">Aggiornamenti Recenti</h3>
    ${generateUpdateTable(medicinali)}
  `;
  document.getElementById('medicinaliList').appendChild(medicinaliTable);
}

function generateTermList(items) {
  return items.map(item => `
    <div class="term-item">
      <div class="term-name">${item.nome}</div>
      <div class="term-details">
        <p><strong>Descrizione:</strong> ${item.descrizione}</p>
        <p><strong>Sinonimi:</strong> ${item.sinonimi.join(", ")}</p>
        <p><strong>Categoria:</strong> ${item.categoria}</p>
        <p><strong>Rimborso:</strong> ${item.rimborso}</p>
      </div>
    </div>
  `).join('');
}

function generateUpdateTable(items) {
  return `
    <table>
      <thead>
        <tr>
          <th>Rimborso (%)</th>
          <th>Autori</th>
        </tr>
      </thead>
      <tbody>
        ${items.map(item => `
          <tr>
            <td>${item.rimborso}</td>
            <td>${item.autori}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

// Chiamata iniziale per visualizzare le tabelle
document.addEventListener('DOMContentLoaded', () => {
  displayTables();
  
  // Carica dati da localStorage se presenti
  const savedPrestazioni = localStorage.getItem('prestazioni');
  const savedMedicinali = localStorage.getItem('medicinali');
  
  if (savedPrestazioni) prestazioni = JSON.parse(savedPrestazioni);
  if (savedMedicinali) medicinali = JSON.parse(savedMedicinali);
  
  updateLists();
});

// Funzione per aggiornare le liste
function updateLists() {
  // Pulisci i contenitori
  document.getElementById('prestazioniList').innerHTML = '';
  document.getElementById('medicinaliList').innerHTML = '';
  
  // Ricrea le tabelle
  displayTables();
  
  // Salva in localStorage
  localStorage.setItem('prestazioni', JSON.stringify(prestazioni));
  localStorage.setItem('medicinali', JSON.stringify(medicinali));
}

// Gestione del form Google
function setupFormButton() {
  const formUrl = "https://forms.gle/x2FanzzPzVdPveU57";
  
  document.querySelectorAll('.add-btn').forEach(btn => {
    btn.href = formUrl;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.open(formUrl, '_blank');
      // Qui potresti aggiungere tracking dell'evento se necessario
    });
  });
}

// Inizializzazione
setupFormButton();
