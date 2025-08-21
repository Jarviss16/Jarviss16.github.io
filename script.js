// Password di accesso (MODIFICA QUESTA CON LA TUA PASSWORD)
const APP_PASSWORD = "Fondazioneatm2025";

// Elementi per il login
const loginScreen = document.getElementById('login-screen');
const contentDiv = document.getElementById('content');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');
const loginError = document.getElementById('login-error');

// Funzione di login
function login() {
  const password = passwordInput.value.trim();
  
  if (password === APP_PASSWORD) {
    // Salva lo stato di autenticazione in sessionStorage
    sessionStorage.setItem('authenticated', 'true');
    
    // Nascondi la schermata di login e mostra il contenuto
    loginScreen.style.display = 'none';
    contentDiv.style.display = 'block';
    
    // Avvia l'applicazione
    initApp();
  } else {
    // Mostra messaggio di errore
    loginError.textContent = "Password errata. Riprova.";
    loginError.style.display = 'block';
    
    // Animazione di errore
    passwordInput.style.animation = 'shake 0.5s';
    setTimeout(() => {
      passwordInput.style.animation = '';
    }, 500);
    
    // Svuota il campo e rimetti il focus
    passwordInput.value = '';
    passwordInput.focus();
  }
}

// Controlla se l'utente è già autenticato
function checkAuth() {
  const isAuthenticated = sessionStorage.getItem('authenticated') === 'true';
  
  if (isAuthenticated) {
    loginScreen.style.display = 'none';
    contentDiv.style.display = 'block';
    initApp();
  } else {
    // Focus sul campo password
    passwordInput.focus();
    
    // Abilita login con Enter
    passwordInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        login();
      }
    });
    
    // Listener per il pulsante de login
    loginBtn.addEventListener('click', login);
  }
}

