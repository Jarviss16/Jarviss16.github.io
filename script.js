// Dati iniziali
const prestazioni = [
  {
    nome: "Visita cardiologica",
    macro: "Cardiologia",
    rimb_sotto2: "70%",
    rimb_sopra2: "50%",
    massimale_specifico: "€ 120",
    massimale_gruppo: "€ 500",
    categoria: "Specialistica",
    sinonimi: ["cardiologia", "check-up cuore"],
    preventivo_prescrizione: "Prescrizione obbligatoria",
    opt: "No",
    visita_iniziale: "Sì",
    visita_finale: "No",
    valutazione_sanitaria: "Sì",
    descrizione: "Controllo medico specializzato sul cuore",
    rimborso: "Sì, con ticket (70%)"
  },
  {
    nome: "Radiografia",
    macro: "Diagnostica per immagini",
    rimb_sotto2: "50%",
    rimb_sopra2: "30%",
    massimale_specifico: "€ 80",
    massimale_gruppo: "€ 300",
    categoria: "Diagnostica",
    sinonimi: ["lastra", "rx"],
    preventivo_prescrizione: "Prescrizione obbligatoria",
    opt: "Sì",
    visita_iniziale: "No",
    visita_finale: "No",
    valutazione_sanitaria: "No",
    descrizione: "Esame diagnostico con raggi X",
    rimborso: "Sì, con ticket (50%)"
  },
  {
    nome: "Analisi del sangue",
    macro: "Laboratorio",
    rimb_sotto2: "60%",
    rimb_sopra2: "40%",
    massimale_specifico: "€ 50",
    massimale_gruppo: "€ 200",
    categoria: "Esami",
    sinonimi: ["esami sangue", "emocromo"],
    preventivo_prescrizione: "Prescrizione consigliata",
    opt: "Sì",
    visita_iniziale: "No",
    visita_finale: "No",
    valutazione_sanitaria: "No",
    descrizione: "Prelievo e analisi di laboratorio",
    rimborso: "Sì, con ticket (60%)"
  },
  {
    nome: "Ecografia addominale",
    macro: "Diagnostica per immagini",
    rimb_sotto2: "55%",
    rimb_sopra2: "35%",
    massimale_specifico: "€ 90",
    massimale_gruppo: "€ 350",
    categoria: "Diagnostica",
    sinonimi: ["eco addome", "ultrasuoni addome"],
    preventivo_prescrizione: "Prescrizione obbligatoria",
    opt: "Sì",
    visita_iniziale: "No",
    visita_finale: "No",
    valutazione_sanitaria: "No",
    descrizione: "Esame diagnostico non invasivo degli organi addominali",
    rimborso: "Sì, con ticket (55%)"
  },
  {
    nome: "Visita dermatologica",
    macro: "Dermatologia",
    rimb_sotto2: "65%",
    rimb_sopra2: "45%",
    massimale_specifico: "€ 100",
    massimale_gruppo: "€ 400",
    categoria: "Specialistica",
    sinonimi: ["controllo pelle", "esame dermatologico"],
    preventivo_prescrizione: "Prescrizione obbligatoria",
    opt: "No",
    visita_iniziale: "Sì",
    visita_finale: "No",
    valutazione_sanitaria: "Sì",
    descrizione: "Controllo specialistico per problemi della pelle",
    rimborso: "Sì, con ticket (65%)"
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
    const highlightedNome = highlightMatch(item.nome, query);
    const highlightedDesc = highlightMatch(item.descrizione, query);
    const highlightedSyn = item.sinonimi.map(s => highlightMatch(s, query)).join(", ");
    
    if (item.type === 'prestazione') {
      const highlightedMacro = highlightMatch(item.macro, query);
      const highlightedRimbSotto2 = highlightMatch(item.rimb_sotto2, query);
      const highlightedRimbSopra2 = highlightMatch(item.rimb_sopra2, query);
      const highlightedMassimaleSpec = highlightMatch(item.massimale_specifico, query);
      const highlightedMassimaleGruppo = highlightMatch(item.massimale_gruppo, query);
      const highlightedCat = highlightMatch(item.categoria, query);
      const highlightedPrevPrescr = highlightMatch(item.preventivo_prescrizione, query);
      const highlightedOpt = highlightMatch(item.opt, query);
      const highlightedVisitaIniz = highlightMatch(item.visita_iniziale, query);
      const highlightedVisitaFin = highlightMatch(item.visita_finale, query);
      const highlightedValutazione = highlightMatch(item.valutazione_sanitaria, query);
      
      html += `
        <div class="card detailed-card">
          <h3>${highlightedNome} <span class="search-type">(Prestazione)</span></h3>
          <div class="detail-grid">
            <div><strong>MACRO:</strong> ${highlightedMacro}</div>
            <div><strong>%RIMB &lt;2 | &lt;4 - 1°I:</strong> ${highlightedRimbSotto2}</div>
            <div><strong>%RIMB &gt;2 | &gt;4 - 1°I:</strong> ${highlightedRimbSopra2}</div>
            <div><strong>MASSIMALE SPECIFICO:</strong> ${highlightedMassimaleSpec}</div>
            <div><strong>MASSIMALE GRUPPO:</strong> ${highlightedMassimaleGruppo}</div>
            <div><strong>CATEGORIA:</strong> ${highlightedCat}</div>
            <div><strong>SINONIMI:</strong> ${highlightedSyn}</div>
            <div><strong>PREVENTIVO – PRESCRIZIONE:</strong> ${highlightedPrevPrescr}</div>
            <div><strong>OPT:</strong> ${highlightedOpt}</div>
            <div><strong>VISITA INIZIALE:</strong> ${highlightedVisitaIniz}</div>
            <div><strong>VISITA FINALE:</strong> ${highlightedVisitaFin}</div>
            <div><strong>VALUTAZIONE SANITARIA:</strong> ${highlightedValutazione}</div>
          </div>
          <p><strong>Descrizione:</strong> ${highlightedDesc}</p>
          <p><strong>Rimborso:</strong> ${item.rimborso}</p>
        </div>
      `;
    } else {
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

// Render liste
function renderLists() {
  const prestazioniList = document.getElementById('prestazioniList');
  const medicinaliList = document.getElementById('medicinaliList');
  
  prestazioniList.innerHTML = prestazioni.map(p => `
    <div class="card" data-id="${p.nome}">
      <h3>${p.nome}</h3>
      <p><strong>Categoria:</strong> ${p.categoria}</p>
      <p><strong>Descrizione:</strong> ${p.descrizione}</p>
      <p><strong>Sinonimi:</strong> ${p.sinonimi.join(", ")}</p>
      <p><strong>Rimborso:</strong> ${p.rimborso}</p>
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
  
  // Event listener per aprire il dettaglio
  document.querySelectorAll('#prestazioniList .card').forEach(card => {
    card.addEventListener('click', () => {
      const nome = card.dataset.id;
      const prestazione = prestazioni.find(p => p.nome === nome);
      showPrestazioneDetail(prestazione);
    });
  });
}

// Mostra dettaglio prestazione in modal
function showPrestazioneDetail(prestazione) {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal">
      <button class="close-modal">&times;</button>
      <div class="modal-content">
        <h3>${prestazione.nome}</h3>
        <div class="detail-grid">
          <div><strong>MACRO:</strong> ${prestazione.macro}</div>
          <div><strong>%RIMB &lt;2 | &lt;4 - 1°I:</strong> ${prestazione.rimb_sotto2}</div>
          <div><strong>%RIMB &gt;2 | &gt;4 - 1°I:</strong> ${prestazione.rimb_sopra2}</div>
          <div><strong>MASSIMALE SPECIFICO:</strong> ${prestazione.massimale_specifico}</div>
          <div><strong>MASSIMALE GRUPPO:</strong> ${prestazione.massimale_gruppo}</div>
          <div><strong>CATEGORIA:</strong> ${prestazione.categoria}</div>
          <div><strong>SINONIMI:</strong> ${prestazione.sinonimi.join(", ")}</div>
          <div><strong>PREVENTIVO – PRESCRIZIONE:</strong> ${prestazione.preventivo_prescrizione}</div>
          <div><strong>OPT:</strong> ${prestazione.opt}</div>
          <div><strong>VISITA INIZIALE:</strong> ${prestazione.visita_iniziale}</div>
          <div><strong>VISITA FINALE:</strong> ${prestazione.visita_finale}</div>
          <div><strong>VALUTAZIONE SANITARIA:</strong> ${prestazione.valutazione_sanitaria}</div>
        </div>
        <p><strong>Descrizione:</strong> ${prestazione.descrizione}</p>
        <p><strong>Rimborso:</strong> ${prestazione.rimborso}</p>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Chiudi modal al click sulla X
  modal.querySelector('.close-modal').addEventListener('click', () => {
    modal.remove();
  });
  
  // Chiudi modal al click fuori dal contenuto
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
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
});