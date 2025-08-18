// Dati iniziali
const prestazioni = [
  {
    nome: "Visita cardiologica",
    macro: "Cardiologia",
    rimb_min: "70% (se <2)",
    rimb_max: "90% (se >4)",
    massimale_specifico: "€ 120,00",
    massimale_gruppo: "€ 500,00",
    categoria: "Specialistica",
    sinonimi: ["cardiologia", "check-up cuore"],
    preventivo_prescrizione: "Non necessaria",
    opt: "Libera",
    visita_iniziale: "Obbligatoria",
    visita_finale: "Non necessaria",
    valutazione_sanitaria: "Richiesta",
    descrizione: "Controllo medico specializzato sul cuore"
  },
  {
    nome: "Radiografia",
    macro: "Diagnostica per immagini",
    rimb_min: "50% (se <2)",
    rimb_max: "70% (se >4)",
    massimale_specifico: "€ 80,00",
    massimale_gruppo: "€ 300,00",
    categoria: "Diagnostica",
    sinonimi: ["lastra", "rx"],
    preventivo_prescrizione: "Necessaria",
    opt: "Prioritaria",
    visita_iniziale: "Obbligatoria",
    visita_finale: "Non necessaria",
    valutazione_sanitaria: "Non richiesta",
    descrizione: "Esame diagnostico con raggi X"
  },
  {
    nome: "Analisi del sangue",
    macro: "Laboratorio",
    rimb_min: "60% (se <2)",
    rimb_max: "80% (se >4)",
    massimale_specifico: "€ 50,00",
    massimale_gruppo: "€ 200,00",
    categoria: "Laboratorio",
    sinonimi: ["esami sangue", "emocromo"],
    preventivo_prescrizione: "Non necessaria",
    opt: "Libera",
    visita_iniziale: "Non necessaria",
    visita_finale: "Non necessaria",
    valutazione_sanitaria: "Non richiesta",
    descrizione: "Prelievo e analisi di laboratorio"
  },
  {
    nome: "Ecografia addominale",
    macro: "Diagnostica per immagini",
    rimb_min: "55% (se <2)",
    rimb_max: "75% (se >4)",
    massimale_specifico: "€ 100,00",
    massimale_gruppo: "€ 400,00",
    categoria: "Diagnostica",
    sinonimi: ["eco addome", "ultrasuoni addome"],
    preventivo_prescrizione: "Necessaria",
    opt: "Prioritaria",
    visita_iniziale: "Obbligatoria",
    visita_finale: "Non necessaria",
    valutazione_sanitaria: "Non richiesta",
    descrizione: "Esame diagnostico non invasivo degli organi addominali"
  },
  {
    nome: "Visita dermatologica",
    macro: "Dermatologia",
    rimb_min: "65% (se <2)",
    rimb_max: "85% (se >4)",
    massimale_specifico: "€ 90,00",
    massimale_gruppo: "€ 350,00",
    categoria: "Specialistica",
    sinonimi: ["controllo pelle", "esame dermatologico"],
    preventivo_prescrizione: "Non necessaria",
    opt: "Libera",
    visita_iniziale: "Obbligatoria",
    visita_finale: "Non necessaria",
    valutazione_sanitaria: "Richiesta",
    descrizione: "Controllo specialistico per problemi della pelle"
  }
];

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
    nome: "Amoxicillina",
    descrizione: "Farmaco antibiotico per infezioni batteriche",
    sinonimi: ["antibiotico", "Zimox"],
    rimborso: "20%"
  },
  {
    nome: "Aspirina",
    descrizione: "Farmaco antinfiammatorio e antipiretico",
    sinonimi: ["acido acetilsalicilico"],
    rimborso: "25%"
  },
  {
    nome: "Augmentin",
    descrizione: "Antibiotico ad ampio spettro",
    sinonimi: ["amoxicillina e acido clavulanico"],
    rimborso: "35%"
  }
];

// Elementi DOM
const themeToggle = document.getElementById('themeToggle');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultDiv = document.getElementById('result');
const tabs = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.tab-content');

// Dark mode
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
}

function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    localStorage.setItem('theme', 'light');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
}

// Funzioni di ricerca
function fuzzySearch(query, text) {
  query = query.toLowerCase();
  text = text.toLowerCase();
  if (!query) return false;
  if (text.includes(query)) return true;
  let index = 0;
  for (const char of text) {
    if (char === query[index]) {
      index++;
      if (index === query.length) return true;
    }
  }
  return false;
}

