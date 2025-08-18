// Dati iniziali
const prestazioni = [
  {
    nome: "Visita cardiologica",
    descrizione: "Controllo medico specializzato sul cuore",
    sinonimi: ["cardiologia", "check-up cuore"],
    rimborso: "70%"
  },
  {
    nome: "Radiografia",
    descrizione: "Esame diagnostico con raggi X",
    sinonimi: ["lastra", "rx"],
    rimborso: "50%"
  },
  {
    nome: "Analisi del sangue",
    descrizione: "Prelievo e analisi di laboratorio",
    sinonimi: ["esami sangue", "emocromo"],
    rimborso: "60%"
  },
  {
    nome: "Ecografia addominale",
    descrizione: "Esame diagnostico non invasivo degli organi addominali",
    sinonimi: ["eco addome", "ultrasuoni addome"],
    rimborso: "55%"
  },
  {
    nome: "Visita dermatologica",
    descrizione: "Controllo specialistico per problemi della pelle",
    sinonimi: ["controllo pelle", "esame dermatologico"],
    rimborso: "65%"
  },
    {
    nome: "Visita cardiologica",
    descrizione: "Controllo medico specializzato sul cuore",
    sinonimi: ["cardiologia", "check-up cuore"],
    rimborso: "70%"
  },
  {
    nome: "Radiografia",
    descrizione: "Esame diagnostico con raggi X",
    sinonimi: ["lastra", "rx"],
    rimborso: "50%"
  },
  {
    nome: "Analisi del sangue",
    descrizione: "Prelievo e analisi di laboratorio",
    sinonimi: ["esami sangue", "emocromo"],
    rimborso: "60%"
  },
  {
    nome: "Ecografia addominale",
    descrizione: "Esame diagnostico non invasivo degli organi addominali",
    sinonimi: ["eco addome", "ultrasuoni addome"],
    rimborso: "55%"
  },
  {
    nome: "Visita dermatologica",
    descrizione: "Controllo specialistico per problemi della pelle",
    sinonimi: ["controllo pelle", "esame dermatologico"],
    rimborso: "65%"
  },
    {
    nome: "Visita cardiologica",
    descrizione: "Controllo medico specializzato sul cuore",
    sinonimi: ["cardiologia", "check-up cuore"],
    rimborso: "70%"
  },
  {
    nome: "Radiografia",
    descrizione: "Esame diagnostico con raggi X",
    sinonimi: ["lastra", "rx"],
    rimborso: "50%"
  },
  {
    nome: "Analisi del sangue",
    descrizione: "Prelievo e analisi di laboratorio",
    sinonimi: ["esami sangue", "emocromo"],
    rimborso: "60%"
  },
  {
    nome: "Ecografia addominale",
    descrizione: "Esame diagnostico non invasivo degli organi addominali",
    sinonimi: ["eco addome", "ultrasuoni addome"],
    rimborso: "55%"
  },
  {
    nome: "Visita dermatologica",
    descrizione: "Controllo specialistico per problemi della pelle",
    sinonimi: ["controllo pelle", "esame dermatologico"],
    rimborso: "65%"
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

// Dark mode implementation
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

// Funzione per la ricerca fuzzy
function fuzzySearch(query, text) {
  query = query.toLowerCase();
  text = text.toLowerCase();
  
  if (!query) return false;
  
  // Controllo per corrispondenza esatta
  if (text.includes(query)) return true;
  
  // Controllo per corrispondenza fuzzy
  let index = 0;
  for (const char of text) {
    if (char === query[index]) {
      index++;
      if (index === query.length) return true;
    }
  }
  return false;
}

// Funzione per evidenziare le corrispondenze
function highlightMatch(text, query) {
  if (!query) return text;
  
  const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
  return text.replace(regex, '<span class="match-highlight">$1</span>');
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Funzione ricerca
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
    
    html += `
      <div class="card">
        <h3>${highlightedNome} <span class="search-type">(${item.type === 'prestazione' ? 'Prestazione' : 'Medicinale'})</span></h3>
        <p><strong>Descrizione:</strong> ${highlightedDesc}</p>
        <p><strong>Sinonimi:</strong> ${highlightedSyn}</p>
        <p><strong>Rimborso:</strong> ${item.rimborso}</p>
      </div>
    `;
  });
  
  resultDiv.innerHTML = html;
}

// Riempimento delle liste
function renderLists() {
  const prestazioniList = document.getElementById('prestazioniList');
  const medicinaliList = document.getElementById('medicinaliList');
  
  prestazioniList.innerHTML = prestazioni.map(p => `
    <div class="card">
      <h3>${p.nome}</h3>
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
  searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') performSearch();
  });
});
