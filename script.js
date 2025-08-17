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

// Caricamento iniziale
document.addEventListener('DOMContentLoaded', () => {
  // Carica dati da localStorage se presenti
  const savedPrestazioni = localStorage.getItem('prestazioni');
  const savedMedicinali = localStorage.getItem('medicinali');
  
  if (savedPrestazioni) prestazioni = JSON.parse(savedPrestazioni);
  if (savedMedicinali) medicinali = JSON.parse(savedMedicinali);
  
  renderLists();
  setupEventListeners();
});

// Funzioni di rendering
function renderLists() {
  renderPrestazioni();
  renderMedicinali();
}

function renderPrestazioni() {
  const container = document.getElementById('prestazioniList');
  container.innerHTML = prestazioni.map(prestazione => `
    <div class="term-card">
      <h3>${prestazione.nome}</h3>
      <p><strong>Descrizione:</strong> ${prestazione.descrizione}</p>
      ${prestazione.sinonimi.length ? `<p><strong>Sinonimi:</strong> ${prestazione.sinonimi.join(', ')}</p>` : ''}
      <div class="term-meta">
        <span><strong>Categoria:</strong> ${prestazione.categoria}</span>
        <span><strong>Rimborso:</strong> ${prestazione.rimborso}</span>
      </div>
    </div>
  `).join('');
}

function renderMedicinali() {
  const container = document.getElementById('medicinaliList');
  container.innerHTML = medicinali.map(medicinale => `
    <div class="term-card">
      <h3>${medicinale.nome}</h3>
      <p><strong>Descrizione:</strong> ${medicinale.descrizione}</p>
      ${medicinale.sinonimi.length ? `<p><strong>Sinonimi:</strong> ${medicinale.sinonimi.join(', ')}</p>` : ''}
      <div class="term-meta">
        <span><strong>Categoria:</strong> ${medicinale.categoria}</span>
        <span><strong>Rimborso:</strong> ${medicinale.rimborso}</span>
      </div>
    </div>
  `).join('');
}

// Ricerca
function setupEventListeners() {
  // Ricerca
  document.getElementById('searchBtn').addEventListener('click', performSearch);
  document.getElementById('searchInput').addEventListener('keyup', (e) => {
    if (e.key === 'Enter') performSearch();
  });
  
  // Tabs
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      const tabId = tab.dataset.tab;
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });
      document.getElementById(tabId).classList.add('active');
    });
  });
}

function performSearch() {
  const query = document.getElementById('searchInput').value.trim().toLowerCase();
  const resultsContainer = document.getElementById('searchResults');
  
  if (!query) {
    resultsContainer.innerHTML = '<p class="no-results">Inserisci un termine di ricerca</p>';
    return;
  }
  
  // Cerca in entrambe le liste
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
    resultsContainer.innerHTML = '<p class="no-results">Nessun risultato trovato per "' + query + '"</p>';
    return;
  }
  
  resultsContainer.innerHTML = results.map(item => `
    <div class="term-card">
      <h3>${item.nome} <span class="item-type">${item.type === 'prestazione' ? '📋' : '💊'}</span></h3>
      <p><strong>Descrizione:</strong> ${item.descrizione}</p>
      ${item.sinonimi && item.sinonimi.length ? `<p><strong>Sinonimi:</strong> ${item.sinonimi.join(', ')}</p>` : ''}
      <div class="term-meta">
        <span><strong>Categoria:</strong> ${item.categoria || 'N/A'}</span>
        <span><strong>Rimborso:</strong> ${item.rimborso}</span>
      </div>
    </div>
  `).join('');
}

// Salva dati in localStorage
function saveData() {
  localStorage.setItem('prestazioni', JSON.stringify(prestazioni));
  localStorage.setItem('medicinali', JSON.stringify(medicinali));
}