function highlightMatch(text, query) {
  if (!query) return text;
  const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
  return text.replace(regex, '<span class="match-highlight">$1</span>');
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Funzioni per il rendering delle card
function renderCompactPrestazioneCard(p) {
  return `
    <div class="card-content">
      <h3>${p.nome}</h3>
      <p><strong>Categoria:</strong> ${p.categoria}</p>
      <p><strong>Descrizione:</strong> ${p.descrizione}</p>
      <p><strong>Sinonimi:</strong> ${p.sinonimi.join(", ")}</p>
      <p><strong>Rimborso:</strong> ${p.rimb_min} / ${p.rimb_max}</p>
    </div>
    <div class="card-footer">
      <button class="expand-btn">Vedi dettagli <i class="fas fa-chevron-down"></i></button>
    </div>
  `;
}

function renderFullPrestazioneCard(p, query = '') {
  // Funzione per evidenziare il testo se presente una query
  const highlightIfNeeded = (text) => query ? highlightMatch(text, query) : text;
  
  return `
    <div class="card-content">
      <h3>${highlightIfNeeded(p.nome)}</h3>
      <div class="card-grid">
        <div><strong>MACRO:</strong> ${highlightIfNeeded(p.macro)}</div>
        <div><strong>%RIMB &lt;2 | &lt;4 - 1°I:</strong> ${highlightIfNeeded(p.rimb_min)}</div>
        <div><strong>%RIMB &gt;2 | &gt;4 - 1°I:</strong> ${highlightIfNeeded(p.rimb_max)}</div>
        <div><strong>MASSIMALE SPECIFICO:</strong> ${highlightIfNeeded(p.massimale_specifico)}</div>
        <div><strong>MASSIMALE GRUPPO:</strong> ${highlightIfNeeded(p.massimale_gruppo)}</div>
        <div><strong>Categoria:</strong> ${highlightIfNeeded(p.categoria)}</div>
        <div><strong>Sinonimi:</strong> ${highlightIfNeeded(p.sinonimi.join(", "))}</div>
        <div><strong>PREVENTIVO – PRESCRIZIONE:</strong> ${highlightIfNeeded(p.preventivo_prescrizione)}</div>
        <div><strong>OPT:</strong> ${highlightIfNeeded(p.opt)}</div>
        <div><strong>VISITA INIZIALE:</strong> ${highlightIfNeeded(p.visita_iniziale)}</div>
        <div><strong>VISITA FINALE:</strong> ${highlightIfNeeded(p.visita_finale)}</div>
        <div><strong>VALUTAZIONE SANITARIA:</strong> ${highlightIfNeeded(p.valutazione_sanitaria)}</div>
      </div>
    </div>
    <div class="card-footer">
      <button class="collapse-btn">Riduci <i class="fas fa-chevron-up"></i></button>
    </div>
  `;
}

function renderMedicinaleCard(m, query = '') {
  const highlightIfNeeded = (text) => query ? highlightMatch(text, query) : text;
  
  return `
    <div class="card-content">
      <h3>${highlightIfNeeded(m.nome)}</h3>
      <p><strong>Descrizione:</strong> ${highlightIfNeeded(m.descrizione)}</p>
      <p><strong>Sinonimi:</strong> ${highlightIfNeeded(m.sinonimi.join(", "))}</p>
      <p><strong>Rimborso:</strong> ${highlightIfNeeded(m.rimborso)}</p>
    </div>
  `;
}

// Ricerca principale
function performSearch() {
  const query = searchInput.value.trim();
  if (!query) {
    resultDiv.innerHTML = `
      <div class="no-results">
        <i class="fas fa-exclamation-circle fa-3x"></i>
        <h3>Inserisci un termine di ricerca</h3>
        <p>Digita una parola chiave nel campo sopra per avviare la ricerca</p>
      </div>
    `;
    return;
  }
  
  const allItems = [
    ...prestazioni.map(item => ({ ...item, type: 'prestazione' })),
    ...medicinali.map(item => ({ ...item, type: 'medicinale' }))
  ];
  
  const results = allItems.filter(item => {
    if (fuzzySearch(query, item.nome)) return true;
    if (item.descrizione && fuzzySearch(query, item.descrizione)) return true;
    if (item.categoria && fuzzySearch(query, item.categoria)) return true;
    if (item.macro && fuzzySearch(query, item.macro)) return true;
    return item.sinonimi.some(sinonimo => fuzzySearch(query, sinonimo));
  });
  
  if (results.length === 0) {
    resultDiv.innerHTML = `
      <div class="no-results">
        <i class="fas fa-search-minus fa-3x"></i>
        <h3>Nessun risultato trovato</h3>
        <p>La tua ricerca per "${query}" non ha prodotto risultati</p>
      </div>
    `;
    return;
  }
  
  let html = '';
  results.forEach(item => {
    if (item.type === 'prestazione') {
      html += `
        <div class="card">
          ${renderFullPrestazioneCard(item, query)}
        </div>
      `;
    } else {
      html += `
        <div class="card">
          ${renderMedicinaleCard(item, query)}
        </div>
      `;
    }
  });
  resultDiv.innerHTML = html;
}

// Render liste
function renderLists() {
  const prestazioniList = document.getElementById('prestazioniList');
  const medicinaliList = document.getElementById('medicinaliList');
  
  prestazioniList.innerHTML = prestazioni.map((p, index) => `
    <div class="card" data-index="${index}">
      ${renderCompactPrestazioneCard(p)}
    </div>
  `).join('');
  
  medicinaliList.innerHTML = medicinali.map(m => `
    <div class="card">
      <div class="card-content">
        <h3>${m.nome}</h3>
        <p><strong>Descrizione:</strong> ${m.descrizione}</p>
        <p><strong>Sinonimi:</strong> ${m.sinonimi.join(", ")}</p>
        <p><strong>Rimborso:</strong> ${m.rimborso}</p>
      </div>
    </div>
  `).join('');
}

// Navigazione tra schede
function setupTabs() {
  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      tabs.forEach(b => b.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).classList.add('active');
    });
  });
}

// Gestione interazioni card
function setupCardInteractions() {
  const prestazioniList = document.getElementById('prestazioniList');
  
  prestazioniList.addEventListener('click', function(e) {
    const card = e.target.closest('.card');
    if (!card) return;
    
    const index = card.dataset.index;
    const p = prestazioni[index];
    
    if (e.target.closest('.expand-btn')) {
      card.innerHTML = renderFullPrestazioneCard(p);
    }
    
    if (e.target.closest('.collapse-btn')) {
      card.innerHTML = renderCompactPrestazioneCard(p);
    }
  });
}

// Inizializzazione
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderLists();
  setupTabs();
  setupCardInteractions();
  themeToggle.addEventListener('click', toggleTheme);
  searchBtn.addEventListener('click', performSearch);
  searchInput.addEventListener('keyup', (e) => e.key === 'Enter' && performSearch());
});