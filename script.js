// Dati iniziali prestazioni aggiornati con nuovi campi
const prestazioni = [
  {
    nome: "Visita cardiologica",
    macro: "Cardiologia",
    rimborsoMinore: "70%",
    rimborsoMaggiore: "80%",
    massimaleSpecifico: "€ 120",
    massimaleGruppo: "€ 500",
    categoria: "Cardiologia",
    sinonimi: ["cardiologia", "check-up cuore"],
    preventivoPrescrizione: "Prescrizione medica necessaria",
    opt: "Sì",
    visitaIniziale: "Obbligatoria",
    visitaFinale: "Non necessaria",
    valutazioneSanitaria: "Richiesta",
    descrizione: "Controllo medico specializzato sul cuore",
    rimborso: "Sì, con ticket (70%)"
  },
  {
    nome: "Radiografia",
    macro: "Diagnostica per immagini",
    rimborsoMinore: "50%",
    rimborsoMaggiore: "60%",
    massimaleSpecifico: "€ 80",
    massimaleGruppo: "€ 400",
    categoria: "Diagnostica per immagini",
    sinonimi: ["lastra", "rx"],
    preventivoPrescrizione: "Prescrizione medica necessaria",
    opt: "No",
    visitaIniziale: "Obbligatoria",
    visitaFinale: "Non necessaria",
    valutazioneSanitaria: "Richiesta",
    descrizione: "Esame diagnostico con raggi X",
    rimborso: "Sì, con ticket (50%)"
  },
  {
    nome: "Analisi del sangue",
    macro: "Laboratorio",
    rimborsoMinore: "60%",
    rimborsoMaggiore: "70%",
    massimaleSpecifico: "€ 40",
    massimaleGruppo: "€ 250",
    categoria: "Laboratorio",
    sinonimi: ["esami sangue", "emocromo"],
    preventivoPrescrizione: "Prescrizione medica necessaria",
    opt: "Sì",
    visitaIniziale: "Obbligatoria",
    visitaFinale: "Non necessaria",
    valutazioneSanitaria: "Richiesta",
    descrizione: "Prelievo e analisi di laboratorio",
    rimborso: "Sì, con ticket (60%)"
  },
  {
    nome: "Ecografia addominale",
    macro: "Diagnostica per immagini",
    rimborsoMinore: "55%",
    rimborsoMaggiore: "65%",
    massimaleSpecifico: "€ 90",
    massimaleGruppo: "€ 350",
    categoria: "Diagnostica per immagini",
    sinonimi: ["eco addome", "ultrasuoni addome"],
    preventivoPrescrizione: "Prescrizione medica necessaria",
    opt: "Sì",
    visitaIniziale: "Obbligatoria",
    visitaFinale: "Non necessaria",
    valutazioneSanitaria: "Richiesta",
    descrizione: "Esame diagnostico non invasivo degli organi addominali",
    rimborso: "Sì, con ticket (55%)"
  },
  {
    nome: "Visita dermatologica",
    macro: "Dermatologia",
    rimborsoMinore: "65%",
    rimborsoMaggiore: "75%",
    massimaleSpecifico: "€ 100",
    massimaleGruppo: "€ 450",
    categoria: "Dermatologia",
    sinonimi: ["controllo pelle", "esame dermatologico"],
    preventivoPrescrizione: "Prescrizione medica necessaria",
    opt: "Sì",
    visitaIniziale: "Obbligatoria",
    visitaFinale: "Non necessaria",
    valutazioneSanitaria: "Richiesta",
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
  results.forEach((item, index) => {
    const highlightedNome = highlightMatch(item.nome, query);
    const highlightedDesc = highlightMatch(item.descrizione, query);
    const highlightedSyn = item.sinonimi.map(s => highlightMatch(s, query)).join(", ");
    
    if (item.type === 'prestazione') {
      const highlightedCat = highlightMatch(item.categoria, query);
      html += `
        <div class="card compact-view" data-id="${index}">
          <h3>${highlightedNome} <span class="search-type">(Prestazione)</span></h3>
          <p><strong>Categoria:</strong> ${highlightedCat}</p>
          <p><strong>Descrizione:</strong> ${highlightedDesc}</p>
          <p><strong>Sinonimi:</strong> ${highlightedSyn}</p>
          <p><strong>Rimborso:</strong> ${item.rimborso}</p>
        </div>
      `;
    } else {
      html += `
        <div class="card" data-id="${index}">
          <h3>${highlightedNome} <span class="search-type">(Medicinale)</span></h3>
          <p><strong>Descrizione:</strong> ${highlightedDesc}</p>
          <p><strong>Sinonimi:</strong> ${highlightedSyn}</p>
          <p><strong>Rimborso:</strong> ${item.rimborso}</p>
        </div>
      `;
    }
  });
  
  resultDiv.innerHTML = html;
  
  // Aggiungi event listener per aprire dettagli completi
  resultDiv.querySelectorAll('.card').forEach((card, index) => {
    card.addEventListener('click', () => {
      if (results[index].type === 'prestazione') {
        showFullDetails(results[index]);
      }
    });
  });
}

// Mostra dettagli completi prestazione
function showFullDetails(item) {
  // Crea l'HTML con tutti i dettagli
  const html = `
    <div class="card full-details">
      <h3>${item.nome} <span class="search-type">(Prestazione)</span></h3>
      
      <div class="details-grid">
        <div><strong>MACRO:</strong> ${item.macro}</div>
        <div><strong>%RIMB &lt;2 | &lt;4 - 1°I:</strong> ${item.rimborsoMinore}</div>
        <div><strong>%RIMB &gt;2 | &gt;4 - 1°I:</strong> ${item.rimborsoMaggiore}</div>
        <div><strong>MASSIMALE SPECIFICO:</strong> ${item.massimaleSpecifico}</div>
        <div><strong>MASSIMALE GRUPPO:</strong> ${item.massimaleGruppo}</div>
        <div><strong>CATEGORIA:</strong> ${item.categoria}</div>
        <div><strong>SINONIMI:</strong> ${item.sinonimi.join(", ")}</div>
        <div><strong>PREVENTIVO – PRESCRIZIONE:</strong> ${item.preventivoPrescrizione}</div>
        <div><strong>OPT:</strong> ${item.opt}</div>
        <div><strong>VISITA INIZIALE:</strong> ${item.visitaIniziale}</div>
        <div><strong>VISITA FINALE:</strong> ${item.visitaFinale}</div>
        <div><strong>VALUTAZIONE SANITARIA:</strong> ${item.valutazioneSanitaria}</div>
      </div>
      
      <p><strong>Descrizione:</strong> ${item.descrizione}</p>
      <p><strong>Rimborso:</strong> ${item.rimborso}</p>
      
      <button class="back-to-results">
        <i class="fas fa-arrow-left"></i> Torna ai risultati
      </button>
    </div>
  `;
  
  // Aggiorna la sezione risultato
  resultDiv.innerHTML = html;
  
  // Aggiungi event listener al bottone "Torna ai risultati"
  const backButton = document.querySelector('.back-to-results');
  backButton.addEventListener('click', () => {
    performSearch();
  });
}

// Render liste
function renderLists() {
  const prestazioniList = document.getElementById('prestazioniList');
  const medicinaliList = document.getElementById('medicinaliList');
  
  // Prestazioni - vista compatta
  prestazioniList.innerHTML = prestazioni.map((p, index) => `
    <div class="card compact-view" data-id="${index}">
      <h3>${p.nome}</h3>
      <p><strong>Categoria:</strong> ${p.categoria}</p>
      <p><strong>Descrizione:</strong> ${p.descrizione}</p>
      <p><strong>Sinonimi:</strong> ${p.sinonimi.join(", ")}</p>
      <p><strong>Rimborso:</strong> ${p.rimborso}</p>
    </div>
  `).join('');
  
  // Aggiungi event listener per aprire dettagli
  document.querySelectorAll('#prestazioniList .card').forEach(card => {
    card.addEventListener('click', () => {
      const id = parseInt(card.dataset.id);
      showFullDetails(prestazioni[id]);
      
      // Passa alla scheda Ricerca
      tabs.forEach(btn => btn.classList.remove('active'));
      contents.forEach(content => content.classList.remove('active'));
      document.querySelector('[data-tab="ricerca"]').classList.add('active');
      document.getElementById('ricerca').classList.add('active');
    });
  });
  
  // Medicinali (invariato)
  medicinaliList.innerHTML = medicinali.map(m => `
    <div class="card">
      <h3>${m.nome}</h3>
      <p><strong>Descrizione:</strong> ${m.descrizione}</p>
      <p><strong>Sinonimi:</strong> ${m.sinonimi.join(", ")}</p>
      <p><strong>Rimborso:</strong> ${m.rimborso}</p>
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
      
      // Se siamo nella scheda ricerca e non c'è query, mostra lo stato iniziale
      if (btn.dataset.tab === 'ricerca' && !searchInput.value.trim()) {
        resultDiv.innerHTML = `
          <div class="no-results">
            <i class="fas fa-search fa-3x"></i>
            <h3>Inizia la tua ricerca</h3>
            <p>Digita un termine nel campo di ricerca per trovare prestazioni o medicinali</p>
          </div>
        `;
      }
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