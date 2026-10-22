# Scidoo: widget e booking engine

Scidoo è il gestionale della Campeggia. Questa pagina raccoglie come si comportano i suoi strumenti di prenotazione online, ricavato dal codice degli script e da prove nel browser (ottobre 2026). Le guide PDF di Scidoo sono incomplete in più punti: dove divergono, vale quanto scritto qui.

Codice struttura (`data-codice` / `shop-id`): `64ffcd90-cbb5-4c37-8818-4994ade2c748`. In Scidoo la struttura si chiama "La Campeggia".

## Lingue

| Lingua | Widget (`data-lang`) | Nuovo booking engine (`lang`) |
|---|---|---|
| Italiano | `0` | `it` |
| Inglese | `1` | `en` |
| Francese | `3` | `fr` |
| Tedesco | `4` | `de` |
| Olandese | `8` | `nl` |

Sono le cinque lingue attive per la struttura. Scidoo ne supporta altre (spagnolo `2`, russo `5`, …), che però richiedono le traduzioni dei servizi in Scidoo.

## Widget

Tre script da incorporare nel sito, tutti su `www.scidoo.com/preventivo_picker/`:

| Widget | Script | A cosa serve |
|---|---|---|
| Float | `include_preventivo.js` | Riquadro di ricerca sovrapposto alla pagina; su mobile diventa un pulsante "Prenota ora". |
| Inline | `include_widget_inlinev2.js` (con `id="scidoo-widget-inlinev2"`) | Barra di ricerca montata dentro un elemento della pagina. |
| Tracciamento | `widget_statistiche/include_widget.js` | Statistiche di navigazione per Scidoo; va su tutte le pagine. |

Float e Inline aprono il booking engine `preventivov2`, che non ha login per gli ospiti.

### Come funzionano

- Richiedono **jQuery** con AJAX (non la build "slim"). Si caricano in due passi: lo script iniziale chiede HTML a un endpoint PHP di Scidoo e lo inserisce nella pagina. Nelle prove il widget compare in circa un secondo.
- Ogni attributo viene letto con `jQuery('script[data-…]')`, cioè dal **primo** `<script>` della pagina che lo porta, non dal tag del widget. Float e Inline sulla stessa pagina si leggono gli attributi a vicenda: vanno su pagine diverse.
- Gli script inviano a Scidoo `document.referrer` e la query string della pagina (`location.search`), che permette a Scidoo di attribuire le prenotazioni alle campagne.
- Il Tracciamento calcola un'impronta del browser (libreria ThumbmarkJS) e invia eventi a `config/statistiche/stat.php`. Per il GDPR va caricato solo dopo il consenso.

### Attributi

Comuni a Float e Inline:

| Attributo | Significato |
|---|---|
| `data-codice` | Codice struttura. |
| `data-lang` | Lingua (tabella sopra). |
| `data-struttura` | `-1` tutte le strutture, altrimenti ID della sotto-struttura. |
| `data-provenienza` | ID del tag "provenienza" definito nei Tag Profilazione di Scidoo. |
| `data-testo-struttura` | Testo accanto al nome della struttura. |
| `data-giorni-arrivo` | Giorni di arrivo ammessi, `1` = lunedì … `7` = domenica, separati da virgola. |
| `data-giorni-colore` | Colore esadecimale dei giorni di arrivo. |
| `data-riclassificazione-categoria` | ID di una riclassificazione categoria. Non esposto dal pannello. |
| `data-blocca-provenienza` | `1` disattiva la registrazione statistica della provenienza. Non esposto dal pannello. |

Solo Float:

| Attributo | Significato |
|---|---|
| `data-top`, `data-right`, `data-bottom`, `data-left` | Posizione; numero in px, oppure con unità `px`, `%`, `em`. |
| `data-pulsante-mobile` | ID dell'elemento che apre il widget sotto i 993 px; sostituisce il pulsante "Prenota ora". |
| `data-pulsante-desktop` | ID dell'elemento che mostra/nasconde il widget sopra i 993 px; il widget parte nascosto. |

Solo Inline:

| Attributo | Significato |
|---|---|
| `data-container` | ID dell'elemento che ospita il widget; vuoto = genitore dello script. |
| `data-visualizza-widget-mobile` | Mostra date e ospiti anche su mobile. Non esposto dal pannello. |
| `data-nascondi-campi-secondari` | Nasconde i campi secondari. Non esposto dal pannello. |
| `data-categoria-ricerca` | ID di categoria per la ricerca. Non esposto dal pannello. |
| `data-alloggio_specifico` | ID di un alloggio specifico; con il trattino basso. Non esposto dal pannello. |

Il pannello Scidoo inserisce anche `data-settore-specifico` e offre la casella "Recupero password", ma nessuno dei due script li legge.

## Nuovo booking engine

`https://booking.scidoo.com/?shop-id=…` è un'applicazione Vue che parla con l'API REST `api.scidoo.com/be/*`. Scidoo lo presenta come versione di test. Rispetto a `preventivov2` offre:

- account ospite con registrazione, login, recupero password e profilo con i dati anagrafici del check-in; per la Campeggia il login è spento (`enableLogin: false`);
- ricerca su mappa e settori, codici sconto, pacchetti e offerte, campi personalizzati (tipo e lunghezza del veicolo), animali come tipo di ospite.

Si apre già compilato con parametri nell'URL:

```
https://booking.scidoo.com/?shop-id=<codice>&lang=nl&checkin=2027-07-10&checkout=2027-07-17&adults=2&childrenAges=5,9
```

| Parametro | Significato |
|---|---|
| `lang` | `it`, `en`, `de`, `es`, `fr`, `ru`, `nl`, `sl`, `tr` |
| `checkin`, `checkout` | Date `AAAA-MM-GG`. |
| `adults` | Numero di adulti. |
| `childrenAges` | Età dei bambini separate da virgola; il numero di bambini si ricava da qui. |
| `sectorId`, `offerId`, `group-id` | Settore, offerta o gruppo da preselezionare. |
| `reset-password` | Apre "Password dimenticata", se il login è attivo. |

Nelle prove `lang`, `adults`, `childrenAges` e `checkin` vengono applicati; `checkout` no: il soggiorno torna sempre a una notte. I parametri non sono documentati da Scidoo.

Anche `preventivov2` accetta parametri: `?cod=<codice>&lang=8&dataarr=AAAA-MM-GG&notti=7&adult=2`.

## API

Scidoo offre [API per integrazioni autorizzate](https://www.scidoo.com/en/api-aperte-hotel) su prenotazioni, ospiti, disponibilità, tariffe, servizi e pagamenti. La struttura autorizza il partner e Scidoo rilascia un codice limitato alle funzioni concesse. La documentazione non è pubblica: si ottiene tramite Scidoo.

## Domande aperte per Scidoo

1. Documentazione dell'API, operazioni disponibili (disponibilità, preventivo, creazione prenotazione con pagamento) e costi.
2. Il nuovo booking engine è pronto per la produzione? Perché ignora `checkout`? I parametri dell'URL sono supportati?
3. Personalizzazione del nuovo booking engine: colori, font, dominio proprio.
4. Nome dell'attributo generato dalla casella "Recupero password" e uso di `data-settore-specifico`.
