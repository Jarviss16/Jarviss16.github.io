// Password di accesso
const PASSWORD_CORRETTA = "Fondazioneatm2025";

// Elementi DOM per l'accesso
const accessoContainer = document.getElementById('accessoContainer');
const appContainer = document.getElementById('appContainer');
const passwordInput = document.getElementById('passwordInput');
const accediButton = document.getElementById('accediButton');
const erroreAccesso = document.getElementById('erroreAccesso');

// Elementi DOM per l'app
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const resultsContainer = document.getElementById('resultsContainer');
const termsCount = document.getElementById('termsCount');

// Elementi DOM per il modal
const termModal = document.getElementById('termModal');
const modalContent = document.getElementById('modalContent');
const closeModal = document.querySelector('.close-modal');

// Dizionario dei termini sanitari
const dizionarioSanitario = [
    {
        cod: "5PORT",
        tipologia: "Termine sanitario",
        termine: "Bastoni canadesi",
        categoria: "Presidi ortopedici acquisto",
        rimborso: "20%",
        maxSpec: "300euro 3 anni ad avente diritto",
        maxGrup: "maxspec",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Bastoni da deambulazione"
    },
    {
        cod: "5PORT",
        tipologia: "Termine sanitario",
        termine: "Busto o corsetto ortopedico",
        categoria: "Presidi ortopedici acquisto",
        rimborso: "20%",
        maxSpec: "300euro 3 anni ad avente diritto",
        maxGrup: "maxspec",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Bustino ortopedico, Corsetto, Tutore del tronco"
    },
    {
        cod: "5PORT",
        tipologia: "Termine sanitario",
        termine: "Calzature ortopediche",
        categoria: "Presidi ortopedici acquisto",
        rimborso: "20%",
        maxSpec: "300euro 3 anni ad avente diritto",
        maxGrup: "maxspec",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Bustino ortopedico, Corsetto, Tutore del tronco"
    },
    {
        cod: "5PORT",
        tipologia: "Termine sanitario",
        termine: "Calze o gambaletti elastici",
        categoria: "Presidi ortopedici acquisto",
        rimborso: "20%",
        maxSpec: "300euro 3 anni ad avente diritto",
        maxGrup: "maxspec",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Calze elastiche, Calze a compressione, Calze terapeutiche"
    },
    {
        cod: "5PORT",
        tipologia: "Termine sanitario",
        termine: "Carrozzina per deambulazione",
        categoria: "Presidi ortopedici acquisto",
        rimborso: "20%",
        maxSpec: "300euro 3 anni ad avente diritto",
        maxGrup: "maxspec",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Carrozzella, Sedia a rotelle"
    },
        {
        cod: "5PORT",
        tipologia: "Termine sanitario",
        termine: "Cavigliera elastica",
        categoria: "Presidi ortopedici acquisto",
        rimborso: "20%",
        maxSpec: "300euro 3 anni ad avente diritto",
        maxGrup: "maxspec",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Tutore elastico di caviglia"
    },
    {
        cod: "5PORT",
        tipologia: "Termine sanitario",
        termine: "Cinto erniario",
        categoria: "Presidi ortopedici acquisto",
        rimborso: "20%",
        maxSpec: "300euro 3 anni ad avente diritto",
        maxGrup: "maxspec",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Pancera, Fascia addominale"
    },
    {
        cod: "5PORT",
        tipologia: "Collare cervicale",
        termine: "Calze o gambaletti elastici",
        categoria: "Presidi ortopedici acquisto",
        rimborso: "20%",
        maxSpec: "300euro 3 anni ad avente diritto",
        maxGrup: "maxspec",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Tutore cervicale, Collare ortopedico"
    },
    {
        cod: "5PORT",
        tipologia: "Termine sanitario",
        termine: "Cuscino ortopedico",
        categoria: "Presidi ortopedici acquisto",
        rimborso: "20%",
        maxSpec: "300euro 3 anni ad avente diritto",
        maxGrup: "maxspec",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Cuscino da seduta"
    },
        {
        cod: "5PORT",
        tipologia: "Termine sanitario",
        termine: "Divaricatore",
        categoria: "Presidi ortopedici acquisto",
        rimborso: "20%",
        maxSpec: "300euro 3 anni ad avente diritto",
        maxGrup: "maxspec",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Tutore divaricatore"
    },
    {
        cod: "5PORT",
        tipologia: "Ginocchiere",
        termine: "Calze o gambaletti elastici",
        categoria: "Presidi ortopedici acquisto",
        rimborso: "20%",
        maxSpec: "300euro 3 anni ad avente diritto",
        maxGrup: "maxspec",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Tutore del ginocchio"
    },
    {
        cod: "5PORT",
        tipologia: "Termine sanitario",
        termine: "Mutanda contenitiva",
        categoria: "Presidi ortopedici acquisto",
        rimborso: "20%",
        maxSpec: "300euro 3 anni ad avente diritto",
        maxGrup: "maxspec",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Mutanda elastica, Pancera contenitiva"
    },
            {
        cod: "5PORT",
        tipologia: "Termine sanitario",
        termine: "Divaricatore",
        categoria: "Presidi ortopedici acquisto",
        rimborso: "20%",
        maxSpec: "300euro 3 anni ad avente diritto",
        maxGrup: "maxspec",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Tutore divaricatore"
    },
    {
        cod: "5PORT",
        tipologia: "Plantari ortopedici",
        termine: "Calze o gambaletti elastici",
        categoria: "Presidi ortopedici acquisto",
        rimborso: "20%",
        maxSpec: "300euro 3 anni ad avente diritto",
        maxGrup: "maxspec",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Solette ortopediche"
    },
    {
        cod: "5PORT",
        tipologia: "Termine sanitario",
        termine: "Rialzo calcaneare",
        categoria: "Presidi ortopedici acquisto",
        rimborso: "20%",
        maxSpec: "300euro 3 anni ad avente diritto",
        maxGrup: "maxspec",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Tallonetta, Zeppa calcaneare"
    },
    {
        cod: "5PORT",
        tipologia: "Termine sanitario",
        termine: "Sospensorio",
        categoria: "Presidi ortopedici acquisto",
        rimborso: "20%",
        maxSpec: "300euro 3 anni ad avente diritto",
        maxGrup: "maxspec",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Tutore sospensorio"
    },
    {
        cod: "5PORT",
        tipologia: "Termine sanitario",
        termine: "Tutore",
        categoria: "Presidi ortopedici acquisto",
        rimborso: "20%",
        maxSpec: "300euro 3 anni ad avente diritto",
        maxGrup: "maxspec",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Tutore articolare"
    },
    {
        cod: "4LENT",
        tipologia: "Termine sanitario",
        termine: "Non definito",
        categoria: "Lenti graduate",
        rimborso: "30%",
        maxSpec: "300euro 3 anni ad avente diritto",
        maxGrup: "maxspec",
        PrevPres: "Si test visivo",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: " "
    },
    {
        cod: "3MEDIC",
        tipologia: "Termine sanitario",
        termine: "Non definito",
        categoria: "Medicinali",
        rimborso: "40%",
        maxSpec: "300euro anno solare, nucleo famigliare, franchigia 75euro",
        maxGrup: "maxspec",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: " "
    },
    {
        cod: "6PADE",
        tipologia: "Termine sanitario",
        termine: "Non definito",
        categoria: "Presidi ortopedici adeguamenti",
        rimborso: "20%",
        maxSpec: "300euro, 3 anni ad avente diritto",
        maxGrup: "maxspec",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: " "
    },
    {
        cod: "TNON",
        tipologia: "Termine sanitario",
        termine: "Porta impronte",
        categoria: "Terapie non rimborsabili",
        rimborso: "0%",
        maxSpec: "0euro",
        maxGrup: "maxspec",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Porta impronte dentale"
    },
    {
        cod: "TNON",
        tipologia: "Termine sanitario",
        termine: "Applicazioni di calcio fosfato",
        categoria: "Terapie non rimborsabili",
        rimborso: "0%",
        maxSpec: "0euro",
        maxGrup: "maxspec",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Applicazione calcio fosfato, Trattamento calcio fosfato"
    },
    {
        cod: "TNON",
        tipologia: "Termine sanitario",
        termine: "Dentoplastica",
        categoria: "Terapie non rimborsabili",
        rimborso: "0%",
        maxSpec: "0euro",
        maxGrup: "maxspec",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Modellazione dentale"
    },
    {
        cod: "TNON",
        tipologia: "Termine sanitario",
        termine: "Faccetta",
        categoria: "Terapie non rimborsabili",
        rimborso: "0%",
        maxSpec: "0euro",
        maxGrup: "maxspec",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Faccetta dentale, Veneer"
    },
    {
        cod: "TNON",
        tipologia: "Termine sanitario",
        termine: "Pulizia protesi",
        categoria: "Terapie non rimborsabili",
        rimborso: "0%",
        maxSpec: "0euro",
        maxGrup: "maxspec",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Igiene protesica, Pulizia dentiera"
    },
    {
        cod: "TNON",
        tipologia: "Termine sanitario",
        termine: "Ricostruzione estetica",
        categoria: "Terapie non rimborsabili",
        rimborso: "0%",
        maxSpec: "0euro",
        maxGrup: "maxspec",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Ricostruzione dentale estetica, Restauro estetico"
    },
    {
        cod: "TNON",
        tipologia: "Termine sanitario",
        termine: "Seduta motivazionale con protocollo gbt",
        categoria: "Terapie non rimborsabili",
        rimborso: "0%",
        maxSpec: "0euro",
        maxGrup: "maxspec",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Seduta motivazionale gbt"
    },
    {
        cod: "TNON",
        tipologia: "Termine sanitario",
        termine: "Terapia parodontale non chirurgica laser assistita a quadrante",
        categoria: "Terapie non rimborsabili",
        rimborso: "0%",
        maxSpec: "0euro",
        maxGrup: "maxspec",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Terapia parodontale laser"
    },
    {
        cod: "TNON",
        tipologia: "Termine sanitario",
        termine: "Trattamento remineralizzante",
        categoria: "Terapie non rimborsabili",
        rimborso: "0%",
        maxSpec: "0euro",
        maxGrup: "maxspec",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Trattamento remineralizzante dentale"
    },
    {
        cod: "TNON",
        tipologia: "Termine sanitario",
        termine: "Trattamento smacchiante",
        categoria: "Terapie non rimborsabili",
        rimborso: "0%",
        maxSpec: "0euro",
        maxGrup: "maxspec",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Sbiancamento dentale, Trattamento smacchiante denti"
    },
    {
        cod: "TNON",
        tipologia: "Termine sanitario",
        termine: "Weener ceramica",
        categoria: "Terapie non rimborsabili",
        rimborso: "0%",
        maxSpec: "0euro",
        maxGrup: "maxspec",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Veneer ceramica, Faccetta ceramica"
    },
    {
        cod: "TNON",
        tipologia: "Termine sanitario",
        termine: "Marca da bollo",
        categoria: "Terapie non rimborsabili",
        rimborso: "0%",
        maxSpec: "0euro",
        maxGrup: "maxspec",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Bollo fiscale, Marca fiscale"
    },
    {
        cod: "TNON",
        tipologia: "Termine sanitario",
        termine: "Attivazione impianti",
        categoria: "Terapie non rimborsabili",
        rimborso: "0%",
        maxSpec: "0euro",
        maxGrup: "maxspec",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Attivazione impianto dentale, Posizionamento impianto"
    },
    {
        cod: "TNON",
        tipologia: "Termine sanitario",
        termine: "Cementazione corona",
        categoria: "Terapie non rimborsabili",
        rimborso: "0%",
        maxSpec: "0euro",
        maxGrup: "maxspec",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Cementazione protesica, Fissaggio corona"
    },
    {
        cod: "TNON",
        tipologia: "Termine sanitario",
        termine: "Dima chirurgica",
        categoria: "Terapie non rimborsabili",
        rimborso: "0%",
        maxSpec: "0euro",
        maxGrup: "maxspec",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Guida chirurgica, Mascherina chirurgica"
    },
    {
        cod: "TNON",
        tipologia: "Termine sanitario",
        termine: "Gbr odontoiatria",
        categoria: "Terapie non rimborsabili",
        rimborso: "0%",
        maxSpec: "0euro",
        maxGrup: "maxspec",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Rigenerazione ossea guidata"
    },
    {
        cod: "TNON",
        tipologia: "Termine sanitario",
        termine: "Grande rialzo del seno mascellare",
        categoria: "Terapie non rimborsabili",
        rimborso: "0%",
        maxSpec: "0euro",
        maxGrup: "maxspec",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Rialzo seno mascellare, Sinus lift"
    },
    {
        cod: "TNON",
        tipologia: "Termine sanitario",
        termine: "Maggiorazione per elemento in disilicato",
        categoria: "Terapie non rimborsabili",
        rimborso: "0%",
        maxSpec: "0euro",
        maxGrup: "maxspec",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Supplemento disilicato, Incremento costo disilicato"
    },
    {
        cod: "TNON",
        tipologia: "Termine sanitario",
        termine: "Membrana",
        categoria: "Terapie non rimborsabili",
        rimborso: "0%",
        maxSpec: "0euro",
        maxGrup: "maxspec",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Membrana chirurgica, Barriera ossea"
    },
    {
        cod: "TNON",
        tipologia: "Termine sanitario",
        termine: "Molaggio Selettivo",
        categoria: "Terapie non rimborsabili",
        rimborso: "0%",
        maxSpec: "0euro",
        maxGrup: "maxspec",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Molaggio occlusale selettivo"
    },
    {
        cod: "TNON",
        tipologia: "Termine sanitario",
        termine: "Progettazione e dime per chirurgia implantare guidata",
        categoria: "Terapie non rimborsabili",
        rimborso: "0%",
        maxSpec: "0euro",
        maxGrup: "maxspec",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Progettazione implantare guidata, Guida chirurgica implantare"
    },
    {
        cod: "TNON",
        tipologia: "Termine sanitario",
        termine: "Regolarizzazione cresta ossea",
        categoria: "Terapie non rimborsabili",
        rimborso: "0%",
        maxSpec: "0euro",
        maxGrup: "maxspec",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Modellazione cresta ossea, Rimodellamento osseo"
    },
    {
        cod: "TNON",
        tipologia: "Termine sanitario",
        termine: "Rigenerazione Ossea",
        categoria: "Terapie non rimborsabili",
        rimborso: "0%",
        maxSpec: "0euro",
        maxGrup: "maxspec",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Rigenerazione ossea, Osteorigenerazione"
    },
    {
        cod: "TNON",
        tipologia: "Termine sanitario",
        termine: "Rimozione corona",
        categoria: "Terapie non rimborsabili",
        rimborso: "0%",
        maxSpec: "0euro",
        maxGrup: "maxspec",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Rimozione protesi, Estrazione corona"
    },
    {
        cod: "TNON",
        tipologia: "Termine sanitario",
        termine: "Rimozione perno",
        categoria: "Terapie non rimborsabili",
        rimborso: "0%",
        maxSpec: "0euro",
        maxGrup: "maxspec",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Rimozione perno dentale, Estrazione perno"
    },
    {
        cod: "TNON",
        tipologia: "Termine sanitario",
        termine: "Socket prevention",
        categoria: "Terapie non rimborsabili",
        rimborso: "0%",
        maxSpec: "0euro",
        maxGrup: "maxspec",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Prevenzione alveolo, Protezione socket"
    },
    {
        cod: "TNON",
        tipologia: "Termine sanitario",
        termine: "Visita controllo odontoiatrica",
        categoria: "Terapie non rimborsabili",
        rimborso: "0%",
        maxSpec: "0euro",
        maxGrup: "maxspec",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Controllo odontoiatrico, Visita di controllo dentale"
    },
    {
        cod: "TNON",
        tipologia: "Termine sanitario",
        termine: "Vite di guarigione",
        categoria: "Terapie non rimborsabili",
        rimborso: "0%",
        maxSpec: "0euro",
        maxGrup: "maxspec",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Vite di osteointegrazione, Healing screw"
    },
    {
        cod: "TNON",
        tipologia: "Termine sanitario",
        termine: "Anestesia",
        categoria: "Terapie non rimborsabili",
        rimborso: "0%",
        maxSpec: "0euro",
        maxGrup: "maxspec",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Anestesia locale, Anestesia odontoiatrica"
    },
    {
        cod: "TNON",
        tipologia: "Termine sanitario",
        termine: "Ansiolisi",
        categoria: "Terapie non rimborsabili",
        rimborso: "0%",
        maxSpec: "0euro",
        maxGrup: "maxspec",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Sedazione leggera, Sedazione cosciente"
    },
    {
        cod: "TNON",
        tipologia: "Termine sanitario",
        termine: "Applicazione del farmaco",
        categoria: "Terapie non rimborsabili",
        rimborso: "0%",
        maxSpec: "0euro",
        maxGrup: "maxspec",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Somministrazione farmaco, Applicazione medicinale"
    },
    {
        cod: "TNON",
        tipologia: "Termine sanitario",
        termine: "Assistenza infermieristica",
        categoria: "Terapie non rimborsabili",
        rimborso: "0%",
        maxSpec: "0euro",
        maxGrup: "maxspec",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Assistenza nurse, Supporto infermieristico"
    },
    {
        cod: "TNON",
        tipologia: "Termine sanitario",
        termine: "Assistenza medico",
        categoria: "Terapie non rimborsabili",
        rimborso: "0%",
        maxSpec: "0euro",
        maxGrup: "maxspec",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Assistenza medica, Supporto medico"
    },
    {
        cod: "TNON",
        tipologia: "Termine sanitario",
        termine: "Codice udi materiale riempitivo",
        categoria: "Terapie non rimborsabili",
        rimborso: "0%",
        maxSpec: "0euro",
        maxGrup: "maxspec",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Codice udi, Identificativo dispositivo"
    },
    {
        cod: "TNON",
        tipologia: "Termine sanitario",
        termine: "Diritto fisso di segreteria",
        categoria: "Terapie non rimborsabili",
        rimborso: "0%",
        maxSpec: "0euro",
        maxGrup: "maxspec",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Quota segreteria, Tassa segreteria"
    },
    {
        cod: "TNON",
        tipologia: "Termine sanitario",
        termine: "Sala operatoria",
        categoria: "Terapie non rimborsabili",
        rimborso: "0%",
        maxSpec: "0euro",
        maxGrup: "maxspec",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Sala chirurgica, Blocco operatorio"
    },
    {
        cod: "TNON",
        tipologia: "Termine sanitario",
        termine: "Sedazione cosciente",
        categoria: "Terapie non rimborsabili",
        rimborso: "0%",
        maxSpec: "0euro",
        maxGrup: "maxspec",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Sedazione controllata, Sedazione leggera"
    },
    {
        cod: "TNON",
        tipologia: "Termine sanitario",
        termine: "Sutura",
        categoria: "Terapie non rimborsabili",
        rimborso: "0%",
        maxSpec: "0euro",
        maxGrup: "maxspec",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Punti di sutura, Sutura chirurgica"
    },
    {
        cod: "TNON",
        tipologia: "Termine sanitario",
        termine: "Terapia antibiotica",
        categoria: "Terapie non rimborsabili",
        rimborso: "0%",
        maxSpec: "0euro",
        maxGrup: "maxspec",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Trattamento antibiotico"
    },
    {
        cod: "TNON",
        tipologia: "Termine sanitario",
        termine: "Tessera paziente",
        categoria: "Terapie non rimborsabili",
        rimborso: "0%",
        maxSpec: "0euro",
        maxGrup: "maxspec",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Card paziente, Badge paziente"
    },
    {
        cod: "TNON",
        tipologia: "Termine sanitario",
        termine: "Utilizzo dispositivo di ancoraggio membrana",
        categoria: "Terapie non rimborsabili",
        rimborso: "0%",
        maxSpec: "0euro",
        maxGrup: "maxspec",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Utilizzo ancoraggio membrana, Fissaggio membrana"
    },
    {
        cod: "21ALAB",
        tipologia: "Termine sanitario",
        termine: "Da definire",
        categoria: "Analisi cliniche",
        rimborso: "30%",
        maxSpec: "maxgrup",
        maxGrup: "1000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: " "
    },
    {
        cod: "21ALAB",
        tipologia: "Termine sanitario",
        termine: "Da definire",
        categoria: "Analisi di laboratorio",
        rimborso: "30%",
        maxSpec: "maxgrup",
        maxGrup: "1000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: " "
    },
    {
        cod: "22DGN",
        tipologia: "Termine sanitario",
        termine: "Medicazione chirurgica, rimborsabile solo con intervento",
        categoria: "Diagnostica",
        rimborso: "35%",
        maxSpec: "maxgrup",
        maxGrup: "1000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Medicazione post-operatoria, Sutura"
    },
    {
        cod: "22DGN",
        tipologia: "Termine sanitario",
        termine: "Ecocolordoppler",
        categoria: "Diagnostica",
        rimborso: "35%",
        maxSpec: "maxgrup",
        maxGrup: "1000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Eco color doppler, Ecografia doppler"
    },
    {
        cod: "22DGN",
        tipologia: "Termine sanitario",
        termine: "Biopsia",
        categoria: "Diagnostica",
        rimborso: "35%",
        maxSpec: "maxgrup",
        maxGrup: "1000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Prelievo tessutale"
    },
    {
        cod: "22DGN",
        tipologia: "Termine sanitario",
        termine: "Colonscopia",
        categoria: "Diagnostica",
        rimborso: "35%",
        maxSpec: "maxgrup",
        maxGrup: "1000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Esame colonico, Colonoscopia digestiva"
    },
    {
        cod: "22DGN",
        tipologia: "Termine sanitario",
        termine: "Ecg, Elettrocardiogramma",
        categoria: "Diagnostica",
        rimborso: "35%",
        maxSpec: "maxgrup",
        maxGrup: "1000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Elettrocardiogramma, Ecg"
    },
    {
        cod: "22DGN",
        tipologia: "Termine sanitario",
        termine: "Endoscopia",
        categoria: "Diagnostica",
        rimborso: "35%",
        maxSpec: "maxgrup",
        maxGrup: "1000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Esame endoscopico"
    },
    {
        cod: "22DGN",
        tipologia: "Termine sanitario",
        termine: "Tonometria",
        categoria: "Diagnostica",
        rimborso: "35%",
        maxSpec: "maxgrup",
        maxGrup: "1000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Misurazione della pressione intraoculare"
    },
    {
        cod: "22DGN",
        tipologia: "Termine sanitario",
        termine: "Tomografia a emissione di positroni",
        categoria: "Diagnostica",
        rimborso: "35%",
        maxSpec: "maxgrup",
        maxGrup: "1000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Pet"
    },
    {
        cod: "22DGN",
        tipologia: "Termine sanitario",
        termine: "Cefalometria",
        categoria: "Diagnostica",
        rimborso: "35%",
        maxSpec: "maxgrup",
        maxGrup: "1000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Radiografia cefalometrica"
    },
    {
        cod: "22DGN",
        tipologia: "Termine sanitario",
        termine: "Diagnosi del modello di studio",
        categoria: "Diagnostica",
        rimborso: "35%",
        maxSpec: "maxgrup",
        maxGrup: "1000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Valutazione ortodontica del modello"
    },
    {
        cod: "22DGN",
        tipologia: "Termine sanitario",
        termine: "Impronta",
        categoria: "Diagnostica",
        rimborso: "35%",
        maxSpec: "maxgrup",
        maxGrup: "1000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Impressione dentale"
    },
    {
        cod: "22DGN",
        tipologia: "Termine sanitario",
        termine: "Impronta per applicazione corona provvisoria",
        categoria: "Diagnostica",
        rimborso: "35%",
        maxSpec: "maxgrup",
        maxGrup: "1000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Impressione per corona temporanea"
    },
    {
        cod: "22DGN",
        tipologia: "Termine sanitario",
        termine: "Ortopantomografia",
        categoria: "Diagnostica",
        rimborso: "35%",
        maxSpec: "maxgrup",
        maxGrup: "1000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Opg, Panoramica dentale"
    },
    {
        cod: "22DGN",
        tipologia: "Termine sanitario",
        termine: "Scansione mascella",
        categoria: "Diagnostica",
        rimborso: "35%",
        maxSpec: "maxgrup",
        maxGrup: "1000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Scansione 3d mascella"
    },
    {
        cod: "22DGN",
        tipologia: "Termine sanitario",
        termine: "Sondaggio parodontale",
        categoria: "Diagnostica",
        rimborso: "35%",
        maxSpec: "maxgrup",
        maxGrup: "1000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Esame parodontale"
    },
    {
        cod: "22DGN",
        tipologia: "Termine sanitario",
        termine: "Status radiografico",
        categoria: "Diagnostica",
        rimborso: "35%",
        maxSpec: "maxgrup",
        maxGrup: "1000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Radiografia completa, Radiografia di controllo"
    },
    {
        cod: "22DGN",
        tipologia: "Termine sanitario",
        termine: "Telecranio",
        categoria: "Diagnostica",
        rimborso: "35%",
        maxSpec: "maxgrup",
        maxGrup: "1000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Radiografia latero, laterale del cranio"
    },
    {
        cod: "22DGN",
        tipologia: "Termine sanitario",
        termine: "Rmn",
        categoria: "Diagnostica",
        rimborso: "35%",
        maxSpec: "maxgrup",
        maxGrup: "1000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Risonanza magnetica nucleare, Risonanza magnetica"
    },
    {
        cod: "22DGN",
        tipologia: "Termine sanitario",
        termine: "Tomografia assiale computerizzata",
        categoria: "Diagnostica",
        rimborso: "35%",
        maxSpec: "maxgrup",
        maxGrup: "1000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Tac, Tomografia computerizzata"
    },
    {
        cod: "22DGN",
        tipologia: "Termine sanitario",
        termine: "Cartella parodontale",
        categoria: "Diagnostica",
        rimborso: "35%",
        maxSpec: "maxgrup",
        maxGrup: "1000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Cartella clinica parodontale"
    },
    {
        cod: "22DGN",
        tipologia: "Termine sanitario",
        termine: "Check Up Ortodontico",
        categoria: "Diagnostica",
        rimborso: "35%",
        maxSpec: "maxgrup",
        maxGrup: "1000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Valutazione ortodontica, Visita ortodontica"
    },
    {
        cod: "22DGN",
        tipologia: "Termine sanitario",
        termine: "Diagnostica pre-sedazione",
        categoria: "Diagnostica",
        rimborso: "35%",
        maxSpec: "maxgrup",
        maxGrup: "1000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Esame pre-anestesico"
    },
    {
        cod: "22DGN",
        tipologia: "Termine sanitario",
        termine: "Studio del caso",
        categoria: "Diagnostica",
        rimborso: "35%",
        maxSpec: "maxgrup",
        maxGrup: "1000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Analisi del caso"
    },
    {
        cod: "22DGN",
        tipologia: "Termine sanitario",
        termine: "Valutazione funzionale",
        categoria: "Diagnostica",
        rimborso: "35%",
        maxSpec: "maxgrup",
        maxGrup: "1000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Valutazione clinica"
    },
    {
        cod: "22DGN",
        tipologia: "Termine sanitario",
        termine: "Opt",
        categoria: "Diagnostica",
        rimborso: "35%",
        maxSpec: "maxgrup",
        maxGrup: "1000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Ortopantomografia"
    },
    {
        cod: "22DGN",
        tipologia: "Termine sanitario",
        termine: "Radiografia endorale",
        categoria: "Diagnostica",
        rimborso: "35%",
        maxSpec: "maxgrup",
        maxGrup: "1000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Radio endorale"
    },
    {
        cod: "22DGN",
        tipologia: "Termine sanitario",
        termine: "Rilevazione impronte",
        categoria: "Diagnostica",
        rimborso: "35%",
        maxSpec: "maxgrup",
        maxGrup: "1000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Presa impronte"
    },
    {
        cod: "22DGN",
        tipologia: "Termine sanitario",
        termine: "Sviluppo modelli ortodontici",
        categoria: "Diagnostica",
        rimborso: "35%",
        maxSpec: "maxgrup",
        maxGrup: "1000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Realizzazione modelli ortodontici"
    },
    {
        cod: "22DGN",
        tipologia: "Termine sanitario",
        termine: "Sviluppo modello gesso con hortob",
        categoria: "Diagnostica",
        rimborso: "35%",
        maxSpec: "maxgrup",
        maxGrup: "1000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Realizzazione modello gesso ortodontico"
    },
    {
        cod: "22DGN",
        tipologia: "Termine sanitario",
        termine: "Status fotografico",
        categoria: "Diagnostica",
        rimborso: "35%",
        maxSpec: "maxgrup",
        maxGrup: "1000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Documentazione fotografica ortodontica"
    },
    {
        cod: "22DGN",
        tipologia: "Termine sanitario",
        termine: "Cone beam ct",
        categoria: "Diagnostica",
        rimborso: "35%",
        maxSpec: "maxgrup",
        maxGrup: "1000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Cbct, Tac dentale 3d"
    },
    {
        cod: "22DGN",
        tipologia: "Termine sanitario",
        termine: "Dentalscan",
        categoria: "Diagnostica",
        rimborso: "35%",
        maxSpec: "maxgrup",
        maxGrup: "1000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Scansione dentale 3d"
    },
    {
        cod: "23TFSI",
        tipologia: "Termine sanitario",
        termine: "Da definire",
        categoria: "Terapie Fisiche",
        rimborso: "20%",
        maxSpec: "maxgrup",
        maxGrup: "1000euro",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: " "
    },
    {
        cod: "23TFSI",
        tipologia: "Termine sanitario",
        termine: "Da definire",
        categoria: "Terapie riabilitative",
        rimborso: "20%",
        maxSpec: "maxgrup",
        maxGrup: "1000euro",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: " "
    },
    {
        cod: "24INCH",
        tipologia: "Termine sanitario",
        termine: "Da definire",
        categoria: "Interventi chirurgici ambulatoriali",
        rimborso: "10%",
        maxSpec: "maxgrup",
        maxGrup: "1000euro",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: " "
    },
    {
        cod: "25VSPE",
        tipologia: "Termine sanitario",
        termine: "Prima visita",
        categoria: "Visite specialistiche",
        rimborso: "35%",
        maxSpec: "maxgrup",
        maxGrup: "1000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: " "
    },
    {
        cod: "25VSPE",
        tipologia: "Termine sanitario",
        termine: " ",
        categoria: "Visite specialistiche",
        rimborso: "35%",
        maxSpec: "maxgrup",
        maxGrup: "1000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: " "
    },
    {
        cod: "26TPSI",
        tipologia: "Termine sanitario",
        termine: " ",
        categoria: "Percorsi psicologici",
        rimborso: "20%",
        maxSpec: "maxgrup",
        maxGrup: "1000euro",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: " "
    },
    {
        cod: "27VDSA",
        tipologia: "Termine sanitario",
        termine: " ",
        categoria: "Percorsi valutazione dsa",
        rimborso: "30% completamento percorso",
        maxSpec: "maxgrup",
        maxGrup: "1000euro",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: " "
    },
    {
        cod: "27VDSA",
        tipologia: "Termine sanitario",
        termine: " ",
        categoria: "Trattamento dsa",
        rimborso: "20%",
        maxSpec: "maxgrup",
        maxGrup: "1000euro",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: " "
    },
    {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Incappucciamento della polpa indiretto",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: " ",
        opt: " ",
        visitaIniziale: " ",
        visitaFinale: " ",
        valutazioneSanitaria: " ",
        sinonimi: "Cappia pulpare indiretto; Indirect pulp capping"
    },
    {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Pulpotomia",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: " ",
        opt: " ",
        visitaIniziale: " ",
        visitaFinale: " ",
        valutazioneSanitaria: " ",
        sinonimi: "Amputazione della polpa; Polpotomia"
    },
    {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Vestiboloplastica con trapianto",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: " ",
        opt: " ",
        visitaIniziale: " ",
        visitaFinale: " ",
        valutazioneSanitaria: " ",
        sinonimi: "Chirurgia del vestibolo; Aumento del vestibolo; Trapianto di mucosa"
    },
    {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Allacciamento di dente incluso",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "Si",
        opt: "Si",
        visitaIniziale: "Si",
        visitaFinale: "Si",
        valutazioneSanitaria: "Si",
        sinonimi: "Applicazione del bracket per disinclusione; Attacco ortodontico su dente incluso"
    },
    {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Apicectomia",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Resezione apicale; Chirurgia endodontica, Avulsione dente; Disinclusione canini; Rimozione dente; Rizectomia; Rizotomia"
    },
    {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Estrazione Dente/Radice",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Avulsione; Exodonzia; Estratto; Rimozione impianto"
    },
    {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Estrazione di impianto a vite endosseo",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "Si",
        opt: "Si",
        visitaIniziale: "Si",
        visitaFinale: "No",
        valutazioneSanitaria: "Si",
        sinonimi: "Rimozione impianto; Rimozione vite endossea; Rimozione fixture; Rimozione del vecchio ponte"
    },
    {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Estrazione di impianto a vite endosseo",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "Si",
        opt: "Si",
        visitaIniziale: "Si",
        visitaFinale: "No",
        valutazioneSanitaria: "Si",
        sinonimi: "Rimozione impianto; Rimozione vite endossea; Rimozione fixture; Rimozione del vecchio ponte"
    },
    {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Frenulectomia",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Frenuloplastica; Escissione del frenulo"
    },
    {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Frenulotomia",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Incisione del frenulo"
    },
    {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Germectomia",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Estrazione del germe dentario; Avulsione del germe"
    },
    {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Intervento chirurgico enucleazione cisti",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "Si",
        opt: "Si",
        visitaIniziale: "Si",
        visitaFinale: "No",
        valutazioneSanitaria: "Si",
        sinonimi: "Enucleazione cistica; Asportazione chirurgica di cisti; Cistectomia"
    },
    {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Maggiorazione per prestazioni in sedazione endovenosa",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Sedazione cosciente; Anestesia endovenosa; Ivs"
    },
    {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Otturazione",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Riparazione carie; Composito; Filling; Restauro; Build up preprotesico; Composito"
    },
    {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Ricostruzione",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Coronale; Rebuilding; Ricostruzione composita; Chirurgia preprotesica; Ricostruzione pre-protesica"
    },
    {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Sigillatura dei solchi",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Sigillanti; Sealant"
    },
    {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Devitalizzazione",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Cura canalare; Trattamento endodontico; Terapia canalare; Ritrattamento canalare; Trattamento endodontico; Ritrattamento multi asintomatico"
    },
    {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Ablazione tartaro",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Detartrasi; Igiene orale; Pulizia dei denti; Scaling; Abt; Detartrasi; Fluoroprofilassi"
    },
    {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Impianto a vite, per elemento esclusa protesizzazione",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "Si",
        opt: "Si",
        visitaIniziale: "Si",
        visitaFinale: "Si",
        valutazioneSanitaria: "Si",
        sinonimi: "Fixture; Vite endossea; Posizionamento impianto; Componentistica implantoprotesica; Impianto dentale oxy premium; Impianto sommerso"
    },
    {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Allungamento corona clinica",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "Si",
        visitaFinale: "No",
        valutazioneSanitaria: "Si",
        sinonimi: "Chirurgia di allungamento coronale; Crown lengthening"
    },
    {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Curettage",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "Si",
        visitaFinale: "No",
        valutazioneSanitaria: "Si",
        sinonimi: "Raschiamento; Curettaggio gengivale; Full mouth disinfection"
    },
    {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Gengivectomia",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Resezione gengivale; Escissione gengivale"
    },
    {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Lembo gengivale",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "Si",
        visitaFinale: "No",
        valutazioneSanitaria: "Si",
        sinonimi: "Chirurgia a lembo; Sollevamento del lembo; Lembo"
    },
    {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Levigatura radicolare",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "Si",
        visitaFinale: "No",
        valutazioneSanitaria: "Si",
        sinonimi: "Root planing; Ablazione tartaro sottogengivale; Levigatura sestante; Scaling e root planing"
    },
    {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Muco gengivale",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "Si",
        visitaFinale: "No",
        valutazioneSanitaria: "Si",
        sinonimi: "Chirurgia muco gengivale; Innesto di tessuto connettivo; Innesto gengivale"
    },
    {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Barra",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "Si",
        opt: "Si",
        visitaIniziale: "Si",
        visitaFinale: "Si",
        valutazioneSanitaria: "Si",
        sinonimi: "Barra palatina; Barra di ancoraggio; Dolder bar"
    },
    {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Bottone per overdenture",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "Si",
        visitaFinale: "Si",
        valutazioneSanitaria: "Si",
        sinonimi: "Attacco a bottone; Stud attachment; Attacco radicolare; Attacco locator"
    },
    {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Bottone ritentivo su barra",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "Si",
        visitaFinale: "Si",
        valutazioneSanitaria: "Si",
        sinonimi: "Clip di ritenzione; Attacco a scivolamento; Attacco su barra"
    },
    {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Cappetta per overdenture",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "Si",
        visitaFinale: "Si",
        valutazioneSanitaria: "Si",
        sinonimi: "Copercorona; Radice cappata; Corona a cappuccio"
    },
    {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Corona",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "Si",
        visitaFinale: "Si",
        valutazioneSanitaria: "Si",
        sinonimi: "Capsula no visita finale se solo 1; Corona fissa; Cappetta; Maryland no visita finale se solo 1"
    },
    {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Corona provvisoria, anche rinforzata",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "Si",
        visitaFinale: "Si",
        valutazioneSanitaria: "Si",
        sinonimi: "Provvisorio; Corona temporanea; Protesizione provvisoria; Elemento provvisorio rinforzato"
    },
    {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Intarsio",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "Si",
        visitaFinale: "Si",
        valutazioneSanitaria: "Si",
        sinonimi: "Restauro indiretto; Onlay; Inlay"
    },
    {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Moncone",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "Si",
        visitaFinale: "Si",
        valutazioneSanitaria: "Si",
        sinonimi: "Perno moncone; Anima radicolare; Core build-up; Abutment; Attacco ballattachment"
    },
    {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Moncone implantare provvisorio",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "Si",
        visitaFinale: "Si",
        valutazioneSanitaria: "Si",
        sinonimi: "Pilastro provvisorio; Moncone di guarigione; Abutment provvisorio"
    },
    {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Moncone per impianto",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "Si",
        visitaFinale: "Si",
        valutazioneSanitaria: "Si",
        sinonimi: "Abutment; Pilastro implantare; Transfer"
    },
    {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Perno moncone singolo o doppio",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "Si",
        visitaFinale: "Si",
        valutazioneSanitaria: "Si",
        sinonimi: "Perno radicolare fuso; Anima colata"
    },
    {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Protesi avvitata per toronto bridge",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "Si",
        visitaFinale: "Si",
        valutazioneSanitaria: "Si",
        sinonimi: "Protesi fissa ibrida avvitata; Toronto bridge; Protesi su impianti avvitata; Ponte fisso"
    },
    {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Protesi fissa all on four",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "Si",
        opt: "Si",
        visitaIniziale: "Si",
        visitaFinale: "Si",
        valutazioneSanitaria: "Si",
        sinonimi: "Riabilitazione protesica fissa con elementi in composito su impianti"
    },
   {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Protesi totale rimovibile per overdenture",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "Si",
        opt: "Si",
        visitaIniziale: "Si",
        visitaFinale: "Si",
        valutazioneSanitaria: "Si",
        sinonimi: "Overdenture; Protesi rimovibile su radici; Protesi totale con attacchi"
    },
   {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Scopertura impianto",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "Si",
        visitaFinale: "Si",
        valutazioneSanitaria: "Si",
        sinonimi: "Reintervento di scopertura; Secondo tempo chirurgico; Apertura impianto"
    },
   {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Aggiunta di microrete o rinforzo su protesi",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Aggiunta dente sllo scheletrato"
    },
   {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Attacco extracoronale su scheletrato",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Attacco a pressione; Attacco di precisione"
    },
   {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Attacco intracoronale su scheletrato",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Attacco a scatola; Attacco di precisione intracoronale"
    },
   {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Barra di rinforzo su protesi rimovibile",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Rinforzo metallico; Rete di rinforzo; Retina di rinforzo"
    },
   {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Cappetta radicolare con attacco",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Copertura radicolare con attacco; Overdenture su radice"
    },
   {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Gancio a filo",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Gancio in lega; Gancio elaborato"
    },
   {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Gancio fuso",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Gancio colato; Gancio in metallo nobile"
    },
   {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Protesi mobile",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Dentiera; Protesi rimovibile; Protesi mobile parziale; Valplast"
    },
   {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Protesi mobile totale provvisoria",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Dentiera provvisoria; Protesi immediata"
    },
   {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Protesi scheletrata",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "Si",
        visitaFinale: "Si",
        valutazioneSanitaria: "Si",
        sinonimi: "Scheletrato; Protesi parziale rimovibile metallica; Ppr; Apparecchio scheletrico con ganci; Elemento dentario per protesi scheletrica"
    },
   {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Ribasatura protesia",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Rifoderatura; Rielaborazione base protesica; Rebase"
    },
   {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Riparazione apparecchio mobile o di contenzione",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Aggiustatura; Ripristino; Saldatura apparecchio"
    },
   {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Riparazione corona",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Ricostruzione di capsula; Ripristino corona; Aggiusta corona"
    },
   {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Riparazione protesi mobile o scheletrata",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Riparazione dentiera; Saldatura scheletrato; Aggiunta di un dente; Riparazione faccetta"
    },
   {
        cod: "11ODONT",
        tipologia: "Termine sanitario",
        termine: "Saldatura protesi fissa",
        categoria: "Odontoiatria",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "No",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Ricongiunzione ponticolo; Riparazione ponte; Saldatura di un elemento"
    },
   {
        cod: "12OCONT",
        tipologia: "Termine sanitario",
        termine: "Ortodonzia contenzione",
        categoria: "Ortodonzia ",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "3000euro",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Apparecchio di contenzione"
    },
   {
        cod: "13APP",
        tipologia: "Termine sanitario",
        termine: "Ortodonzia fisso/mobile",
        categoria: "Ortodonzia ",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "maxgrup",
        maxGrup: "max 500euro arcata",
        PrevPres: "Si",
        opt: "Si",
        visitaIniziale: "Si",
        visitaFinale: "No",
        valutazioneSanitaria: "Si",
        sinonimi: "Apparecchio funzionale; Apparecchio intercettivo; Bandaggio; Disgiuntore a 2 bande; Espansore rapido palatale"
    },
   {
        cod: "13APP",
        tipologia: "Termine sanitario",
        termine: "Apparecchio mobile",
        categoria: "Ortodonzia ",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "max 500euro arcata",
        maxGrup: "3000euro",
        PrevPres: "Si",
        opt: "Si",
        visitaIniziale: "Si",
        visitaFinale: "No",
        valutazioneSanitaria: "Si",
        sinonimi: " "
    },
   {
        cod: "13APP",
        tipologia: "Termine sanitario",
        termine: "Invisalign",
        categoria: "Ortodonzia ",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "max 500euro arcata",
        maxGrup: "3000euro",
        PrevPres: "Si",
        opt: "Si",
        visitaIniziale: "Si",
        visitaFinale: "No",
        valutazioneSanitaria: "Si",
        sinonimi: " "
    },
   {
        cod: "13APP",
        tipologia: "Termine sanitario",
        termine: "Splintaggio",
        categoria: "Ortodonzia ",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "max 500euro arcata",
        maxGrup: "3000euro",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: "Contenzione fissa"
    },
   {
        cod: "13APP",
        tipologia: "Termine sanitario",
        termine: "Visita controllo ortodonzia",
        categoria: "Ortodonzia ",
        rimborso: "10% ; > 2 Anni ; > 4 Anni 1° iscrizione 20% ; < 2 Anni ; < 4 Anni 1° iscrizione",
        maxSpec: "max 500euro arcata",
        maxGrup: "3000euro",
        PrevPres: "Si",
        opt: "No",
        visitaIniziale: "No",
        visitaFinale: "No",
        valutazioneSanitaria: "No",
        sinonimi: " "
    }
];

