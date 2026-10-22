// Banco di prova per i widget Scidoo.
// La configurazione vive nell'hash dell'URL (#data-lang=1&...), non nella query string:
// gli script Scidoo inoltrano window.location.search al loro server, e non vogliamo
// che i parametri del banco di prova finiscano nella richiesta.

const CODICE = '64ffcd90-cbb5-4c37-8818-4994ade2c748';

const LINGUE = [
  ['0', 'Italiano'],
  ['1', 'English'],
  ['3', 'Français'],
  ['4', 'Deutsch'],
  ['8', 'Nederlands'],
  ['2', 'Español (non attiva sul Calanco)'],
  ['5', 'Русский (non attiva sul Calanco)'],
];

// panel: true  -> attributo presente nello snippet del pannello Scidoo, emesso sempre (anche vuoto)
// panel: false -> attributo letto dagli script ma non esposto dal pannello, emesso solo se valorizzato
// letto: false -> attributo del pannello che gli script attuali non leggono
const COMUNI = [
  { name: 'data-codice', type: 'text', def: CODICE, panel: true, help: 'ID della struttura.' },
  { name: 'data-lang', type: 'select', options: LINGUE, def: '0', panel: true, help: 'Lingua del widget.' },
  { name: 'data-struttura', type: 'text', def: '-1', panel: true, help: '-1 = tutte le strutture, altrimenti ID della sotto-struttura.' },
  { name: 'data-provenienza', type: 'text', def: '0', panel: true, help: 'ID del tag [provenienza] definito nei Tag Profilazione.' },
  { name: 'data-testo-struttura', type: 'text', def: '', panel: true, help: 'Testo/slogan vicino al nome della struttura.' },
  { name: 'data-settore-specifico', type: 'text', def: '', panel: true, letto: false, help: 'Apre direttamente un settore del booking engine (ID dal menu del pannello).' },
];

const GIORNI = [
  { name: 'data-giorni-arrivo', type: 'giorni', def: '', panel: true, help: 'Giorni in cui si può arrivare.' },
  { name: 'data-giorni-colore', type: 'colore', def: '', panel: true, help: 'Colore esadecimale dei giorni di arrivo.' },
];

const NASCOSTI = [
  { name: 'data-riclassificazione-categoria', type: 'text', def: '', panel: false, help: 'ID di una riclassificazione categoria.' },
  { name: 'data-blocca-provenienza', type: 'check', def: '', panel: false, help: 'Disattiva la registrazione statistica della provenienza.' },
];

const WIDGET = {
  float: {
    src: 'https://www.scidoo.com/preventivo_picker/include_preventivo.js',
    id: null,
    campi: [
      ...COMUNI,
      { name: 'data-top', type: 'text', def: '', panel: true, help: 'Distanza dall\'alto (px, %, em). Es. 200' },
      { name: 'data-right', type: 'text', def: '', panel: true, help: 'Distanza da destra. Es. 20' },
      { name: 'data-left', type: 'text', def: '', panel: true, help: 'Distanza da sinistra. Es. 20' },
      { name: 'data-bottom', type: 'text', def: '', panel: true, help: 'Distanza dal basso. Es. 200' },
      { name: 'data-pulsante-mobile', type: 'text', def: '', panel: true, help: 'ID dell\'elemento che apre il widget su mobile. Prova: pulsante_mobile_s' },
      ...GIORNI,
      { name: 'data-pulsante-desktop', type: 'text', def: '', panel: true, help: 'ID dell\'elemento che mostra/nasconde il widget su desktop. Prova: pulsante_desktop_s' },
      { name: 'data-recupero-password', type: 'check', def: '', panel: true, letto: false, help: 'Casella "Recupero password" del pannello. Nome dell\'attributo da verificare: spunta la casella nel pannello e confronta lo snippet.' },
      ...NASCOSTI,
    ],
  },
  inline: {
    src: 'https://www.scidoo.com/preventivo_picker/include_widget_inlinev2.js',
    id: 'scidoo-widget-inlinev2',
    campi: [
      ...COMUNI,
      { name: 'data-container', type: 'text', def: 'contenitore', panel: true, help: 'ID dell\'elemento che ospita il widget. Vuoto = il genitore dello script.' },
      ...GIORNI,
      { name: 'data-visualizza-widget-mobile', type: 'check', def: '', panel: false, help: 'Mostra i campi date e ospiti anche su mobile.' },
      { name: 'data-nascondi-campi-secondari', type: 'check', def: '', panel: false, help: 'Nasconde i campi secondari.' },
      { name: 'data-categoria-ricerca', type: 'text', def: '', panel: false, help: 'ID di categoria per la ricerca.' },
      { name: 'data-alloggio_specifico', type: 'text', def: '', panel: false, help: 'ID di un alloggio specifico (con underscore, come nello script).' },
      ...NASCOSTI,
    ],
  },
};

