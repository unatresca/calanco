/**
 * Immagini segnaposto per le storie. Le foto dei siti attuali sono di Roberta
 * Donatini e non vanno pubblicate nel repository.
 */
export function placeholder(label: string, width = 1200, height = 800): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fb3c9"/><stop offset="0.55" stop-color="#c9d6c2"/><stop offset="0.56" stop-color="#5d7a3a"/><stop offset="1" stop-color="#3f5626"/></linearGradient></defs>
<rect width="100%" height="100%" fill="url(#g)"/>
<path d="M0 ${height * 0.6} Q ${width * 0.25} ${height * 0.42} ${width * 0.5} ${height * 0.56} T ${width} ${height * 0.5} V ${height} H 0 Z" fill="#4c6a2e"/>
<text x="50%" y="88%" text-anchor="middle" font-family="sans-serif" font-size="${Math.round(height / 18)}" fill="#ffffff" opacity="0.85">${label}</text>
</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