// Variabile per il termine di ricerca
let currentSearchTerm = '';

// Funzione per verificare l'accesso
function verificaAccesso() {
    const passwordInserita = passwordInput.value;
    
    if (passwordInserita === PASSWORD_CORRETTA) {
        // Accesso consentito
        accessoContainer.classList.add('hidden');
        appContainer.classList.remove('hidden');
        // Inizializza l'app
        initApp();
    } else {
        // Accesso negato
        erroreAccesso.textContent = "Password errata. Riprova.";
        passwordInput.value = "";
        passwordInput.focus();
    }
}

// Gestione eventi per l'accesso
passwordInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        verificaAccesso();
    }
});

accediButton.addEventListener('click', verificaAccesso);

// Inizializza l'app dopo l'accesso
function initApp() {
    // Event listeners per la ricerca
    searchInput.addEventListener('input', function() {
        currentSearchTerm = this.value.toLowerCase();
        filterTerms();
    });

    searchButton.addEventListener('click', () => {
        currentSearchTerm = searchInput.value.toLowerCase();
        filterTerms();
    });
    
    // Event listener per chiudere il modal
    closeModal.addEventListener('click', () => {
        termModal.style.display = 'none';
    });
    
    // Chiudi il modal cliccando fuori dal contenuto
    window.addEventListener('click', (event) => {
        if (event.target === termModal) {
            termModal.style.display = 'none';
        }
    });
    
    // Visualizza i termini iniziali
    displayTerms(dizionarioSanitario);
    updateStats(dizionarioSanitario.length);
}