const TRACCIAMENTO_SRC = 'https://www.scidoo.com/preventivo_picker/widget_statistiche/include_widget.js';
const JQUERY_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js';

function leggiHash() {
  return new URLSearchParams(location.hash.slice(1));
}

function valori(widget) {
  const h = leggiHash();
  const v = {};
  for (const c of WIDGET[widget].campi) v[c.name] = h.has(c.name) ? h.get(c.name) : c.def;
  v._tracciamento = h.has('_tracciamento') ? h.get('_tracciamento') : '1';
  return v;
}

function attributi(widget, v) {
  const out = [];
  for (const c of WIDGET[widget].campi) {
    const val = v[c.name];
    if (val !== '' || (c.panel && c.type !== 'check')) out.push([c.name, val]);
  }
  return out;
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function snippet(widget, v) {
  const w = WIDGET[widget];
  const parti = ['type="text/javascript"', `src="${w.src}"`];
  if (w.id) parti.push(`id="${w.id}"`);
  for (const [n, val] of attributi(widget, v)) parti.push(`${n}="${esc(val)}"`);
  let s = `<script src="${JQUERY_SRC}"></script>\n`;
  if (v._tracciamento === '1') s += `<script type="text/javascript" src="${TRACCIAMENTO_SRC}" data-codice="${esc(v['data-codice'])}"></script>\n`;
  s += `<script ${parti.join(' ')}></script>`;
  return s;
}

function caricaScript(src, attrs, dove) {
  const s = document.createElement('script');
  s.type = 'text/javascript';
  s.src = src;
  for (const [n, val] of attrs) s.setAttribute(n, val);
  dove.appendChild(s);
  return s;
}

function campoHtml(c, val) {
  const id = 'f-' + c.name;
  let input;
  if (c.type === 'select') {
    input = `<select id="${id}" name="${c.name}">` +
      c.options.map(([k, l]) => `<option value="${k}"${k === val ? ' selected' : ''}>${k} · ${l}</option>`).join('') +
      '</select>';
  } else if (c.type === 'check') {
    input = `<label class="check"><input type="checkbox" id="${id}" name="${c.name}" value="1"${val === '1' ? ' checked' : ''}> attivo (="1")</label>`;
  } else if (c.type === 'giorni') {
    const sel = val.split(',').filter(Boolean);
    const nomi = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
    input = `<div class="giorni" data-name="${c.name}">` +
      nomi.map((n, i) => `<label><input type="checkbox" value="${i + 1}"${sel.includes(String(i + 1)) ? ' checked' : ''}> ${n}</label>`).join('') +
      '</div>';
  } else if (c.type === 'colore') {
    input = `<div class="colore"><input type="text" id="${id}" name="${c.name}" value="${esc(val)}" placeholder="#2e7d32">` +
      `<input type="color" aria-label="Scegli colore" value="${/^#[0-9a-f]{6}$/i.test(val) ? val : '#2e7d32'}"></div>`;
  } else {
    input = `<input type="text" id="${id}" name="${c.name}" value="${esc(val)}">`;
  }
  const tag = c.letto === false ? '<span class="tag avviso">non letto dagli script</span>'
    : c.panel ? '' : '<span class="tag extra">fuori dal pannello</span>';
  return `<div class="campo"><label class="nome" for="${id}">${c.name}${tag}</label>${input}<p class="help">${c.help}</p></div>`;
}

function avvia(widget) {
  const v = valori(widget);
  const form = document.getElementById('parametri');
  const campi = WIDGET[widget].campi;

  form.innerHTML =
    campi.map(c => campoHtml(c, v[c.name])).join('') +
    `<div class="campo"><label class="check"><input type="checkbox" name="_tracciamento" value="1"${v._tracciamento === '1' ? ' checked' : ''}> includi anche il widget Tracciamento</label></div>` +
    '<div class="azioni"><button type="submit">Applica e ricarica</button><button type="button" id="reset">Valori predefiniti</button></div>';

  form.querySelectorAll('.colore').forEach(box => {
    const [txt, pick] = box.querySelectorAll('input');
    pick.addEventListener('input', () => { txt.value = pick.value; });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const h = new URLSearchParams();
    for (const c of campi) {
      let val;
      if (c.type === 'check') val = form.querySelector(`[name="${c.name}"]`).checked ? '1' : '';
      else if (c.type === 'giorni') val = [...form.querySelectorAll(`[data-name="${c.name}"] input:checked`)].map(i => i.value).join(',');
      else val = form.querySelector(`[name="${c.name}"]`).value.trim();
      if (val !== c.def) h.set(c.name, val);
    }
    if (!form.querySelector('[name="_tracciamento"]').checked) h.set('_tracciamento', '0');
    location.hash = h.toString();
    location.reload();
  });

  // Ogni modifica ricarica subito il widget: select e caselle al cambio,
  // i campi di testo quando si esce dal campo o si preme Invio.
  form.addEventListener('change', () => form.requestSubmit());

  document.getElementById('reset').addEventListener('click', () => {
    history.replaceState(null, '', location.pathname);
    location.reload();
  });

  const testo = snippet(widget, v);
  document.getElementById('snippet').textContent = testo;
  document.getElementById('copia').addEventListener('click', async e => {
    try {
      await navigator.clipboard.writeText(testo);
      e.target.textContent = 'Copiato';
    } catch {
      e.target.textContent = 'Copia non riuscita';
    }
    setTimeout(() => { e.target.textContent = 'Copia'; }, 1500);
  });

  // Gli script Scidoo leggono gli attributi con jQuery('script[data-…]'), quindi
  // possono essere inseriti dinamicamente. L'inline cerca il proprio tag per id
  // e, con data-container vuoto, si monta nel genitore dello script.
  const stato = document.getElementById('stato');
  const jq = caricaScript(JQUERY_SRC, [], document.head);
  jq.onload = () => {
    stato.textContent = 'jQuery caricato, in attesa del widget…';
    if (v._tracciamento === '1') caricaScript(TRACCIAMENTO_SRC, [['data-codice', v['data-codice']]], document.body);
    const w = WIDGET[widget];
    const attrs = attributi(widget, v);
    if (w.id) attrs.unshift(['id', w.id]);
    caricaScript(w.src, attrs, document.getElementById('punto-script'));
  };

  const inizio = Date.now();
  const controllo = setInterval(() => {
    if (document.getElementById('id_str_book')) {
      stato.textContent = `Widget caricato in ${((Date.now() - inizio) / 1000).toFixed(1)} s`;
      stato.className = 'stato ok';
      clearInterval(controllo);
    } else if (Date.now() - inizio > 15000) {
      stato.textContent = 'Widget non caricato dopo 15 s: controlla la console del browser';
      stato.className = 'stato errore';
      clearInterval(controllo);
    }
  }, 300);
}
