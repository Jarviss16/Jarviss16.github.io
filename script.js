// Dati iniziali - VERSIONE CORRETTA
const prestazioni = [
    {
        COD: "5. PORT",
        TIPOLOGIA: "Termine sanitario",
        TERMINE: "BASTONI CANADESI",
        CATEGORIA: "PRESIDI ORTOPEDICI (ACQUISTO)",
        RIMBORSO: "20%",
        MASSIMALE_SPECIFICO: "300€ - 3 ANNI AD AVENTE DIRITTO",
        MASSIMALE_GRUPPO: "VEDI MASSIMALE SPECIFICO",
        PREVENTIVO_PRESCRIZIONE: "SI",
        OPT: "NO",
        VISITA_INIZIALE: "NO",
        VISITA_FINALE: "NO",
        VALUTAZIONE_SANITARIA: "",
        SINONIMI: ["Bastoni da deambulazione"]
    },
    {
        COD: "5. PORT",
        TIPOLOGIA: "Termine sanitario",
        TERMINE: "BUSTO O CORSETTO ORTOPEDICO",
        CATEGORIA: "PRESIDI ORTOPEDICI (ACQUISTO)",
        RIMBORSO: "20%",
        MASSIMALE_SPECIFICO: "300€ - 3 ANNI AD AVENTE DIRITTO",
        MASSIMALE_GRUPPO: "VEDI MASSIMALE SPECIFICO",
        PREVENTIVO_PRESCRIZIONE: "",
        OPT: "SI",
        VISITA_INIZIALE: "NO",
        VISITA_FINALE: "NO",
        VALUTAZIONE_SANITARIA: "NO",
        SINONIMI: ["Bustino ortopedico", "Corsetto", "Tutore del tronco"]
    },
    {
        COD: "5. PORT",
        TIPOLOGIA: "Termine sanitario",
        TERMINE: "CALZATURE ORTOPEDICHE",
        CATEGORIA: "PRESIDI ORTOPEDICI (ACQUISTO)",
        RIMBORSO: "20%",
        MASSIMALE_SPECIFICO: "300€ - 3 ANNI AD AVENTE DIRITTO",
        MASSIMALE_GRUPPO: "VEDI MASSIMALE SPECIFICO",
        PREVENTIVO_PRESCRIZIONE: "",
        OPT: "SI",
        VISITA_INIZIALE: "NO",
        VISITA_FINALE: "NO",
        VALUTAZIONE_SANITARIA: "NO",
        SINONIMI: ["Scarpe ortopediche"]
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
    }
];

// Elementi DOM
const themeToggle = document.getElementById('themeToggle');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultDiv = document.getElementById('result');
const tabs = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.tab-content');