// Funzione per filtrare i termini in base alla ricerca
function filterTerms() {
    let filteredTerms = dizionarioSanitario;
    
    // Filtra per termine di ricerca
    if (currentSearchTerm) {
        filteredTerms = filteredTerms.filter(term => 
            term.termine.toLowerCase().includes(currentSearchTerm) ||
            term.sinonimi.toLowerCase().includes(currentSearchTerm) ||
            term.cod.toLowerCase().includes(currentSearchTerm) ||
            term.tipologia.toLowerCase().includes(currentSearchTerm)
        );
    }
    
    displayTerms(filteredTerms);
    updateStats(filteredTerms.length);
}

// Funzione per visualizzare i termini
function displayTerms(terms) {
    resultsContainer.innerHTML = '';
    
    if (terms.length === 0) {
        resultsContainer.innerHTML = '<div class="no-results">Nessun risultato trovato. Prova con un\'altra ricerca.</div>';
        return;
    }
    
    terms.forEach(term => {
        const termCard = document.createElement('div');
        termCard.classList.add('term-card');
        
        // Evidenziazione del testo cercato
        const highlightText = (text, search) => {
            if (!search || !text) return text || '';
            const regex = new RegExp(`(${search})`, 'gi');
            return text.toString().replace(regex, '<span class="highlight">$1</span>');
        };
        
        termCard.innerHTML = `
            <h3 class="term-name">${highlightText(term.termine, currentSearchTerm)}</h3>
            <div class="term-detail">
                <span class="detail-label">COD:</span> ${highlightText(term.cod, currentSearchTerm)}
            </div>
            <div class="term-detail">
                <span class="detail-label">Tipologia:</span> ${highlightText(term.tipologia, currentSearchTerm)}
            </div>
            <div class="term-detail">
                <span class="detail-label">Rimborso:</span> ${highlightText(term.rimborso, currentSearchTerm)}
            </div>
            <div class="view-details">
                <i class="fas fa-expand-alt"></i> Clicca per vedere tutti i dettagli
            </div>
        `;
        
        // Aggiungi evento click per aprire il modal con i dettagli
        termCard.addEventListener('click', function() {
            openModal(term);
        });
        
        resultsContainer.appendChild(termCard);
    });
}

