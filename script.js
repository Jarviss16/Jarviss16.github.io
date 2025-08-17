// Dati iniziali
let prestazioni = [
  {
    nome: "Visita cardiologica",
    descrizione: "Controllo medico specializzato sul cuore",
    sinonimi: ["cardiologia", "check-up cuore"],
    rimborso: "70%",
    categoria: "Visite specialistiche"
  },
  {
    nome: "Radiografia",
    descrizione: "Esame diagnostico con raggi X",
    sinonimi: ["lastra", "rx"],
    rimborso: "50%",
    categoria: "Diagnostica per immagini"
  },
  {
    nome: "Analisi del sangue",
    descrizione: "Prelievo e analisi di laboratorio",
    sinonimi: ["esami sangue", "emocromo"],
    rimborso: "60%",
    categoria: "Analisi di laboratorio"
  }
];

let medicinali = [
  {
    nome: "Tachipirina",
    descrizione: "Farmaco antipiretico e antidolorifico",
    sinonimi: ["paracetamolo"],
    rimborso: "40%",
    categoria: "Antidolorifici"
  },
  {
    nome: "Ibuprofene",
    descrizione: "Farmaco antinfiammatorio non steroideo",
    sinonimi: ["brufen"],
    rimborso: "30%",
    categoria: "Antinfiammatori"
  },
  {
    nome: "Amoxicillina",
    descrizione: "Farmaco antibiotico per infezioni batteriche",
    sinonimi: ["antibiotico", "Zimox"],
    rimborso: "20%",
    categoria: "Antibiotici"
  }
];

// Inizializzazione
document.addEventListener('DOMContentLoaded', function() {
  // Carica dati salvati
  loadSavedData();
  
  // Renderizza le liste
  renderAllLists();
  
  // Imposta gli event listeners
  setupEventListeners();
  
  // Aggiorna i contatori
  updateCounters();
});

// Funzioni principali
function loadSavedData() {
  const savedPrestazioni = localStorage.getItem('prestazioni');
  const savedMedicinali = localStorage.getItem('medicinali');
  
  if (savedPrestazioni) prestazioni = JSON.parse(savedPrestazioni);
  if (savedMedicinali) medicinali = JSON.parse(savedMedicinali);
}

function renderAllLists() {
  renderList('prestazioniList', prestazioni);
  renderList('medicinaliList', medicinali);
}

function renderList(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  container.innerHTML = items.map(item => createCardHTML(item)).join('');
}

function createCardHTML(item) {
  const isPrestazione = item.categoria && item.categoria.toLowerCase() !== 'antidolorifici' && 
                        item.categoria.toLowerCase() !== 'antinfiammatori' && 
                        item.categoria.toLowerCase() !== 'antibiotici';
  
  return `
    <div class="term-card">
      <h3>${item.nome} 
        <span class="item-type">${isPrestazione ? '📋' : '💊'}</span>
      </h3>
      <p><strong>Descrizione:</strong> ${item.descrizione}</p>
      ${item.sinonimi && item.sinonimi.length ? 
        `<p><strong>Sinonimi:</strong> ${item.sinonimi.join(', ')}</p>` : ''}
      <div class="term-meta">
        <span><strong>Categoria:</strong> ${item.categoria || 'N/A'}</span>
        <span><strong>Rimborso:</strong> ${item.rimborso}</span>
      </div>
    </div>
  `;
}

function setupEventListeners() {
  // Gestione tabs
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Rimuovi active da tutti i tab e contenuti
      tabButtons.forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });
      
      // Aggiungi active al tab cliccato
      this.classList.add('active');
      
      // Mostra il contenuto correlato
      const tabId = this.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });
  
  // Ricerca
  document.getElementById('searchBtn').addEventListener('click', performSearch);
  document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') performSearch();
  });
}

function performSearch() {
  const query = document.getElementById('searchInput').value.trim().toLowerCase();
  const resultsContainer = document.getElementById('searchResults');
  
  if (!query) {
    resultsContainer.innerHTML = '<p class="no-results">Inserisci un termine di ricerca</p>';
    return;
  }
  
  // Cerca in tutte le voci
  const allItems = [
    ...prestazioni.map(item => ({ ...item, type: 'prestazione' })),
    ...medicinali.map(item => ({ ...item, type: 'medicinale' }))
  ];
  
  const results = allItems.filter(item => 
    item.nome.toLowerCase().includes(query) ||
    item.descrizione.toLowerCase().includes(query) ||
    (item.sinonimi && item.sinonimi.some(s => s.toLowerCase().includes(query))) ||
    (item.categoria && item.categoria.toLowerCase().includes(query))
  );
  
  if (results.length === 0) {
    resultsContainer.innerHTML = `<p class="no-results">Nessun risultato trovato per "${query}"</p>`;
    return;
  }
  
  resultsContainer.innerHTML = results.map(item => createCardHTML(item)).join('');
}

function updateCounters() {
  const prestazioniCount = document.querySelector('#prestazioni .list-count');
  const medicinaliCount = document.querySelector('#medicinali .list-count');
  
  if (prestazioniCount) prestazioniCount.textContent = `${prestazioni.length} elementi`;
  if (medicinaliCount) medicinaliCount.textContent = `${medicinali.length} elementi`;
}

// Salva i dati
function saveData() {
  localStorage.setItem('prestazioni', JSON.stringify(prestazioni));
  localStorage.setItem('medicinali', JSON.stringify(medicinali));
  updateCounters();
}
