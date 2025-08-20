// SCRIPT.JS
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
    
    // Nascondi la schermata de login e mostra il contenuto
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
  // Dati iniziali - PRESTAZIONI AGGIORNATE
  const prestazioni = [
    {
      nome: "BASTONI CANADESI",
      macro: "Termine sanitario",
      categoria: "PRESIDI ORTOPEDICI (ACQUISTO)",
      massimale_specifico: "300€ - 3 ANNI AD AVENTE DIRITTO",
      massimale_gruppo: "VEDI MASSIMALE SPECIFICO",
      preventivo_prescrizione: "OPT: SI",
      opt: "",
      visita_iniziale: "NO",
      visita_finale: "NO",
      valutazione_sanitaria: "NO",
      sinonimi: ["Bastoni da deambulazione"],
      descrizione: "Bastoni canadesi per deambulazione",
      rimborso: "20%"
    },
    {
      nome: "BUSTO O CORSETTO ORTOPEDICO",
      macro: "Termine sanitario",
      categoria: "PRESIDI ORTOPEDICI (ACQUISTO)",
      massimale_specifico: "300€ - 3 ANNI AD AVENTE DIRITTO",
      massimale_gruppo: "VEDI MASSIMALE SPECIFICO",
      preventivo_prescrizione: "OPT: SI",
      opt: "",
      visita_iniziale: "NO",
      visita_finale: "NO",
      valutazione_sanitaria: "NO",
      sinonimi: ["Bustino ortopedico", "Corsetto", "Tutore del tronco"],
      descrizione: "Busto o corsetto ortopedico",
      rimborso: "20%"
    },
    {
      nome: "CALZATURE ORTOPEDICHE",
      macro: "Termine sanitario",
      categoria: "PRESIDI ORTOPEDICI (ACQUISTO)",
      massimale_specifico: "300€ - 3 ANNI AD AVENTE DIRITTO",
      massimale_gruppo: "VEDI MASSIMALE SPECIFICO",
      preventivo_prescrizione: "OPT: SI",
      opt: "",
      visita_iniziale: "NO",
      visita_finale: "NO",
      valutazione_sanitaria: "NO",
      sinonimi: ["Scarpe ortopediche"],
      descrizione: "Calzature ortopediche",
      rimborso: "20%"
    },
    {
      nome: "CALZE O GAMBALETTI ELASTICI",
      macro: "Termine sanitario",
      categoria: "PRESIDI ORTOPEDICI (ACQUISTO)",
      massimale_specifico: "300€ - 3 ANNI AD AVENTE DIRITTO",
      massimale_gruppo: "VEDI MASSIMALE SPECIFICO",
      preventivo_prescrizione: "OPT: SI",
      opt: "",
      visita_iniziale: "NO",
      visita_finale: "NO",
      valutazione_sanitaria: "NO",
      sinonimi: ["Calze elastiche", "Calze a compressione", "Calze terapeutiche"],
      descrizione: "Calze o gambaletti elastici",
      rimborso: "20%"
    },
    {
      nome: "CARROZZINA PER DEAMBULAZIONE",
      macro: "Termine sanitario",
      categoria: "PRESIDI ORTOPEDICI (ACQUISTO)",
      massimale_specifico: "300€ - 3 ANNI AD AVENTE DIRITTO",
      massimale_gruppo: "VEDI MASSIMALE SPECIFICO",
      preventivo_prescrizione: "OPT: SI",
      opt: "",
      visita_iniziale: "NO",
      visita_finale: "NO",
      valutazione_sanitaria: "NO",
      sinonimi: ["Carrozzella", "Sedia a rotelle"],
      descrizione: "Carrozzina per deambulazione",
      rimborso: "20%"
    },
    {
      nome: "CAVIGLIERA ELASTICA",
      macro: "Termine sanitario",
      categoria: "PRESIDI ORTOPEDICI (ACQUISTO)",
      massimale_specifico: "300€ - 3 ANNI AD AVENTE DIRITTO",
      massimale_gruppo: "VEDI MASSIMALE SPECIFICO",
      preventivo_prescrizione: "OPT: SI",
      opt: "",
      visita_iniziale: "NO",
      visita_finale: "NO",
      valutazione_sanitaria: "NO",
      sinonimi: ["Tutore elastico di caviglia"],
      descrizione: "Cavigliera elastica",
      rimborso: "20%"
    },
    {
      nome: "CINTO ERNIARIO",
      macro: "Termine sanitario",
      categoria: "PRESIDI ORTOPEDICI (ACQUISTO)",
      massimale_specifico: "300€ - 3 ANNI AD AVENTE DIRITTO",
      massimale_gruppo: "VEDI MASSIMALE SPECIFICO",
      preventivo_prescrizione: "OPT: SI",
      opt: "",
      visita_iniziale: "NO",
      visita_finale: "NO",
      valutazione_sanitaria: "NO",
      sinonimi: ["Pancera", "Fascia addominale"],
      descrizione: "Cinto erniario",
      rimborso: "20%"
    },
    {
      nome: "COLLARE CERVICALE",
      macro: "Termine sanitario",
      categoria: "PRESIDI ORTOPEDICI (ACQUISTO)",
      massimale_specifico: "300€ - 3 ANNI AD AVENTE DIRITTO",
      massimale_gruppo: "VEDI MASSIMALE SPECIFICO",
      preventivo_prescrizione: "OPT: SI",
      opt: "",
      visita_iniziale: "NO",
      visita_finale: "NO",
      valutazione_sanitaria: "NO",
      sinonimi: ["Tutore cervicale", "Collare ortopedico"],
      descrizione: "Collare cervicale",
      rimborso: "20%"
    },
    {
      nome: "CUSCINO ORTOPEDICO",
      macro: "Termine sanitario",
      categoria: "PRESIDI ORTOPEDICI (ACQUISTO)",
      massimale_specifico: "300€ - 3 ANNI AD AVENTE DIRITTO",
      massimale_gruppo: "VEDI MASSIMALE SPECIFICO",
      preventivo_prescrizione: "OPT: SI",
      opt: "",
      visita_iniziale: "NO",
      visita_finale: "NO",
      valutazione_sanitaria: "NO",
      sinonimi: ["Cuscino da seduta"],
      descrizione: "Cuscino ortopedico",
      rimborso: "20%"
    },
    {
      nome: "DIVARICATORE",
      macro: "Termine sanitario",
      categoria: "PRESIDI ORTOPEDICI (ACQUISTO)",
      massimale_specifico: "300€ - 3 ANNI AD AVENTE DIRITTO",
      massimale_gruppo: "VEDI MASSIMALE SPECIFICO",
      preventivo_prescrizione: "OPT: SI",
      opt: "",
      visita_iniziale: "NO",
      visita_finale: "NO",
      valutazione_sanitaria: "NO",
      sinonimi: ["Tutore divaricatore"],
      descrizione: "Divaricatore",
      rimborso: "20%"
    },
    {
      nome: "GINOCCHIERA",
      macro: "Termine sanitario",
      categoria: "PRESIDI ORTOPEDICI (ACQUISTO)",
      massimale_specifico: "300€ - 3 ANNI AD AVENTE DIRITTO",
      massimale_gruppo: "VEDI MASSIMALE SPECIFICO",
      preventivo_prescrizione: "OPT: SI",
      opt: "",
      visita_iniziale: "NO",
      visita_finale: "NO",
      valutazione_sanitaria: "NO",
      sinonimi: ["Tutore del ginocchio"],
      descrizione: "Ginocchiera",
      rimborso: "20%"
    },
    {
      nome: "MUTANDA CONTENITIVA",
      macro: "Termine sanitario",
      categoria: "PRESIDI ORTOPEDICI (ACQUISTO)",
      massimale_specifico: "300€ - 3 ANNI AD AVENTE DIRITTO",
      massimale_gruppo: "VEDI MASSIMALE SPECIFICO",
      preventivo_prescrizione: "OPT: SI",
      opt: "",
      visita_iniziale: "NO",
      visita_finale: "NO",
      valutazione_sanitaria: "NO",
      sinonimi: ["Mutanda elastica", "Pancera contenitiva"],
      descrizione: "Mutanda contenitiva",
      rimborso: "20%"
    },
    {
      nome: "PLANTARI ORTOPEDICI",
      macro: "Termine sanitario",
      categoria: "PRESIDI ORTOPEDICI (ACQUISTO)",
      massimale_specifico: "300€ - 3 ANNI AD AVENTE DIRITTO",
      massimale_gruppo: "VEDI MASSIMALE SPECIFICO",
      preventivo_prescrizione: "OPT: SI",
      opt: "",
      visita_iniziale: "NO",
      visita_finale: "NO",
      valutazione_sanitaria: "NO",
      sinonimi: ["Solette ortopediche"],
      descrizione: "Plantari ortopedici",
      rimborso: "20%"
    },
    {
      nome: "RIALZO CALCANEARE",
      macro: "Termine sanitario",
      categoria: "PRESIDI ORTOPEDICI (ACQUISTO)",
      massimale_specifico: "300€ - 3 ANNI AD AVENTE DIRITTO",
      massimale_gruppo: "VEDI MASSIMALE SPECIFICO",
      preventivo_prescrizione: "OPT: SI",
      opt: "",
      visita_iniziale: "NO",
      visita_finale: "NO",
      valutazione_sanitaria: "NO",
      sinonimi: ["Tallonetta", "Zeppa calcaneare"],
      descrizione: "Rialzo calcaneare",
      rimborso: "20%"
    },
    {
      nome: "SOSPENSORIO",
      macro: "Termine sanitario",
      categoria: "PRESIDI ORTOPEDICI (ACQUISTO)",
      massimale_specifico: "300€ - 3 ANNI AD AVENTE DIRITTO",
      massimale_gruppo: "VEDI MASSIMALE SPECIFICO",
      preventivo_prescrizione: "OPT: SI",
      opt: "",
      visita_iniziale: "NO",
      visita_finale: "NO",
      valutazione_sanitaria: "NO",
      sinonimi: ["Tutore sospensorio"],
      descrizione: "Sospensorio",
      rimborso: "20%"
    },
    {
      nome: "TUTORE",
      macro: "Termine sanitario",
      categoria: "PRESIDI ORTOPEDICI (ACQUISTO)",
      massimale_specifico: "300€ - 3 ANNI AD AVENTE DIRITTO",
      massimale_gruppo: "VEDI MASSIMALE SPECIFICO",
      preventivo_prescrizione: "OPT: SI",
      opt: "",
      visita_iniziale: "NO",
      visita_finale: "NO",
      valutazione_sanitaria: "NO",
      sinonimi: ["Tutore articolare"],
      descrizione: "Tutore",
      rimborso: "20%"
    },
    {
      nome: "NON DEFINITO",
      macro: "Termine sanitario",
      categoria: "LENTI GRADUATE",
      massimale_specifico: "300€ - 3 ANNI AD AVENTE DIRITTO",
      massimale_gruppo: "VEDI MASSIMALE SPECIFICO",
      preventivo_prescrizione: "SI TEST VISIVO",
      opt: "NO",
      visita_iniziale: "NO",
      visita_finale: "NO",
      valutazione_sanitaria: "NO",
      sinonimi: [],
      descrizione: "Lenti graduate",
      rimborso: "30%"
    },
    {
      nome: "NON DEFINITO",
      macro: "Termine sanitario",
      categoria: "MEDICINALI",
      massimale_specifico: "300€ ANNO SOLARE - NUCLEO FAMILIARE - FRANCHIGIA 75€",
      massimale_gruppo: "VEDI MASSIMALE SPECIFICO",
      preventivo_prescrizione: "SI",
      opt: "NO",
      visita_iniziale: "NO",
      visita_finale: "NO",
      valutazione_sanitaria: "NO",
      sinonimi: [],
      descrizione: "Medicinali",
      rimborso: "40%"
    },
    {
      nome: "NON DEFINITO",
      macro: "Termine sanitario",
      categoria: "PRESIDI ORTOPEDICI (ADEGUAMENTI)",
      massimale_specifico: "300€ - 3 ANNI AD AVENTE DIRITTO",
      massimale_gruppo: "VEDI MASSIMALE SPECIFICO",
      preventivo_prescrizione: "SI",
      opt: "NO",
      visita_iniziale: "NO",
      visita_finale: "NO",
      valutazione_sanitaria: "NO",
      sinonimi: [],
      descrizione: "Presidi ortopedici (adeguamenti)",
      rimborso: "20%"
    },
    {
      nome: "PORTA IMPRONTE",
      macro: "Termine sanitario",
      categoria: "TERAPIE NON RIMBORSABILI",
      massimale_specifico: "0€",
      massimale_gruppo: "VEDI MASSIMALE SPECIFICO",
      preventivo_prescrizione: "NO",
      opt: "NO",
      visita_iniziale: "NO",
      visita_finale: "NO",
      valutazione_sanitaria: "NO",
      sinonimi: ["porta impronte dentale"],
      descrizione: "Porta impronte",
      rimborso: "0%"
    },
    // Aggiungi qui tutte le altre prestazioni seguendo lo stesso formato...
    // Per ragioni di spazio, mostro solo i primi elementi
  ];

  const medicinali = [
    {
      nome: "NON DEFINITO",
      descrizione: "Medicinale non definito",
      sinonimi: [],
      rimborso: "40%"
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
