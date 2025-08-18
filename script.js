// Dati aggiornati con tutti i campi richiesti
const prestazioni = [
  {
    nome: "Visita cardiologica",
    macro: "Cardiologia",
    rimb_lt2: "70%",
    rimb_gt2: "60%",
    massimale_specifico: "€ 120",
    massimale_gruppo: "€ 500",
    categoria: "Visite specialistiche",
    sinonimi: ["cardiologia", "check-up cuore"],
    preventivo_prescrizione: "Prescrizione obbligatoria",
    opt: "No",
    visita_iniziale: "Sì",
    visita_finale: "Sì",
    valutazione_sanitaria: "Obbligatoria",
    descrizione: "Controllo medico specializzato sul cuore"
  },
  {
    nome: "Radiografia",
    macro: "Diagnostica per immagini",
    rimb_lt2: "50%",
    rimb_gt2: "40%",
    massimale_specifico: "€ 80",
    massimale_gruppo: "€ 300",
    categoria: "Esami diagnostici",
    sinonimi: ["lastra", "rx"],
    preventivo_prescrizione: "Prescrizione obbligatoria",
    opt: "Sì",
    visita_iniziale: "No",
    visita_finale: "No",
    valutazione_sanitaria: "Facoltativa",
    descrizione: "Esame diagnostico con raggi X"
  },
  {
    nome: "Analisi del sangue",
    macro: "Laboratorio",
    rimb_lt2: "60%",
    rimb_gt2: "50%",
    massimale_specifico: "€ 40",
    massimale_gruppo: "€ 200",
    categoria: "Esami di laboratorio",
    sinonimi: ["esami sangue", "emocromo"],
    preventivo_prescrizione: "Prescrizione obbligatoria",
    opt: "Sì",
    visita_iniziale: "No",
    visita_finale: "No",
    valutazione_sanitaria: "Obbligatoria",
    descrizione: "Prelievo e analisi di laboratorio"
  },
  {
    nome: "Ecografia addominale",
    macro: "Diagnostica per immagini",
    rimb_lt2: "55%",
    rimb_gt2: "45%",
    massimale_specifico: "€ 90",
    massimale_gruppo: "€ 350",
    categoria: "Esami diagnostici",
    sinonimi: ["eco addome", "ultrasuoni addome"],
    preventivo_prescrizione: "Prescrizione obbligatoria",
    opt: "Sì",
    visita_iniziale: "No",
    visita_finale: "No",
    valutazione_sanitaria: "Facoltativa",
    descrizione: "Esame diagnostico non invasivo degli organi addominali"
  },
  {
    nome: "Visita dermatologica",
    macro: "Dermatologia",
    rimb_lt2: "65%",
    rimb_gt2: "55%",
    massimale_specifico: "€ 100",
    massimale_gruppo: "€ 400",
    categoria: "Visite specialistiche",
    sinonimi: ["controllo pelle", "esame dermatologico"],
    preventivo_prescrizione: "Prescrizione obbligatoria",
    opt: "No",
    visita_iniziale: "Sì",
    visita_finale: "Sì",
    valutazione_sanitaria: "Obbligatoria",
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
const modal = document.getElementById('prestazioneModal');
const modalBody = document.getElementById('modalBody');
const closeModalBtn = document.querySelector('.close-modal');

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
    if (item.sinonimi && item.sinonimi.some(sinonimo => fuzzySearch(query, sinonimo))) return true;
    return false;
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
      html += renderFullPrestazione(item, query);
    } else {
      const highlightedNome = highlightMatch(item.nome, query);
      const highlightedDesc = highlightMatch(item.descrizione, query);
      const highlightedSyn = item.sinonimi.map(s => highlightMatch(s, query)).join(", ");
      
      html += `
        <div class="card">
          <h3>${highlightedNome} <span class="search-type">(Medicinale)</span></h3>
          <p><strong>Descrizione:</strong> ${highlightedDesc}</p>
          <p><strong>Sinonimi:</strong> ${highlightedSyn}</p>
          <p><strong>Rimborso:</strong> ${item.rimborso}</p>
        </div>
      `;
    }
  });
  resultDiv.innerHTML = html;
}

