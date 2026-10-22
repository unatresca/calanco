# Calanco

Progetto web di [Una Tresca](https://www.unatresca.it/). Comprende:

- **Sito di Una Tresca**: nuovo sito per <https://www.unatresca.it/>.
- **Sito della Campeggia**: nuovo sito del campeggio sociale La Campeggia, oggi su <https://www.unatresca.it/lacampeggia/>.
- **Area interna della Campeggia**: da definire.

I siti saranno costruiti con Astro, come sito statico. Le prenotazioni della Campeggia passano da [Scidoo](https://www.scidoo.com/), il gestionale del campeggio.

## Contenuto

- [`prove/scidoo/`](prove/scidoo/): pagine di prova dei widget di prenotazione Scidoo (Float, Inline, link diretto al booking engine). Sono pubblicate su GitHub Pages: <https://unatresca.github.io/calanco/scidoo/>
- [`docs/scidoo.md`](docs/scidoo.md): come funzionano davvero i widget e il booking engine Scidoo.
- [`docs/architettura.md`](docs/architettura.md): le strade per integrare Scidoo e per l'area interna.

## Pagine di prova in locale

```sh
cd prove
uv run --no-project python -m http.server 8765
```

Poi apri <http://localhost:8765/scidoo/>.
