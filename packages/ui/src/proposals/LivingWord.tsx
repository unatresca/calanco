import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { seededRandom } from "../support/random";
import "./LivingWord.css";

export type LivingPattern = "trattini" | "puntini" | "macchie" | "coralli" | "labirinto";

/**
 * - ciclo: cresce, resta, le macchie si restringono fino a sparire e la parola rinasce da un seme nuovo;
 * - una-volta: cresce e resta ferma (mouse, tocco e scorrimento la risvegliano).
 */
export type LivingMotion = "ciclo" | "una-volta";

export interface LivingWordProps {
  text: string;
  /** Famiglia CSS del font che fa da stampo; senza, usa il font display. */
  fontFamily?: string;
  /** Peso del font stampo: tratti più spessi contengono più macchie e si leggono meglio. */
  fontWeight?: number;
  /** Corpo del testo in pixel. */
  fontSize?: number;
  pattern?: LivingPattern;
  motion?: LivingMotion;
  /** Stesso seme, stessa prima crescita. */
  seed?: number;
  /** Durata della crescita, in millisecondi. */
  growMs?: number;
  /** In "ciclo", quanto resta ferma prima di sparire, in millisecondi. */
  holdMs?: number;
  /** In "ciclo", quanto dura la sparizione, in millisecondi. */
  fadeMs?: number;
  /** Mouse e dito (passaggio, tocco, trascinamento) seminano nuova crescita dove passano. */
  interactive?: boolean;
  /** Lo scorrimento della pagina semina crescita, tanto più quanto più si scorre veloce. */
  reactToScroll?: boolean;
  /** Finezza della simulazione: celle per em. Più alto = macchie più piccole rispetto alle lettere, calcolo più pesante. */
  cellsPerEm?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Parametri di Gray-Scott (alimentazione f, consumo k).
 * Puntini, trattini e macchie restano separati e coprono la lettera in modo uniforme,
 * come un retino: la forma si legge anche se la trama è discontinua.
 */
const PATTERNS: Record<LivingPattern, { f: number; k: number }> = {
  trattini: { f: 0.042, k: 0.065 },
  puntini: { f: 0.0367, k: 0.0649 },
  macchie: { f: 0.03, k: 0.0625 },
  coralli: { f: 0.0545, k: 0.062 },
  labirinto: { f: 0.029, k: 0.057 },
};

/** Passi di simulazione al secondo: legati al tempo, non ai fotogrammi, così la crescita ha la stessa velocità a 60 e a 120 Hz. */
const STEPS_PER_SECOND = 960;
/** Tetto per fotogramma: dopo una pausa lunga (scheda nascosta) non si recupera tutto in un colpo. */
const MAX_STEPS_PER_FRAME = 24;
/** Quota delle celle interne alle lettere che ricevono un seme all'inizio. */
const SEED_DENSITY = 0.02;
/** Ogni quanti passi si cercano zone vuote da riseminare. */
const REFILL_EVERY = 300;
/** Raggio, in celle, entro cui una zona senza trama è considerata vuota. */
const REFILL_RADIUS = 6;
/** Soglia di B oltre cui una cella è disegnata; durante la sparizione sale fino a FADE_THRESHOLD. */
const THRESHOLD = 0.1;
const FADE_THRESHOLD = 0.55;

type Phase = "grow" | "hold" | "fade" | "still";

/**
 * Proposta 3 — parola viva.
 * Una simulazione di reazione-diffusione (Gray-Scott) cresce dentro la forma delle lettere,
 * ogni volta diversa. È disegnata su canvas: il testo vero resta nella pagina per lettori di
 * schermo e motori di ricerca, ed è quello che si vede senza JavaScript o con "riduci movimento".
 */
export function LivingWord({
  text,
  fontFamily,
  fontWeight = 400,
  fontSize = 180,
  pattern = "trattini",
  motion = "ciclo",
  seed = 1,
  growMs = 6000,
  holdMs = 2500,
  fadeMs = 1500,
  interactive = true,
  reactToScroll = true,
  cellsPerEm = 160,
  className,
  style,
}: LivingWordProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let cancelled = false;
    const cleanups: (() => void)[] = [];

    const start = async () => {
      const computed = getComputedStyle(root);
      const family = computed.fontFamily;
      await document.fonts.load(`${fontWeight} ${fontSize}px ${family}`, text);
      if (cancelled) return;

      // Stampo delle lettere alla risoluzione della simulazione.
      const cell = fontSize / cellsPerEm;
      const gridFont = `${fontWeight} ${cellsPerEm}px ${family}`;
      const probe = document.createElement("canvas").getContext("2d")!;
      probe.font = gridFont;
      const metrics = probe.measureText(text);
      const pad = Math.ceil(cellsPerEm / 10);
      const w = Math.ceil(metrics.width) + pad * 2;
      const h = Math.ceil(cellsPerEm * 1.25) + pad * 2;

      const maskCanvas = document.createElement("canvas");
      maskCanvas.width = w;
      maskCanvas.height = h;
      const maskCtx = maskCanvas.getContext("2d")!;
      maskCtx.font = gridFont;
      maskCtx.textBaseline = "alphabetic";
      maskCtx.fillText(text, pad, pad + cellsPerEm * 0.95);
      const maskPixels = maskCtx.getImageData(0, 0, w, h).data;
      const mask = new Uint8Array(w * h);
      const inside: number[] = [];
      for (let i = 0; i < w * h; i++) {
        const x = i % w;
        const y = Math.floor(i / w);
        if (maskPixels[i * 4 + 3] > 127 && x > 0 && y > 0 && x < w - 1 && y < h - 1) {
          mask[i] = 1;
          inside.push(i);
        }
      }

      let a = new Float32Array(w * h).fill(1);
      let b = new Float32Array(w * h);
      let a2 = new Float32Array(w * h).fill(1);
      let b2 = new Float32Array(w * h);

      const plant = (cx: number, cy: number, radius: number) => {
        for (let dy = -radius; dy <= radius; dy++) {
          for (let dx = -radius; dx <= radius; dx++) {
            const x = cx + dx;
            const y = cy + dy;
            if (x < 1 || y < 1 || x >= w - 1 || y >= h - 1) continue;
            const j = y * w + x;
            if (mask[j]) b[j] = 1;
          }
        }
      };
      const plantAt = (i: number, radius = 1) => plant(i % w, Math.floor(i / w), radius);

      let generation = 0;
      let random = seededRandom(seed);
      // Semina diffusa: tanti semi piccoli in tutta la lettera, così la trama la copre in modo uniforme.
      const sow = () => {
        a.fill(1);
        b.fill(0);
        random = seededRandom(seed + generation * 7919);
        generation++;
        for (const i of inside) if (random() < SEED_DENSITY) plantAt(i);
      };
      sow();

      // Dove la trama non è arrivata, nuovi semi: nessuna parte della lettera resta scoperta.
      const refill = () => {
        const tries = Math.max(20, Math.round(inside.length / 400));
        for (let t = 0; t < tries; t++) {
          const i = inside[Math.floor(random() * inside.length)];
          const cx = i % w;
          const cy = Math.floor(i / w);
          let empty = true;
          for (let dy = -REFILL_RADIUS; dy <= REFILL_RADIUS && empty; dy++) {
            for (let dx = -REFILL_RADIUS; dx <= REFILL_RADIUS; dx++) {
              const x = cx + dx;
              const y = cy + dy;
              if (x >= 0 && y >= 0 && x < w && y < h && b[y * w + x] > 0.2) {
                empty = false;
                break;
              }
            }
          }
          if (empty) plantAt(i);
        }
      };

      const { f, k } = PATTERNS[pattern];
      // Vicini (8 direzioni) e pesi del laplaciano.
      const offsets = [-1, 1, -w, w, -w - 1, -w + 1, w - 1, w + 1];
      const weights = [0.2, 0.2, 0.2, 0.2, 0.05, 0.05, 0.05, 0.05];
      let stepCount = 0;
      // Si calcolano solo le celle dentro le lettere: le altre restano A=1, B=0.
      const step = () => {
        for (let n0 = 0; n0 < inside.length; n0++) {
          const i = inside[n0];
          const ai = a[i];
          const bi = b[i];
          // Bordi chiusi: un vicino fuori dalla lettera vale come la cella stessa,
          // così la sostanza non esce dalla forma e i tratti sottili non si svuotano.
          let lapA = 0;
          let lapB = 0;
          for (let n = 0; n < 8; n++) {
            const j = i + offsets[n];
            if (mask[j]) {
              lapA += weights[n] * (a[j] - ai);
              lapB += weights[n] * (b[j] - bi);
            }
          }
          const reaction = ai * bi * bi;
          // Valori limitati a [0, 1]: senza, i semi piccoli fanno divergere la reazione (NaN).
          a2[i] = Math.min(1, Math.max(0, ai + (lapA - reaction + f * (1 - ai))));
          b2[i] = Math.min(1, Math.max(0, bi + (0.5 * lapB + reaction - (k + f) * bi)));
        }
        [a, a2] = [a2, a];
        [b, b2] = [b2, b];
        if (++stepCount % REFILL_EVERY === 0) refill();
      };

      // Disegno: il campo B viene ingrandito con interpolazione e poi tagliato a soglia,
      // così la trama ha bordi morbidi ma netti.
      const color = computed.color.match(/\d+(\.\d+)?/g)?.map(Number) ?? [0, 0, 0];
      const small = document.createElement("canvas");
      small.width = w;
      small.height = h;
      const smallCtx = small.getContext("2d")!;
      const smallImage = smallCtx.createImageData(w, h);
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.round(w * cell * ratio);
      canvas.height = Math.round(h * cell * ratio);
      canvas.style.width = `${w * cell}px`;
      const ctx = canvas.getContext("2d", { willReadFrequently: true })!;

      const render = (threshold: number) => {
        const data = smallImage.data;
        // B oltre la soglia diventa pieno; la rampa stretta lascia un bordo morbido dopo l'ingrandimento.
        const gain = 255 / 0.08;
        for (let i = 0; i < w * h; i++) {
          data[i * 4 + 3] = Math.max(0, Math.min(255, (b[i] - threshold) * gain + 128));
        }
        smallCtx.putImageData(smallImage, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.imageSmoothingEnabled = true;
        ctx.drawImage(small, 0, 0, canvas.width, canvas.height);
        const out = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const px = out.data;
        for (let i = 0; i < px.length; i += 4) {
          const alpha = Math.max(0, Math.min(1, (px[i + 3] - 108) / 40));
          px[i] = color[0];
          px[i + 1] = color[1];
          px[i + 2] = color[2];
          px[i + 3] = alpha * 255;
        }
        ctx.putImageData(out, 0, 0);
      };

      // Ciclo di vita.
      let phase: Phase = "grow";
      let phaseStart = performance.now();
      let lastFrame = performance.now();
      let stepDebt = 0;
      let visible = true;
      const enter = (next: Phase) => {
        phase = next;
        phaseStart = performance.now();
        root.dataset.phase = next;
      };
      root.dataset.phase = phase;

      const loop = () => {
        frame = 0;
        if (cancelled || !visible) return;
        const now = performance.now();
        const elapsed = now - phaseStart;
        const dt = Math.min(100, now - lastFrame);
        lastFrame = now;
        let threshold = THRESHOLD;
        if (phase === "grow") {
          stepDebt = Math.min(MAX_STEPS_PER_FRAME, stepDebt + (dt / 1000) * STEPS_PER_SECOND);
          for (; stepDebt >= 1; stepDebt--) step();
          if (elapsed > growMs) enter(motion === "ciclo" ? "hold" : "still");
        } else if (phase === "hold") {
          if (elapsed > holdMs) enter("fade");
        } else if (phase === "fade") {
          // La soglia sale: ogni macchia si restringe verso il suo centro e sparisce,
          // come la crescita ripercorsa all'indietro.
          const t = Math.min(1, elapsed / fadeMs);
          threshold = THRESHOLD + (FADE_THRESHOLD - THRESHOLD) * t * t;
          if (t >= 1) {
            sow();
            enter("grow");
          }
        }
        render(threshold);
        if (phase !== "still") frame = requestAnimationFrame(loop);
      };
      const resume = () => {
        if (!frame && phase !== "still") {
          lastFrame = performance.now();
          frame = requestAnimationFrame(loop);
        }
      };
      const wake = () => {
        if (phase !== "grow") enter("grow");
        resume();
      };

      // Fuori dallo schermo la simulazione si ferma, per non consumare CPU.
      const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) resume();
      });
      observer.observe(root);
      cleanups.push(() => observer.disconnect());