// Render compact card per lista prestazioni
function renderCompactPrestazione(p) {
  return `
    <div class="card compact" data-id="${p.nome}">
      <h3>${p.nome}</h3>
      <p><strong>Categoria:</strong> ${p.categoria}</p>
      <p><strong>Descrizione:</strong> ${p.descrizione}</p>
      <p><strong>Sinonimi:</strong> ${p.sinonimi.join(", ")}</p>
      <p><strong>Rimborso:</strong> &lt;2: ${p.rimb_lt2}, &gt;2: ${p.rimb_gt2}</p>
    </div>
  `;
}

// Render full card per modal e ricerca
function renderFullPrestazione(p, query = null) {
  const highlightIfNeeded = (text) => {
    return query ? highlightMatch(text, query) : text;
  };

  return `
    <div class="card expanded">
      <h3>${highlightIfNeeded(p.nome)} <span class="search-type">(Prestazione)</span></h3>
      <div class="details-grid">
        <div><strong>MACRO:</strong> ${highlightIfNeeded(p.macro)}</div>
        <div><strong>%RIMB &lt;2 | &lt;4 - 1°I:</strong> ${highlightIfNeeded(p.rimb_lt2)}</div>
        <div><strong>%RIMB &gt;2 | &gt;4 - 1°I:</strong> ${highlightIfNeeded(p.rimb_gt2)}</div>
        <div><strong>MASSIMALE SPECIFICO:</strong> ${highlightIfNeeded(p.massimale_specifico)}</div>
        <div><strong>MASSIMALE GRUPPO:</strong> ${highlightIfNeeded(p.massimale_gruppo)}</div>
        <div><strong>CATEGORIA:</strong> ${highlightIfNeeded(p.categoria)}</div>
        <div><strong>SINONIMI:</strong> ${p.sinonimi.map(s => highlightIfNeeded(s)).join(", ")}</div>
        <div><strong>PREVENTIVO – PRESCRIZIONE:</strong> ${highlightIfNeeded(p.preventivo_prescrizione)}</div>
        <div><strong>OPT:</strong> ${highlightIfNeeded(p.opt)}</div>
        <div><strong>VISITA INIZIALE:</strong> ${highlightIfNeeded(p.visita_iniziale)}</div>
        <div><strong>VISITA FINALE:</strong> ${highlightIfNeeded(p.visita_finale)}</div>
        <div><strong>VALUTAZIONE SANITARIA:</strong> ${highlightIfNeeded(p.valutazione_sanitaria)}</div>
      </div>
    </div>
  `;
}

// Render liste
function renderLists() {
  const prestazioniList = document.getElementById('prestazioniList');
  const medicinaliList = document.getElementById('medicinaliList');
  
  prestazioniList.innerHTML = prestazioni.map(renderCompactPrestazione).join('');
  
  medicinaliList.innerHTML = medicinali.map(m => `
    <div class="card">
      <h3>${m.nome}</h3>
      <p><strong>Descrizione:</strong> ${m.descrizione}</p>
      <p><strong>Sinonimi:</strong> ${m.sinonimi.join(", ")}</p>
      <p><strong>Rimborso:</strong> ${m.rimborso}</p>
    </div>
  `).join('');
}

// Modal functions
function openModal(prestazione) {
  modalBody.innerHTML = renderFullPrestazione(prestazione);
  modal.style.display = "block";
  document.body.classList.add('modal-open');
}

function closeModal() {
  modal.style.display = "none";
  document.body.classList.remove('modal-open');
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

// Inizializzazione
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderLists();
  setupTabs();
  
  // Event listeners
  themeToggle.addEventListener('click', toggleTheme);
  searchBtn.addEventListener('click', performSearch);
  searchInput.addEventListener('keyup', (e) => e.key === 'Enter' && performSearch());
  closeModalBtn.addEventListener('click', closeModal);
  
  // Click outside modal to close
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  // Card click handler for prestazioni
  document.getElementById('prestazioniList').addEventListener('click', (e) => {
    const card = e.target.closest('.card.compact');
    if (card) {
      const id = card.dataset.id;
      const prestazione = prestazioni.find(p => p.nome === id);
      if (prestazione) {
        openModal(prestazione);
      }
    }
  });
});