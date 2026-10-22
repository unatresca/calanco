# Calanco

Progetto web di [Una Tresca](https://www.unatresca.it/). Comprende:

- **Sito di Una Tresca**: nuovo sito per <https://www.unatresca.it/>.
- **Sito della Campeggia**: nuovo sito del campeggio sociale La Campeggia, oggi su <https://www.unatresca.it/lacampeggia/>.
- **Area interna della Campeggia**: da definire.

I siti saranno costruiti con Astro, come sito statico. Le prenotazioni della Campeggia passano da [Scidoo](https://www.scidoo.com/), il gestionale del campeggio.

Pubblicato su GitHub Pages: <https://unatresca.github.io/calanco/>

## Struttura

Monorepo pnpm.

| Cartella | Contenuto |
|---|---|
| `packages/tokens` | Token CSS (colori, tipografia, spaziature, temi Tresca e Campeggia) e font con licenza libera. |
| `packages/ui` | Componenti React del design system, organizzati per atomic design, con le loro storie. |
| `apps/storybook` | Storybook del design system e pagine di documentazione. Pubblicato in `/storybook/`. |
| `prove/scidoo` | Pagine di prova dei widget di prenotazione Scidoo. Pubblicate in `/scidoo/`. |
| `docs` | [Scidoo](docs/scidoo.md) e [architettura](docs/architettura.md). |

## Sviluppo

Node 24 (`mise.toml`) e pnpm (versione in `package.json`).

```sh
pnpm install
pnpm storybook        # http://localhost:6006
pnpm build-storybook
pnpm typecheck
```

MF Odd Mono, il font dei titoli dei siti attuali, è commerciale e non sta nel repository: va messo in `packages/tokens/fonts/local/` (vedi il README della cartella). Senza, lo Storybook usa un font alternativo.

Pagine di prova Scidoo in locale:

```sh
cd prove
uv run --no-project python -m http.server 8765
```
