<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistema di Ricerca Prestazioni Sanitarie</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background-color: #f0f2f5;
            color: #333;
            line-height: 1.6;
            padding: 20px;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        header {
            text-align: center;
            margin-bottom: 30px;
            padding: 20px;
            background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
            color: white;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        
        h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
        }
        
        .description {
            font-size: 1.1rem;
            max-width: 800px;
            margin: 0 auto;
        }
        
        .search-container {
            display: flex;
            margin-bottom: 30px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            border-radius: 50px;
            overflow: hidden;
        }
        
        #searchInput {
            flex: 1;
            padding: 15px 25px;
            border: none;
            font-size: 1.1rem;
            outline: none;
        }
        
        #searchBtn {
            padding: 15px 25px;
            background-color: #4CAF50;
            color: white;
            border: none;
            cursor: pointer;
            font-size: 1.1rem;
            transition: background-color 0.3s;
        }
        
        #searchBtn:hover {
            background-color: #45a049;
        }
        
        .prestazioni-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 20px;
        }
        
        .card {
            background: white;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }
        
        .card h3 {
            color: #2c3e50;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 2px solid #f0f2f5;
        }
        
        .prestazione-details div {
            margin-bottom: 10px;
            padding: 5px 0;
        }
        
        .prestazione-details strong {
            color: #6a11cb;
        }
        
        .match-highlight {
            background-color: #ffeb3b;
            font-weight: bold;
            padding: 0 2px;
            border-radius: 3px;
        }
        
        .no-results {
            text-align: center;
            grid-column: 1 / -1;
            padding: 40px;
            color: #7f8c8d;
        }
        
        .no-results i {
            margin-bottom: 20px;
            color: #bdc3c7;
        }
        
        footer {
            text-align: center;
            margin-top: 40px;
            padding: 20px;
            color: #7f8c8d;
            font-size: 0.9rem;
        }
        
        @media (max-width: 768px) {
            .prestazioni-container {
                grid-template-columns: 1fr;
            }
            
            .search-container {
                flex-direction: column;
                border-radius: 10px;
            }
            
            #searchInput, #searchBtn {
                width: 100%;
                border-radius: 0;
            }
            
            #searchInput {
                border-radius: 10px 10px 0 0;
            }
            
            #searchBtn {
                border-radius: 0 0 10px 10px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Sistema di Ricerca Prestazioni Sanitarie</h1>
            <p class="description">Cerca tra le prestazioni sanitarie disponibili per trovare informazioni su codici, tipologie, rimborsi e massimali</p>
        </header>
        
        <div class="search-container">
            <input type="text" id="searchInput" placeholder="Cerca per termine, codice, categoria...">
            <button id="searchBtn"><i class="fas fa-search"></i> Cerca</button>
        </div>
        
        <div id="prestazioniList" class="prestazioni-container">
            <!-- I risultati della ricerca verranno visualizzati qui -->
        </div>
        
        <footer>
            <p>© 2023 Sistema di Ricerca Prestazioni Sanitarie</p>
        </footer>
    </div>

    <script>
    // Normalizza proprietà oggetto prestazioni in minuscolo e underscore
    function normalizePrestazione(obj) {
        const norm = {};
        Object.entries(obj).forEach(([k, v]) => {
            let key = k.trim().toLowerCase().replace(/[\s\-.]+/g, "_").replace(/_+/g, "_");
            if (key === "preventivo_–_prescrizione" || key === "preventivo_-_prescrizione" || key === "preventivo___prescrizione") key = "preventivo_prescrizione";
            if (key === "massimale__specifico") key = "massimale_specifico";
            if (key === "massimale__gruppo") key = "massimale_gruppo";
            if (key === "valutazione_sanitaria_") key = "valutazione_sanitaria";
            if (key === "opt:") key = "opt";
            if (key === "visita_iniziale:") key = "visita_iniziale";
            if (key === "visita_finale:") key = "visita_finale";
            if (key === "massimale_gruppo:") key = "massimale_gruppo";
            if (key === "rimborso:") key = "rimborso";
            if (key === "massimale_specifico:") key = "massimale_specifico";
            if (key === "categoria:") key = "categoria";
            if (key === "sinonimi" && typeof v === 'string') {
                v = v.split(',').map(s => s.trim()).filter(Boolean);
            }
            norm[key] = v == null ? '' : v;
        });
        [
            'cod','tipologia','termine','categoria','rimborso','massimale_specifico','massimale_gruppo',
            'preventivo_prescrizione','opt','visita_iniziale','visita_finale',
            'valutazione_sanitaria','sinonimi'
        ].forEach(key => {
            if (!norm[key]) {
                norm[key] = (key === 'sinonimi') ? [] : '';
            }
        });
        return norm;
    }

    // Avvia l'applicazione principale
    function initApp() {
        // Array corretto di prestazioni
        const rawPrestazioni = [
          {
            "COD": "5PORT",
            "TIPOLOGIA": "Termine sanitario",
            "TERMINE": "BASTONI CANADESI",
            "CATEGORIA": "PRESIDI ORTOPEDICI (ACQUISTO)",
            "RIMBORSO": "20%",
            "MASSIMALE_SPECIFICO": "300eur - 3 ANNI AD AVENTE DIRITTO",
            "MASSIMALE_GRUPPO": "VEDI MASSIMALE SPECIFICO",
            "PREVENTIVO_PRESCRIZIONE": "SI",
            "OPT": "NO",
            "VISITA_INIZIALE": "NO",
            "VISITA_FINALE": "NO",
            "VALUTAZIONE_SANITARIA": "",
            "SINONIMI": "Bastoni da deambulazione"
          },
          {
            "COD": "5PORT",
            "TIPOLOGIA": "Termine sanitario",
            "TERMINE": "BUSTO O CORSETTO ORTOPEDICO",
            "CATEGORIA": "PRESIDI ORTOPEDICI (ACQUISTO)",
            "RIMBORSO": "20%",
            "MASSIMALE_SPECIFICO": "300eur - 3 ANNI AD AVENTE DIRITTO",
            "MASSIMALE_GRUPPO": "VEDI MASSIMALE SPECIFICO",
            "PREVENTIVO_PRESCRIZIONE": "",
            "OPT": "SI",
            "VISITA_INIZIALE": "NO",
            "VISITA_FINALE": "NO",
            "VALUTAZIONE_SANITARIA": "NO",
            "SINONIMI": "Bustino ortopedico, Corsetto, Tutore del tronco"
          },
          {
            "COD": "5PORT",
            "TIPOLOGIA": "Termine sanitario",
            "TERMINE": "CALZATURE ORTOPEDICHE",
            "CATEGORIA": "PRESIDI ORTOPEDICI (ACQUISTO)",
            "RIMBORSO": "20%",
            "MASSIMALE_SPECIFICO": "300eur - 3 ANNI AD AVENTE DIRITTO",
            "MASSIMALE_GRUPPO": "VEDI MASSIMALE SPECIFICO",
            "PREVENTIVO_PRESCRIZIONE": "",
            "OPT": "SI",
            "VISITA_INIZIALE": "NO",
            "VISITA_FINALE": "NO",
            "VALUTAZIONE_SANITARIA": "NO",
            "SINONIMI": "Scarpe ortopediche"
          },
          {
            "COD": "5PORT",
            "TIPOLOGIA": "Termine sanitario",
            "TERMINE": "CALZE O GAMBALETTI ELASTICI",
            "CATEGORIA": "PRESIDI ORTOPEDICI (ACQUISTO)",
            "RIMBORSO": "20%",
            "MASSIMALE_SPECIFICO": "300eur - 3 ANNI AD AVENTE DIRITTO",
            "MASSIMALE_GRUPPO": "VEDI MASSIMALE SPECIFICO",
            "PREVENTIVO_PRESCRIZIONE": "",
            "OPT": "SI",
            "VISITA_INIZIALE": "NO",
            "VISITA_FINALE": "NO",
            "VALUTAZIONE_SANITARIA": "NO",
            "SINONIMI": "Calze elastiche, Calze a compressione, Calze terapeutiche"
          },
          {
            "COD": "5. PORT",
            "TIPOLOGIA": "Termine sanitario",
            "TERMINE": "CARROZZINA PER DEAMBULAZIONE",
            "CATEGORIA": "PRESIDI ORTOPEDICI (ACQUISTO)",
            "RIMBORSO": "20%",
            "MASSIMALE_SPECIFICO": "300eur - 3 ANNI AD AVENTE DIRITTO",
            "MASSIMALE_GRUPPO": "VEDI MASSIMALE SPECIFICO",
            "PREVENTIVO_PRESCRIZIONE": "",
            "OPT": "SI",
            "VISITA_INIZIALE": "NO",
            "VISITA_FINALE": "NO",
            "VALUTAZIONE_SANITARIA": "NO",
            "SINONIMI": "Carrozzella, Sedia a rotelle"
          },
          {
            "COD": "5. PORT",
            "TIPOLOGIA": "Termine sanitario",
            "TERMINE": "CAVIGLIERA ELASTICA",
            "CATEGORIA": "PRESIDI ORTOPEDICI (ACQUISTO)",
            "RIMBORSO": "20%",
            "MASSIMALE_SPECIFICO": "300eur - 3 ANNI AD AVENTE DIRITTO",
            "MASSIMALE_GRUPPO": "VEDI MASSIMALE SPECIFICO",
            "PREVENTIVO_PRESCRIZIONE": "",
            "OPT": "SI",
            "VISITA_INIZIALE": "NO",
            "VISITA_FINALE": "NO",
            "VALUTAZIONE_SANITARIA": "NO",
            "SINONIMI": "Tutore elastico di caviglia"
          },
          {
            "COD": "5. PORT",
            "TIPOLOGIA": "Termine sanitario",
            "TERMINE": "CINTO ERNIARIO",
            "CATEGORIA": "PRESIDI ORTOPEDICI (ACQUISTO)",
            "RIMBORSO": "20%",
            "MASSIMALE_SPECIFICO": "300eur - 3 ANNI AD AVENTE DIRITTO",
            "MASSIMALE_GRUPPO": "VEDI MASSIMALE SPECIFICO",
            "PREVENTIVO_PRESCRIZIONE": "",
            "OPT": "SI",
            "VISITA_INIZIALE": "NO",
            "VISITA_FINALE": "NO",
            "VALUTAZIONE_SANITARIA": "NO",
            "SINONIMI": "Pancera, Fascia addominale"
          },
          {
            "COD": "5. PORT",
            "TIPOLOGIA": "Termine sanitario",
            "TERMINE": "COLLARE CERVICALE",
            "CATEGORIA": "PRESIDI ORTOPEDICI (ACQUISTO)",
            "RIMBORSO": "20%",
            "MASSIMALE_SPECIFICO": "300eur - 3 ANNI AD AVENTE DIRITTO",
            "MASSIMALE_GRUPPO": "VEDI MASSIMALE SPECIFICO",
            "PREVENTIVO_PRESCRIZIONE": "",
            "OPT": "SI",
            "VISITA_INIZIALE": "NO",
            "VISITA_FINALE": "NO",
            "VALUTAZIONE_SANITARIA": "NO",
            "SINONIMI": "Tutore cervicale, Collare ortopedico"
          },
          {
            "COD": "5. PORT",
            "TIPOLOGIA": "Termine sanitario",
            "TERMINE": "CUSCINO_ORTOPEDICO",
            "CATEGORIA": "PRESIDI ORTOPEDICI (ACQUISTO)",
            "RIMBORSO": "20%",
            "MASSIMALE_SPECIFICO": "300eur - 3 ANNI AD AVENTE DIRITTO",
            "MASSIMALE_GRUPPO": "VEDI MASSIMALE SPECIFICO",
            "PREVENTIVO_PRESCRIZIONE": "",
            "OPT": "SI",
            "VISITA_INIZIALE": "NO",
            "VISITA_FINALE": "NO",
            "VALUTAZIONE_SANITARIA": "NO",
            "SINONIMI": "Cuscino da seduta"
          },
          {
            "COD": "5. PORT",
            "TIPOLOGIA": "Termine sanitario",
            "TERMINE": "DIVARICATORE",
            "CATEGORIA": "PRESIDI ORTOPEDICI (ACQUISTO)",
            "RIMBORSO": "20%",
            "MASSIMALE_SPECIFICO": "300eur - 3 ANNI AD AVENTE DIRITTO",
            "MASSIMALE_GRUPPO": "VEDI MASSIMALE SPECIFICO",
            "PREVENTIVO_PRESCRIZIONE": "",
            "OPT": "SI",
            "VISITA_INIZIALE": "NO",
            "VISITA_FINALE": "NO",
            "VALUTAZIONE_SANITARIA": "NO",
            "SINONIMI": "Tutore divaricatore"
          },
          {
            "COD": "5. PORT",
            "TIPOLOGIA": "Termine sanitario",
            "TERMINE": "GINOCCHIERA",
            "CATEGORIA": "PRESIDI ORTOPEDICI (ACQUISTO)",
            "RIMBORSO": "20%",
            "MASSIMALE_SPECIFICO": "300eur - 3 ANNI AD AVENTE DIRITTO",
            "MASSIMALE_GRUPPO": "VEDI MASSIMALE SPECIFICO",
            "PREVENTIVO_PRESCRIZIONE": "",
            "OPT": "SI",
            "VISITA_INIZIALE": "NO",
            "VISITA_FINALE": "NO",
            "VALUTAZIONE_SANITARIA": "NO",
            "SINONIMI": "Tutore del ginocchio"
          },
          {
            "COD": "1.3 APP",
            "TIPOLOGIA": "Termine sanitario",
            "TERMINE": "VISITA CONTROLLO ORTODONZIA",
            "CATEGORIA": "ORTODONZIA",
            "RIMBORSO": "10% ; > 2 ANNI ; > 4 ANNI 1 ISCRIZIONE 20% ; < 2 ANNI ; < 4 ANNI 1 ISCRIZIONE",
            "MASSIMALE_SPECIFICO": "MAX 500eur  ARCATA",
            "MASSIMALE_GRUPPO": "1) 3000eur",
            "PREVENTIVO_PRESCRIZIONE": "NO",
            "OPT": "NO",
            "VISITA_INIZIALE": "NO",
            "VISITA_FINALE": "NO",
            "VALUTAZIONE_SANITARIA": "NO",
            "SINONIMI": ""
          }
        ];

        // Normalizza tutte le proprietà
        const prestazioni = rawPrestazioni.map(normalizePrestazione);

        // Elementi DOM
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        const prestazioniList = document.getElementById('prestazioniList');

        // Funzioni di ricerca
        function fuzzySearch(query, text) {
            if (!text) return false;
            query = query.toLowerCase();
            text = text.toString().toLowerCase();
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
            if (!query || !text) return text;
            const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
            return text.toString().replace(regex, '<span class="match-highlight">$1</span>');
        }

        function escapeRegExp(string) {
            return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }

        function performSearch() {
            const query = searchInput.value.trim();
            if (!query) {
                renderPrestazioni(prestazioni);
                return;
            }
            const results = prestazioni.filter(item => {
                if (fuzzySearch(query, item.termine)) return true;
                if (item.cod && fuzzySearch(query, item.cod)) return true;
                if (item.tipologia && fuzzySearch(query, item.tipologia)) return true;
                if (item.categoria && fuzzySearch(query, item.categoria)) return true;
                if (item.sinonimi && Array.isArray(item.sinonimi)) {
                    return item.sinonimi.some(sinonimo => fuzzySearch(query, sinonimo));
                }
                return false;
            });
            renderPrestazioni(results, query);
        }

        function renderPrestazioni(prestazioniToRender, query = '') {
            if (prestazioniToRender.length === 0) {
                prestazioniList.innerHTML = `
                    <div class="no-results">
                        <i class="fas fa-search-minus fa-3x"></i>
                        <h3>Nessun risultato trovato</h3>
                        <p>La tua ricerca non ha prodotto risultati</p>
                    </div>
                `;
                return;
            }
            let html = '';
            prestazioniToRender.forEach(item => {
                const highlightedCod = query ? highlightMatch(item.cod, query) : item.cod;
                const highlightedTipologia = query ? highlightMatch(item.tipologia, query) : item.tipologia;
                const highlightedTermine = query ? highlightMatch(item.termine, query) : item.termine;
                const highlightedCat = query ? highlightMatch(item.categoria, query) : item.categoria;
                const highlightedRimborso = query ? highlightMatch(item.rimborso, query) : item.rimborso;
                const highlightedMassimaleSpec = query ? highlightMatch(item.massimale_specifico, query) : item.massimale_specifico;
                const highlightedMassimaleGruppo = query ? highlightMatch(item.massimale_gruppo, query) : item.massimale_gruppo;
                const highlightedPrevPrescr = query ? highlightMatch(item.preventivo_prescrizione, query) : item.preventivo_prescrizione;
                const highlightedOpt = query ? highlightMatch(item.opt, query) : item.opt;
                const highlightedVisitaIniz = query ? highlightMatch(item.visita_iniziale, query) : item.visita_iniziale;
                const highlightedVisitaFin = query ? highlightMatch(item.visita_finale, query) : item.visita_finale;
                const highlightedValutazione = query ? highlightMatch(item.valutazione_sanitaria, query) : item.valutazione_sanitaria;
                const highlightedSyn = (item.sinonimi||[]).map(s => query ? highlightMatch(s, query) : s).join(", ");

                html += `
                    <div class="card">
                        <h3>${highlightedTermine}</h3>
                        <div class="prestazione-details">
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
            });
            prestazioniList.innerHTML = html;
        }

        // Inizializza l'app
        renderPrestazioni(prestazioni);

        // Aggiungi event listeners
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    // Avvia l'applicazione al caricamento della pagina
    document.addEventListener('DOMContentLoaded', initApp);
    </script>
</body>
</html>