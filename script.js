// Dati iniziali aggiornati con nuove proprietà
const prestazioni = [
  {
    nome: "Visita cardiologica",
    macro: "Cardiologia",
    rimbMinore: "70%",
    rimbMaggiore: "90%",
    massimaleSpec: "€ 150",
    massimaleGruppo: "€ 500",
    categoria: "Specialistica",
    sinonimi: ["cardiologia", "check-up cuore"],
    preventivo: "No",
    opt: "Sì",
    visitaIniziale: "Sì",
    visitaFinale: "Sì",
    valutazioneSanitaria: "Sì",
    descrizione: "Controllo medico specializzato sul cuore"
  },
  {
    nome: "Radiografia",
    macro: "Diagnostica per immagini",
    rimbMinore: "50%",
    rimbMaggiore: "80%",
    massimaleSpec: "€ 100",
    massimaleGruppo: "€ 300",
    categoria: "Diagnostica",
    sinonimi: ["lastra", "rx"],
    preventivo: "Sì",
    opt: "Sì",
    visitaIniziale: "No",
    visitaFinale: "No",
    valutazioneSanitaria: "No",
    descrizione: "Esame diagnostico con raggi X"
  },
  {
    nome: "Analisi del sangue",
    macro: "Laboratorio",
    rimbMinore: "60%",
    rimbMaggiore: "85%",
    massimaleSpec: "€ 80",
    massimaleGruppo: "€ 250",
    categoria: "Laboratorio",
    sinonimi: ["esami sangue", "emocromo"],
    preventivo: "No",
    opt: "Sì",
    visitaIniziale: "No",
    visitaFinale: "No",
    valutazioneSanitaria: "Sì",
    descrizione: "Prelievo e analisi di laboratorio"
  }
];

const medicinali = [
  // ... (invariato)
];

// Elementi DOM
const themeToggle = document.getElementById('themeToggle');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultDiv = document.getElementById('result');
const tabs = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.tab-content');

// Modal
const detailModal = document.getElementById('detailModal');
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
    if (fuzzySearch(query, item.descrizione)) return true;
    if (item.categoria && fuzzySearch(query, item.categoria)) return true;
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
      html += getPrestazioneFullHTML(item, query);
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

// Genera HTML completo per prestazione
function getPrestazioneFullHTML(p, query = null) {
  const highlight = (text) => {
    if (!query || !text) return text;
    return highlightMatch(text, query);
  };
  
  return `
    <div class="card">
      <h3>${highlight(p.nome)} <span class="search-type">(Prestazione)</span></h3>
      <p><strong>MACRO:</strong> ${highlight(p.macro)}</p>
      <p><strong>%RIMB &lt;2 | &lt;4 - 1°I:</strong> ${highlight(p.rimbMinore)}</p>
      <p><strong>%RIMB &gt;2 | &gt;4 - 1°I:</strong> ${highlight(p.rimbMaggiore)}</p>
      <p><strong>MASSIMALE SPECIFICO:</strong> ${highlight(p.massimaleSpec)}</p>
      <p><strong>MASSIMALE GRUPPO:</strong> ${highlight(p.massimaleGruppo)}</p>
      <p><strong>CATEGORIA:</strong> ${highlight(p.categoria)}</p>
      <p><strong>SINONIMI:</strong> ${highlight(p.sinonimi.join(", "))}</p>
      <p><strong>PREVENTIVO – PRESCRIZIONE:</strong> ${highlight(p.preventivo)}</p>
      <p><strong>OPT:</strong> ${highlight(p.opt)}</p>
      <p><strong>VISITA INIZIALE:</strong> ${highlight(p.visitaIniziale)}</p>
      <p><strong>VISITA FINALE:</strong> ${highlight(p.visitaFinale)}</p>
      <p><strong>VALUTAZIONE SANITARIA:</strong> ${highlight(p.valutazioneSanitaria)}</p>
    </div>
  `;
}

// Render liste
function renderLists() {
  const prestazioniList = document.getElementById('prestazioniList');
  const medicinaliList = document.getElementById('medicinaliList');
  
  prestazioniList.innerHTML = prestazioni.map((p, index) => `
    <div class="card prestazione-card" data-id="${index}">
      <h3>${p.nome}</h3>
      <p><strong>Categoria:</strong> ${p.categoria}</p>
      <p><strong>Descrizione:</strong> ${p.descrizione}</p>
      <p><strong>Sinonimi:</strong> ${p.sinonimi.join(", ")}</p>
      <p><strong>Rimborso:</strong> ${p.rimbMinore} (minore) | ${p.rimbMaggiore} (maggiore)</p>
    </div>
  `).join('');
  
  medicinaliList.innerHTML = medicinali.map(m => `
    <div class="card">
      <h3>${m.nome}</h3>
      <p><strong>Descrizione:</strong> ${m.descrizione}</p>
      <p><strong>Sinonimi:</strong> ${m.sinonimi.join(", ")}</p>
      <p><strong>Rimborso:</strong> ${m.rimborso}</p>
    </div>
  `).join('');
  
  // Aggiungi event listener per le card delle prestazioni
  document.querySelectorAll('.prestazione-card').forEach(card => {
    card.addEventListener('click', function() {
      const id = this.getAttribute('data-id');
      openDetailModal(prestazioni[id]);
    });
  });
}

// Modal functions
function openDetailModal(prestazione) {
  modalBody.innerHTML = `
    <h2>${prestazione.nome}</h2>
    <p><strong>MACRO:</strong> ${prestazione.macro}</p>
    <p><strong>%RIMB &lt;2 | &lt;4 - 1°I:</strong> ${prestazione.rimbMinore}</p>
    <p><strong>%RIMB &gt;2 | &gt;4 - 1°I:</strong> ${prestazione.rimbMaggiore}</p>
    <p><strong>MASSIMALE SPECIFICO:</strong> ${prestazione.massimaleSpec}</p>
    <p><strong>MASSIMALE GRUPPO:</strong> ${prestazione.massimaleGruppo}</p>
    <p><strong>CATEGORIA:</strong> ${prestazione.categoria}</p>
    <p><strong>SINONIMI:</strong> ${prestazione.sinonimi.join(", ")}</p>
    <p><strong>PREVENTIVO – PRESCRIZIONE:</strong> ${prestazione.preventivo}</p>
    <p><strong>OPT:</strong> ${prestazione.opt}</p>
    <p><strong>VISITA INIZIALE:</strong> ${prestazione.visitaIniziale}</p>
    <p><strong>VISITA FINALE:</strong> ${prestazione.visitaFinale}</p>
    <p><strong>VALUTAZIONE SANITARIA:</strong> ${prestazione.valutazioneSanitaria}</p>
    <p><strong>Descrizione:</strong> ${prestazione.descrizione}</p>
  `;
  detailModal.style.display = 'block';
}

function closeModal() {
  detailModal.style.display = 'none';
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
  
  themeToggle.addEventListener('click', toggleTheme);
  searchBtn.addEventListener('click', performSearch);
  searchInput.addEventListener('keyup', (e) => e.key === 'Enter' && performSearch());
  
  closeModalBtn.addEventListener('click', closeModal);
  window.addEventListener('click', (e) => {
    if (e.target === detailModal) closeModal();
  });
});