// Dati di default
const defaultPrestazioni = {
  "visita": {
    sinonimi: ["controllo", "consulto", "esame medico"],
    categoria: "Visita specialistica",
    rimborso: 50
  },
  "analisi": {
    sinonimi: ["esami", "test", "laboratorio"],
    categoria: "Analisi di laboratorio",
    rimborso: 70
  },
  "radiografia": {
    sinonimi: ["rx", "raggi x", "lastra"],
    categoria: "Esame diagnostico",
    rimborso: 60
  },
  "prova prova": {
    sinonimi: ["puzza puzza"],
    categoria: "Esame diagnostico",
    rimborso: 56
  },
  "ecografia": {
    sinonimi: ["eco", "ultrasuoni", "ecotomografia"],
    categoria: "Esame diagnostico",
    rimborso: 65
  },
  "risonanza": {
    sinonimi: ["rmn", "risonanza magnetica", "rm"],
    categoria: "Esame diagnostico avanzato",
    rimborso: 80
  }
};

const defaultMedicinali = {
  "paracetamolo": {
    sinonimi: ["tachipirina", "efferalgan", "acetaminofene"],
    categoria: "Analgesico antipiretico",
    rimborso: 35
  },
  "ibuprofene": {
    sinonimi: ["brufen", "moment", "nurofen"],
    categoria: "Antinfiammatorio",
    rimborso: 40
  },
  "amoxicillina": {
    sinonimi: ["augmentin", "zimox", "velamox"],
    categoria: "Antibiotico",
    rimborso: 60
  },
  "omeprazolo": {
    sinonimi: ["mepral", "antra", "losec"],
    categoria: "Gastroprotettore",
    rimborso: 45
  }
};

// Variabili globali
let prestazioni = {};
let medicinali = {};
let modalMode = 'add';
let editingKey = null;
let currentSection = 'prestazioni';

// Inizializzazione
document.addEventListener('DOMContentLoaded', function() {
  caricaDati();
  aggiornaTabelle();
  
  // Event listener per i tab
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(sec => sec.classList.remove("active"));
      
      btn.classList.add("active");
      document.getElementById(btn.dataset.tab).classList.add("active");
    });
  });

  // Event listener per il form del modal
  document.getElementById('modalForm').addEventListener('submit', function(e) {
    e.preventDefault();
    salvaVoce();
  });

  // Event listener per la ricerca con Enter
  document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      cerca();
    }
  });

  // Event listener per ricerca in tempo reale
  document.getElementById('searchInput').addEventListener('input', function() {
    if (this.value.length > 2) {
      cerca();
    } else if (this.value.length === 0) {
      document.getElementById('risultato').innerHTML = '';
    }
  });
});

// Gestione dati LocalStorage
function caricaDati() {
  const prestazioniSalvate = localStorage.getItem('prestazioni');
  const medicinaliSalvati = localStorage.getItem('medicinali');
  
  if (prestazioniSalvate) {
    prestazioni = JSON.parse(prestazioniSalvate);
  } else {
    prestazioni = { ...defaultPrestazioni };
    salvaDati();
  }
  
  if (medicinaliSalvati) {
    medicinali = JSON.parse(medicinaliSalvati);
  } else {
    medicinali = { ...defaultMedicinali };
    salvaDati();
  }
}

function salvaDati() {
  localStorage.setItem('prestazioni', JSON.stringify(prestazioni));
  localStorage.setItem('medicinali', JSON.stringify(medicinali));
}

// Funzione di ricerca fuzzy
function fuzzyMatch(needle, haystack, threshold = 0.6) {
  needle = needle.toLowerCase();
  haystack = haystack.toLowerCase();
  
  // Exact match
  if (haystack.includes(needle)) {
    return 1;
  }
  
  // Levenshtein distance
  const distance = levenshteinDistance(needle, haystack);
  const maxLength = Math.max(needle.length, haystack.length);
  const similarity = 1 - (distance / maxLength);
  
  return similarity >= threshold ? similarity : 0;
}

function levenshteinDistance(str1, str2) {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}

// Funzione di ricerca
function cerca() {
  const query = document.getElementById("searchInput").value.trim();
  const risultatoDiv = document.getElementById("risultato");
  
  if (!query) {
    risultatoDiv.innerHTML = '<p style="color: #666; text-align: center;">Inserisci una parola per iniziare la ricerca</p>';
    return;
  }
  
  const risultati = [];
  
  // Cerca nelle prestazioni
  for (let parola in prestazioni) {
    const item = prestazioni[parola];
    let match = fuzzyMatch(query, parola);
    
    // Cerca anche nei sinonimi
    if (item.sinonimi) {
      for (let sinonimo of item.sinonimi) {
        const synonymMatch = fuzzyMatch(query, sinonimo);
        if (synonymMatch > match) {
          match = synonymMatch;
        }
      }
    }
    
    if (match > 0) {
      risultati.push({
        parola,
        ...item,
        match,
        tipo: 'prestazione'
      });
    }
  }
  
  // Cerca nei medicinali
  for (let parola in medicinali) {
    const item = medicinali[parola];
    let match = fuzzyMatch(query, parola);
    
    // Cerca anche nei sinonimi
    if (item.sinonimi) {
      for (let sinonimo of item.sinonimi) {
        const synonymMatch = fuzzyMatch(query, sinonimo);
        if (synonymMatch > match) {
          match = synonymMatch;
        }
      }
    }
    
    if (match > 0) {
      risultati.push({
        parola,
        ...item,
        match,
        tipo: 'medicinale'
      });
    }
  }
  
  // Ordina per rilevanza
  risultati.sort((a, b) => b.match - a.match);
  
  if (risultati.length > 0) {
    let html = '';
    risultati.slice(0, 5).forEach(risultato => {
      html += `
        <div class="result-item">
          <h4>${risultato.parola}</h4>
          <p><strong>Categoria:</strong> ${risultato.categoria}</p>
          <p><strong>Rimborso:</strong> ${risultato.rimborso}%</p>
          ${risultato.sinonimi && risultato.sinonimi.length > 0 ? 
            `<p><strong>Sinonimi:</strong> ${risultato.sinonimi.join(', ')}</p>` : ''}
          <p class="result-source">Fonte: ${risultato.tipo === 'prestazione' ? 'Prestazioni' : 'Medicinali'}</p>
        </div>
      `;
    });
    risultatoDiv.innerHTML = html;
  } else {
    risultatoDiv.innerHTML = '<p style="color: #666; text-align: center;">Nessuna corrispondenza trovata. Prova con parole diverse o controlla l\'ortografia.</p>';
  }
}