      if (interactive) {
        // pointermove copre mouse e dito che trascina; pointerdown il tocco singolo.
        const onPointer = (event: PointerEvent) => {
          const rect = canvas.getBoundingClientRect();
          const x = Math.floor(((event.clientX - rect.left) / rect.width) * w);
          const y = Math.floor(((event.clientY - rect.top) / rect.height) * h);
          plant(x, y, event.type === "pointerdown" ? 3 : 1);
          wake();
        };
        canvas.addEventListener("pointermove", onPointer);
        canvas.addEventListener("pointerdown", onPointer);
        cleanups.push(() => {
          canvas.removeEventListener("pointermove", onPointer);
          canvas.removeEventListener("pointerdown", onPointer);
        });
      }

      if (reactToScroll) {
        // Ogni ~40 px di scorrimento un seme nuovo in un punto a caso delle lettere.
        const scatter = seededRandom(seed * 31 + 1);
        let lastY = window.scrollY;
        let budget = 0;
        const onScroll = () => {
          budget += Math.abs(window.scrollY - lastY) / 40;
          lastY = window.scrollY;
          if (!visible || budget < 1 || !inside.length) return;
          for (; budget >= 1; budget--) plantAt(inside[Math.floor(scatter() * inside.length)]);
          wake();
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        cleanups.push(() => window.removeEventListener("scroll", onScroll));
      }

      setRunning(true);
      loop();
    };

    start();
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      cleanups.forEach((fn) => fn());
      setRunning(false);
    };
  }, [text, fontWeight, fontSize, pattern, motion, seed, growMs, holdMs, fadeMs, interactive, reactToScroll, cellsPerEm, fontFamily]);

  return (
    <span
      ref={rootRef}
      className={["tr-living", running && "tr-living--running", className].filter(Boolean).join(" ")}
      style={{ fontFamily: fontFamily ?? "var(--font-display)", fontWeight, fontSize, ...style }}
    >
      <span className="tr-living__text">{text}</span>
      <canvas ref={canvasRef} className="tr-living__canvas" aria-hidden="true" />
    </span>
  );
}