// Funzione per aprire il modal con i dettagli completi
function openModal(term) {
    // Evidenziazione del testo cercato
    const highlightText = (text, search) => {
        if (!search || !text) return text || '';
        const regex = new RegExp(`(${search})`, 'gi');
        return text.toString().replace(regex, '<span class="highlight">$1</span>');
    };
    
    modalContent.innerHTML = `
        <h2 class="modal-term-name">${highlightText(term.termine, currentSearchTerm)}</h2>
        <div class="modal-term-detail">
            <span class="modal-detail-label">COD:</span> ${highlightText(term.cod, currentSearchTerm)}
        </div>
        <div class="modal-term-detail">
            <span class="modal-detail-label">Tipologia:</span> ${highlightText(term.tipologia, currentSearchTerm)}
        </div>
        <div class="modal-term-detail">
            <span class="modal-detail-label">Categoria:</span> ${term.categoria}
        </div>
        <div class="modal-term-detail">
            <span class="modal-detail-label">Rimborso:</span> ${highlightText(term.rimborso, currentSearchTerm)}
        </div>
        <div class="modal-term-detail">
            <span class="modal-detail-label">Max Spec:</span> ${highlightText(term.maxSpec, currentSearchTerm)}
        </div>
        <div class="modal-term-detail">
            <span class="modal-detail-label">Max Grup:</span> ${highlightText(term.maxGrup, currentSearchTerm)}
        </div>
        <div class="modal-term-detail">
            <span class="modal-detail-label">Preventivo-Prescrizione:</span> ${highlightText(term.PrevPres, currentSearchTerm)}
        </div>
        <div class="modal-term-detail">
            <span class="modal-detail-label">OPT:</span> ${highlightText(term.opt, currentSearchTerm)}
        </div>
        <div class="modal-term-detail">
            <span class="modal-detail-label">Visita Iniziale:</span> ${highlightText(term.visitaIniziale, currentSearchTerm)}
        </div>
        <div class="modal-term-detail">
            <span class="modal-detail-label">Visita Finale:</span> ${highlightText(term.visitaFinale, currentSearchTerm)}
        </div>
        <div class="modal-term-detail">
            <span class="modal-detail-label">Valutazione Sanitaria:</span> ${highlightText(term.valutazioneSanitaria, currentSearchTerm)}
        </div>
        <div class="modal-term-detail">
            <span class="modal-detail-label">Sinonimi:</span> ${highlightText(term.sinonimi, currentSearchTerm)}
        </div>
    `;
    
    termModal.style.display = 'block';
}

// Funzione per aggiornare le statistiche
function updateStats(count) {
    termsCount.textContent = `${count} termini trovati`;
}