// Avvia l'applicazione principale
function initApp() {
  // Dati iniziali
  const prestazioni = [
    {
      cod: "VC001",
      tipologia: "Visita specialistica",
      termine: "Visita cardiologica",
      categoria: "Cardiologia",
      rimborso: "70%",
      massimale_specifico: "€ 120",
      massimale_gruppo: "€ 500",
      preventivo_prescrizione: "Prescrizione obbligatoria",
      opt: "No",
      visita_iniziale: "Sì",
      visita_finale: "No",
      valutazione_sanitaria: "Sì",
      sinonimi: ["cardiologia", "check-up cuore", "visita cuore"]
    },
    {
      cod: "RA002",
      tipologia: "Esame diagnostico",
      termine: "Radiografia torace",
      categoria: "Radiologia",
      rimborso: "50%",
      massimale_specifico: "€ 80",
      massimale_gruppo: "€ 300",
      preventivo_prescrizione: "Prescrizione obbligatoria",
      opt: "Sì",
      visita_iniziale: "No",
      visita_finale: "No",
      valutazione_sanitaria: "No",
      sinonimi: ["lastra torace", "rx torace", "radiografia polmoni"]
    },
    {
      cod: "ES003",
      tipologia: "Esame di laboratorio",
      termine: "Analisi del sangue completo",
      categoria: "Laboratorio",
      rimborso: "60%",
      massimale_specifico: "€ 50",
      massimale_gruppo: "€ 200",
      preventivo_prescrizione: "Prescrizione consigliata",
      opt: "Sì",
      visita_iniziale: "No",
      visita_finale: "No",
      valutazione_sanitaria: "No",
      sinonimi: ["esame sangue", "emocromo", "prelievo sangue"]
    },
    {
      cod: "EC004",
      tipologia: "Esame diagnostico",
      termine: "Ecografia addominale",
      categoria: "Ecografia",
      rimborso: "55%",
      massimale_specifico: "€ 90",
      massimale_gruppo: "€ 350",
      preventivo_prescrizione: "Prescrizione obbligatoria",
      opt: "Sì",
      visita_iniziale: "No",
      visita_finale: "No",
      valutazione_sanitaria: "No",
      sinonimi: ["eco addome", "ultrasuoni addome", "ecografia addome"]
    },
    {
      cod: "VD005",
      tipologia: "Visita specialistica",
      termine: "Visita dermatologica",
      categoria: "Dermatologia",
      rimborso: "65%",
      massimale_specifico: "€ 100",
      massimale_gruppo: "€ 400",
      preventivo_prescrizione: "Prescrizione obbligatoria",
      opt: "No",
      visita_iniziale: "Sì",
      visita_finale: "No",
      valutazione_sanitaria: "Sì",
      sinonimi: ["controllo pelle", "esame dermatologico", "visita pelle"]
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
      if (fuzzySearch(query, item.termine || item.nome)) return true;
      if (item.cod && fuzzySearch(query, item.cod)) return true;
      if (item.tipologia && fuzzySearch(query, item.tipologia)) return true;
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
        const highlightedCod = highlightMatch(item.cod, query);
        const highlightedTipologia = highlightMatch(item.tipologia, query);
        const highlightedTermine = highlightMatch(item.termine, query);
        const highlightedCat = highlightMatch(item.categoria, query);
        const highlightedRimborso = highlightMatch(item.rimborso, query);
        const highlightedMassimaleSpec = highlightMatch(item.massimale_specifico, query);
        const highlightedMassimaleGruppo = highlightMatch(item.massimale_gruppo, query);
        const highlightedPrevPrescr = highlightMatch(item.preventivo_prescrizione, query);
        const highlightedOpt = highlightMatch(item.opt, query);
        const highlightedVisitaIniz = highlightMatch(item.visita_iniziale, query);
        const highlightedVisitaFin = highlightMatch(item.visita_finale, query);
        const highlightedValutazione = highlightMatch(item.valutazione_sanitaria, query);
        const highlightedSyn = item.sinonimi.map(s => highlightMatch(s, query)).join(", ");
        
        html += `
          <div class="card detailed-card">
            <h3>${highlightedTermine} <span class="search-type">(Prestazione)</span></h3>
            <div class="detail-grid">
              <div><strong>COD:</strong> ${highlightedCod}</div>
              <div><strong>TIPOLOGIA:</strong> ${highlightedTipologia}</div>
              <div><strong>TERMINE:</strong> ${highlightedTermine}</div>
              <div><strong>CATEGORIA:</strong> ${highlightedCat}</div>
              <div><strong>% RIMBORSO:</strong> ${highlightedRimborso}</div>
              <div><strong>MASSIMALE SPECIFICO:</strong> ${highlightedMassimaleSpec}</div>
              <div><strong>MASSIMALE GRUPPO:</strong> ${highlightedMassimaleGruppo}</div>
              <div><strong>PREVENTIVO – PRESCRIZIONE:</strong> ${highlightedPrevPrescr}</div>
              <div><strong>OPT:</strong> ${highlightedOpt}</div>
              <div><strong>VISITA INIZIALE:</strong> ${highlightedVisitaIniz}</div>
              <div><strong>VISITA FINALE:</strong> ${highlightedVisitaFin}</div>
              <div><strong>VALUTAZIONE SANITARIA:</strong> ${highlightedValutazione}</div>
              <div><strong>SINONIMI:</strong> ${highlightedSyn}</div>
            </div>
          </div>
        `;
      } else {
        const highlightedNome = highlightMatch(item.nome, query);
        const highlightedDesc = highlightMatch(item.descrizione, query);
        const highlightedSyn = item.sinonimi.map(s => highlightMatch(s, query)).join(", ");
        const highlightedRimborso = highlightMatch(item.rimborso, query);
        
        html += `
          <div class="card">
            <h3>${highlightedNome} <span class="search-type">(Medicinale)</span></h3>
            <p><strong>Descrizione:</strong> ${highlightedDesc}</p>
            <p><strong>Sinonimi:</strong> ${highlightedSyn}</p>
            <p><strong>Rimborso:</strong> ${highlightedRimborso}</p>
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
      <div class="card" data-id="${p.cod}">
        <h3>${p.termine}</h3>
        <div class="prestazione-details">
          <div><strong>COD:</strong> ${p.cod}</div>
          <div><strong>TIPOLOGIA:</strong> ${p.tipologia}</div>
          <div><strong>TERMINE:</strong> ${p.termine}</div>
          <div><strong>CATEGORIA:</strong> ${p.categoria}</div>
          <div><strong>% RIMBORSO:</strong> ${p.rimborso}</div>
          <div><strong>MASSIMALE SPECIFICO:</strong> ${p.massimale_specifico}</div>
          <div><strong>MASSIMALE GRUPPO:</strong> ${p.massimale_gruppo}</div>
          <div><strong>PREVENTIVO – PRESCRIZIONE:</strong> ${p.preventivo_prescrizione}</div>
          <div><strong>OPT:</strong> ${p.opt}</div>
          <div><strong>VISITA INIZIALE:</strong> ${p.visita_iniziale}</div>
          <div><strong>VISITA FINALE:</strong> ${p.visita_finale}</div>
          <div><strong>VALUTAZIONE SANITARIA:</strong> ${p.valutazione_sanitaria}</div>
          <div><strong>SINONIMI:</strong> ${p.sinonimi.join(", ")}</div>
        </div>
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
        const cod = card.dataset.id;
        const prestazione = prestazioni.find(p => p.cod === cod);
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
          <h3>${prestazione.termine}</h3>
          <div class="detail-grid">
            <div><strong>COD:</strong> ${prestazione.cod}</div>
            <div><strong>TIPOLOGIA:</strong> ${prestazione.tipologia}</div>
            <div><strong>TERMINE:</strong> ${prestazione.termine}</div>
            <div><strong>CATEGORIA:</strong> ${prestazione.categoria}</div>
            <div><strong>% RIMBORSO:</strong> ${prestazione.rimborso}</div>
            <div><strong>MASSIMALE SPECIFICO:</strong> ${prestazione.massimale_specifico}</div>
            <div><strong>MASSIMALE GRUPPO:</strong> ${prestazione.massimale_gruppo}</div>
            <div><strong>PREVENTIVO – PRESCRIZIONE:</strong> ${prestazione.preventivo_prescrizione}</div>
            <div><strong>OPT:</strong> ${prestazione.opt}</div>
            <div><strong>VISITA INIZIALE:</strong> ${prestazione.visita_iniziale}</div>
            <div><strong>VISITA FINALE:</strong> ${prestazione.visita_finale}</div>
            <div><strong>VALUTAZIONE SANITARIA:</strong> ${prestazione.valutazione_sanitaria}</div>
            <div><strong>SINONIMI:</strong> ${prestazione.sinonimi.join(", ")}</div>
          </div>
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

  // Inizializzazione dell'app
  initTheme();
  renderLists();
  setupTabs();
  themeToggle.addEventListener('click', toggleTheme);
  searchBtn.addEventListener('click', performSearch);
  searchInput.addEventListener('keyup', (e) => e.key === 'Enter' && performSearch());
}

// Controlla l'autenticazione al caricamento della pagina
document.addEventListener('DOMContentLoaded', checkAuth);