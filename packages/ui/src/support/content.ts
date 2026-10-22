import type { MenuItem } from "../organisms/FullscreenMenu";

/** Testi dei siti attuali, per storie realistiche. */

export const menuItems: MenuItem[] = [
  { label: "TRESCA", href: "#tresca", features: ["ss14"] },
  { label: "Cosa fa?", href: "#cosafa", features: ["calt"] },
  { label: "Dove trovarla?", href: "#dovetrovarla", features: ["calt"] },
  { label: "La Campeggia", href: "#lacampeggia", features: ["calt"] },
];

export const legalLines = [
  "Tresca Srl Impresa Sociale – Via Casale Montesoro 2, 15050, Costa Vescovato (AL) – P.IVA 02 71 84 80 0 60 – trescaimpresasociale@pec.it",
  "Grafica, web e fotografia: Roberta Donatini",
];

export const campeggia = {
  intro:
    "Nel luglio 2023 Tresca ha preso in gestione il campeggio comunale di Costa Vescovato, dando vita a la Campeggia. La Campeggia è un campeggio sociale, un luogo di incontro e socialità per chi viaggia e per chi risiede nell’area. Vuole permettere al mondo esterno di scoprire le bellezze e peculiarità di questo territorio, e allo stesso tempo mira a generare nuove relazioni e opportunità per la comunità locale. Al suo interno si trovano una piscina pubblica ed un orto comunitario.",
  servicesIntro: "Alla Campeggia si trovano:",
  services: [
    "piazzole per camper, van e roulotte",
    "aree tende sul prato e nel bosco",
    "accesso a elettricità e acqua potabile",
    "punto di scarico camper",
    "grande bagno con docce, toilette, lavelli e spogliatoi",
    "piscina con vista sui colli",
    "bar con selezione di vini, birre, cocktail e analcolici",
  ],
  address: "La Campeggia si trova in via Sarizzola a Costa Vescovato (AL).",
  mapUrl: "https://goo.gl/maps/1KdmqvmQ4xUSsKFXA",
  phone: "+39 379 297 82 31",
  email: "lacampeggia@unatresca.it",
  instagram: "https://www.instagram.com/lacampeggia/",
};

export const cosaFa = {
  intro: [
    "Tresca crea spazi di socialità in cui arte, musica e cultura diventano strumenti volti a stimolare lo sviluppo della collettività.",
    "Progetta e produce eventi che mettono in relazione mondi, discipline e comunità diverse, promuovendo forme di intrattenimento e turismo più sostenibili.",
  ],
  sections: [
    {
      title: "Progettazione",
      text: "Tresca progetta iniziative coinvolgenti per valorizzare culture, saperi e tradizioni. Cura la direzione artistica e creativa, il project management e la comunicazione.",
    },
    {
      title: "Produzione",
      text: "Tresca è capace di operare su più livelli nel processo di gestione e produzione di un evento. Si occupa di direzione tecnica, allestimenti, food e bar management, segreteria organizzativa, artist e customer care, campeggi per festival, licenze, permessi e autorizzazioni.",
    },
    {
      title: "Relazione",
      text: "Tresca crede nell’incontro, nella relazione e nello scambio. Considera il confronto e la collaborazione come occasioni di crescita, pone centrale la relazione con le realtà del territorio in cui agisce, valorizza organizzazioni e pratiche indipendenti.",
    },
  ],
};

export const doveTrovarla = {
  luogo:
    "Tresca vive a Costa Vescovato (AL), piccolo comune rurale sui colli Tortonesi. Area di confine tra Piemonte, Lombardia e Liguria, questi colli caratterizzati dall’alternarsi di ripidi calanchi e filari di vite offrono paesaggi mozzafiato e una ricca proposta di prodotti enogastronomici locali.",
  storia: [
    "Tresca nasce da Rishi, Filippo e Federica, operatori del settore degli eventi e dello spettacolo che hanno scelto di coniugare il proprio lavoro alla ricerca di un modo di vivere più sostenibile, attraverso la vita comunitaria e immersa nella natura.",
    "Gli anni di esperienza urbana in Italia e all’estero hanno permesso di formarsi professionalmente e tessere reti con realtà artistiche, sociali e culturali sia istituzionali che dal basso. Tresca è nata dal desiderio di portare il valore di queste relazioni su un piano lavorativo e sperimentare nuovi modi di fare cultura tra la città e la campagna.",
  ],
};