// Gestione tabelle
function aggiornaTabelle() {
  aggiornaTabella('prestazioni');
  aggiornaTabella('medicinali');
}

function aggiornaTabella(tipo) {
  const dati = tipo === 'prestazioni' ? prestazioni : medicinali;
  const tbody = tipo === 'prestazioni' ? 
    document.getElementById('corpoTabella') : 
    document.getElementById('corpoTabellaMedicinali');
  
  if (Object.keys(dati).length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 6v6l4 2"></path>
          </svg>
          <h3>Nessun dato disponibile</h3>
          <p>Aggiungi la prima voce cliccando il pulsante sopra</p>
        </td>
      </tr>
    `;
    return;
  }
  
  tbody.innerHTML = '';
  
  for (let parola in dati) {
    const item = dati[parola];
    const row = document.createElement('tr');
    
    row.innerHTML = `
      <td><strong>${parola}</strong></td>
      <td class="synonyms">${item.sinonimi ? item.sinonimi.join(', ') : 'Nessun sinonimo'}</td>
      <td>${item.categoria}</td>
      <td>${item.rimborso}%</td>
      <td>
        <button class="action-btn edit-btn" onclick="modificaVoce('${parola}', '${tipo}')">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          Modifica
        </button>
        <button class="action-btn delete-btn" onclick="eliminaVoce('${parola}', '${tipo}')">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3,6 5,6 21,6"></polyline>
            <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6"></path>
          </svg>
          Elimina
        </button>
      </td>
    `;
    
    tbody.appendChild(row);
  }
}

// Gestione modal
function aggiungiNuovaCategoria(tipo) {
  currentSection = tipo;
  modalMode = 'add';
  editingKey = null;
  
  document.getElementById('modalTitle').textContent = 
    tipo === 'prestazioni' ? 'Aggiungi ora' : 'Aggiungi ora';
  
  // Reset form
  document.getElementById('modalParola').value = '';
  document.getElementById('modalSinonimi').value = '';
  document.getElementById('modalCategoria').value = '';
  document.getElementById('modalRimborso').value = '';
  
  document.getElementById('modal').classList.add('active');
  document.getElementById('modalParola').focus();
}

function modificaVoce(parola, tipo) {
  currentSection = tipo;
  modalMode = 'edit';
  editingKey = parola;
  
  const dati = tipo === 'prestazioni' ? prestazioni : medicinali;
  const item = dati[parola];
  
  document.getElementById('modalTitle').textContent = 
    tipo === 'prestazioni' ? 'Modifica Prestazione' : 'Modifica Medicinale';
  
  // Popola form
  document.getElementById('modalParola').value = parola;
  document.getElementById('modalSinonimi').value = item.sinonimi ? item.sinonimi.join(', ') : '';
  document.getElementById('modalCategoria').value = item.categoria;
  document.getElementById('modalRimborso').value = item.rimborso;
  
  document.getElementById('modal').classList.add('active');
  document.getElementById('modalParola').focus();
}

function eliminaVoce(parola, tipo) {
  if (confirm(`Sei sicuro di voler eliminare "${parola}"?`)) {
    const dati = tipo === 'prestazioni' ? prestazioni : medicinali;
    delete dati[parola];
    salvaDati();
    aggiornaTabella(tipo);
  }
}

function salvaVoce() {
  const parola = document.getElementById('modalParola').value.trim().toLowerCase();
  const sinonimi = document.getElementById('modalSinonimi').value
    .split(',')
    .map(s => s.trim().toLowerCase())
    .filter(s => s.length > 0);
  const categoria = document.getElementById('modalCategoria').value.trim();
  const rimborso = parseInt(document.getElementById('modalRimborso').value);
  
  if (!parola || !categoria || isNaN(rimborso)) {
    alert('Compila tutti i campi obbligatori');
    return;
  }
  
  const dati = currentSection === 'prestazioni' ? prestazioni : medicinali;
  
  // Se stiamo modificando e la parola è cambiata, elimina la vecchia
  if (modalMode === 'edit' && editingKey && editingKey !== parola) {
    delete dati[editingKey];
  }
  
  dati[parola] = {
    sinonimi: sinonimi,
    categoria: categoria,
    rimborso: rimborso
  };
  
  salvaDati();
  aggiornaTabella(currentSection);
  chiudiModal();
}

function chiudiModal() {
  document.getElementById('modal').classList.remove('active');
}

// Event listener per chiudere modal cliccando fuori
document.getElementById('modal').addEventListener('click', function(e) {
  if (e.target === this) {
    chiudiModal();
  }
});

// Event listener per ESC
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    chiudiModal();
  }
});