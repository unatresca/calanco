# Architettura

Il progetto comprende due siti, Una Tresca e La Campeggia, e un'area interna della Campeggia ancora da definire (vedi il [README](../README.md)). I siti sono Astro statico. Questa pagina descrive come la Campeggia si integra con Scidoo oggi e le strade per un'integrazione più profonda; la scelta si farà quando saranno noti l'API di Scidoo e il perimetro dell'area interna.

## Oggi: widget Scidoo

Il sito della Campeggia incorpora il widget **Float** oppure **Inline** di Scidoo, secondo la preferenza di chi gestisce il campeggio; le [pagine di prova](../prove/scidoo/) servono a decidere. Il dettaglio tecnico è in [scidoo.md](scidoo.md).

Conseguenze per il sito:

- jQuery va caricato nelle pagine che ospitano il widget, e solo lì.
- Float e Inline stanno su pagine diverse.
- Il widget Tracciamento si carica solo dopo il consenso ai cookie.
- La prenotazione prosegue su `preventivov2`, con l'aspetto deciso da Scidoo.

## Strade per l'integrazione via API

Tutte e tre presuppongono l'API di Scidoo con un codice di autorizzazione. Il codice non può stare nel browser, quindi ogni strada introduce del codice lato server che fa da intermediario.

### 1. Astro statico + Cloudflare Worker separato

Il sito resta interamente statico (GitHub Pages, Cloudflare Pages o simili). Un Worker a parte espone pochi endpoint (disponibilità, preventivo, prenotazione), custodisce il codice API e chiama Scidoo. Le pagine Astro lo interrogano dal browser.

- **Adatta se** l'API serve a poche funzioni e si vuole tenere il sito disaccoppiato dal backend.
- **Costo:** due progetti da pubblicare e versionare; CORS e contratto degli endpoint da tenere allineati.

### 2. Astro su Cloudflare con route server

Un solo progetto Astro con l'adapter `@astrojs/cloudflare`: le pagine restano pre-generate, mentre alcune route (`/api/…`, eventuali pagine di prenotazione) girano on demand come Worker.

- **Adatta se** l'integrazione si limita a cercare e prenotare. Rispetto alla 1 elimina il secondo progetto e il CORS.
- **Costo:** il deploy passa da hosting statico a Cloudflare.

### 3. Area interna in Remix (React Router v7)

Remix è confluito in React Router v7, che resta la base per questa strada. L'area interna è un'applicazione a sé (per esempio `area.lacampeggia.…`), accanto ai siti Astro: login, gestione della prenotazione, documenti, pagamenti, comunicazioni con il campeggio. Gira anch'essa su Cloudflare Workers.

- **Adatta se** l'area interna diventa un prodotto con stato e utenti, non solo un modulo di prenotazione.
- **Costo:** è la strada più ampia: autenticazione, sessioni, dati propri e tutti i casi d'errore della prenotazione sono a carico nostro.

Le strade si combinano: la 2 per la ricerca e la prenotazione sul sito, la 3 quando l'area interna prende forma.

## Cosa serve per scegliere

1. Documentazione e condizioni dell'API di Scidoo (domande in [scidoo.md](scidoo.md#domande-aperte-per-scidoo)).
2. Il perimetro dell'area interna: chi la usa (ospiti, staff, soci) e per fare cosa.

## Strade scartate

- **Usare gli endpoint `api.scidoo.com/be/*` del nuovo booking engine.** Rispondono senza credenziali, ma non sono documentati né garantiti: possono cambiare senza preavviso e rompere le prenotazioni.
- **Booking engine interamente nostro senza API Scidoo.** Disponibilità e prenotazioni vivono in Scidoo; duplicarle significa sincronizzazioni fragili e rischio di prenotazioni doppie.
- **Attivare il login ospiti di Scidoo.** Per un campeggio con soggiorni occasionali, creare un account con password aggiunge attrito alla prenotazione senza un beneficio chiaro.