// Inizializzazione dell'applicazione
function initApp() {
    initTheme();
    renderLists();
    setupTabs();
    
    // Aggiungi event listeners
    themeToggle.addEventListener('click', toggleTheme);
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', (e) => e.key === 'Enter' && performSearch());
}

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
    if (!query || !text) return false;
    query = query.toLowerCase();
    text = text.toLowerCase();
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
    if (!query || !text) return text;
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
    
    // Attiva la scheda di ricerca
    tabs.forEach(btn => btn.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));
    document.querySelector('[data-tab="ricerca"]').classList.add('active');
    document.getElementById('ricerca').classList.add('active');
    
    const allItems = [
        ...prestazioni.map(item => ({ ...item, type: 'prestazione' })),
        ...medicinali.map(item => ({ ...item, type: 'medicinale' }))
    ];
    
    const results = allItems.filter(item => {
        if (fuzzySearch(query, item.TERMINE || item.nome)) return true;
        if (item.COD && fuzzySearch(query, item.COD)) return true;
        if (item.TIPOLOGIA && fuzzySearch(query, item.TIPOLOGIA)) return true;
        if (item.CATEGORIA && fuzzySearch(query, item.CATEGORIA)) return true;
        if (item.SINONIMI && item.SINONIMI.some(sinonimo => fuzzySearch(query, sinonimo))) return true;
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
            const highlightedCod = highlightMatch(item.COD, query);
            const highlightedTipologia = highlightMatch(item.TIPOLOGIA, query);
            const highlightedTermine = highlightMatch(item.TERMINE, query);
            const highlightedCat = highlightMatch(item.CATEGORIA, query);
            const highlightedRimborso = highlightMatch(item.RIMBORSO, query);
            const highlightedMassimaleSpec = highlightMatch(item.MASSIMALE_SPECIFICO, query);
            const highlightedMassimaleGruppo = highlightMatch(item.MASSIMALE_GRUPPO, query);
            const highlightedPrevPrescr = highlightMatch(item.PREVENTIVO_PRESCRIZIONE, query);
            const highlightedOpt = highlightMatch(item.OPT, query);
            const highlightedVisitaIniz = highlightMatch(item.VISITA_INIZIALE, query);
            const highlightedVisitaFin = highlightMatch(item.VISITA_FINALE, query);
            const highlightedValutazione = highlightMatch(item.VALUTAZIONE_SANITARIA, query);
            const highlightedSyn = item.SINONIMI.map(s => highlightMatch(s, query)).join(", ");
            
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
        <div class="card" data-id="${p.COD}">
            <h3>${p.TERMINE}</h3>
            <div class="prestazione-details">
                <div><strong>COD:</strong> ${p.COD}</div>
                <div><strong>TIPOLOGIA:</strong> ${p.TIPOLOGIA}</div>
                <div><strong>TERMINE:</strong> ${p.TERMINE}</div>
                <div><strong>CATEGORIA:</strong> ${p.CATEGORIA}</div>
                <div><strong>% RIMBORSO:</strong> ${p.RIMBORSO}</div>
                <div><strong>MASSIMALE SPECIFICO:</strong> ${p.MASSIMALE_SPECIFICO}</div>
                <div><strong>MASSIMALE GRUPPO:</strong> ${p.MASSIMALE_GRUPPO}</div>
                <div><strong>PREVENTIVO – PRESCRIZIONE:</strong> ${p.PREVENTIVO_PRESCRIZIONE}</div>
                <div><strong>OPT:</strong> ${p.OPT}</div>
                <div><strong>VISITA INIZIALE:</strong> ${p.VISITA_INIZIALE}</div>
                <div><strong>VISITA FINALE:</strong> ${p.VISITA_FINALE}</div>
                <div><strong>VALUTAZIONE SANITARIA:</strong> ${p.VALUTAZIONE_SANITARIA}</div>
                <div><strong>SINONIMI:</strong> ${p.SINONIMI.join(", ")}</div>
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
            const prestazione = prestazioni.find(p => p.COD === cod);
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
                <h3>${prestazione.TERMINE}</h3>
                <div class="detail-grid">
                    <div><strong>COD:</strong> ${prestazione.COD}</div>
                    <div><strong>TIPOLOGIA:</strong> ${prestazione.TIPOLOGIA}</div>
                    <div><strong>TERMINE:</strong> ${prestazione.TERMINE}</div>
                    <div><strong>CATEGORIA:</strong> ${prestazione.CATEGORIA}</div>
                    <div><strong>% RIMBORSO:</strong> ${prestazione.RIMBORSO}</div>
                    <div><strong>MASSIMALE SPECIFICO:</strong> ${prestazione.MASSIMALE_SPECIFICO}</div>
                    <div><strong>MASSIMALE GRUPPO:</strong> ${prestazione.MASSIMALE_GRUPPO}</div>
                    <div><strong>PREVENTIVO – PRESCRIZIONE:</strong> ${prestazione.PREVENTIVO_PRESCRIZIONE}</div>
                    <div><strong>OPT:</strong> ${prestazione.OPT}</div>
                    <div><strong>VISITA INIZIALE:</strong> ${prestazione.VISITA_INIZIALE}</div>
                    <div><strong>VISITA FINALE:</strong> ${prestazione.VISITA_FINALE}</div>
                    <div><strong>VALUTAZIONE SANITARIA:</strong> ${prestazione.VALUTAZIONE_SANITARIA}</div>
                    <div><strong>SINONIMI:</strong> ${prestazione.SINONIMI.join(", ")}</div>
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

// Inizializza l'applicazione quando il DOM è pronto
document.addEventListener('DOMContentLoaded', initApp);