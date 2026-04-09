import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'public', 'og-image.png');

const W = 1200;
const H = 630;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <!-- Background gradient -->
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a0a0a"/>
      <stop offset="100%" stop-color="#050505"/>
    </linearGradient>

    <!-- Orange glow -->
    <radialGradient id="glow" cx="72%" cy="55%" r="45%">
      <stop offset="0%" stop-color="#FF4500" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#FF4500" stop-opacity="0"/>
    </radialGradient>

    <!-- Left accent glow -->
    <radialGradient id="glowLeft" cx="8%" cy="80%" r="30%">
      <stop offset="0%" stop-color="#FF4500" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="#FF4500" stop-opacity="0"/>
    </radialGradient>

    <!-- Clip path -->
    <clipPath id="clip">
      <rect width="${W}" height="${H}" rx="0"/>
    </clipPath>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect width="${W}" height="${H}" fill="url(#glowLeft)"/>

  <!-- Grid pattern -->
  <g opacity="0.04" stroke="#FF4500" stroke-width="0.8">
    ${Array.from({ length: 25 }, (_, i) => `<line x1="${i * 50}" y1="0" x2="${i * 50}" y2="${H}"/>`).join('\n    ')}
    ${Array.from({ length: 14 }, (_, i) => `<line x1="0" y1="${i * 50}" x2="${W}" y2="${i * 50}"/>`).join('\n    ')}
  </g>

  <!-- Top border accent line -->
  <rect x="0" y="0" width="${W}" height="3" fill="#FF4500" opacity="0.9"/>

  <!-- Left vertical accent -->
  <rect x="80" y="60" width="3" height="510" fill="#FF4500" opacity="0.25"/>

  <!-- Logo area — lightning bolt icon -->
  <rect x="110" y="90" width="52" height="52" rx="10" fill="#FF4500"/>
  <!-- Lightning bolt SVG path centered in the icon box (110+26=136 cx, 90+26=116 cy) -->
  <path d="M 144 99 L 131 117 L 139 117 L 128 137 L 148 113 L 139 113 Z"
        fill="white"/>

  <!-- Brand name -->
  <text x="178" y="120" font-family="'Inter', 'Helvetica Neue', Arial, sans-serif"
        font-size="28" font-weight="700" fill="#f3f4f6" letter-spacing="-0.5">PowerTech</text>
  <text x="178" y="148" font-family="'Inter', 'Helvetica Neue', Arial, sans-serif"
        font-size="28" font-weight="400" fill="#9ca3af" letter-spacing="0">Academy</text>

  <!-- Divider -->
  <line x1="110" y1="178" x2="580" y2="178" stroke="#27272a" stroke-width="1"/>

  <!-- Main headline -->
  <text x="110" y="258" font-family="'Inter', 'Helvetica Neue', Arial, sans-serif"
        font-size="64" font-weight="800" fill="#f3f4f6" letter-spacing="-2">Become a</text>
  <text x="110" y="338" font-family="'Inter', 'Helvetica Neue', Arial, sans-serif"
        font-size="64" font-weight="800" fill="#FF4500" letter-spacing="-2">Fire Alarm</text>
  <text x="110" y="418" font-family="'Inter', 'Helvetica Neue', Arial, sans-serif"
        font-size="64" font-weight="800" fill="#f3f4f6" letter-spacing="-2">Technician</text>

  <!-- Sub details row -->
  <!-- Dot 1 -->
  <circle cx="110" cy="475" r="4" fill="#FF4500"/>
  <text x="124" y="481" font-family="'Inter', 'Helvetica Neue', Arial, sans-serif"
        font-size="22" font-weight="500" fill="#9ca3af">2–3 Month Fast-Track</text>

  <!-- Dot 2 -->
  <circle cx="360" cy="475" r="4" fill="#FF4500"/>
  <text x="374" y="481" font-family="'Inter', 'Helvetica Neue', Arial, sans-serif"
        font-size="22" font-weight="500" fill="#9ca3af">NFPA 72</text>

  <!-- Dot 3 -->
  <circle cx="490" cy="475" r="4" fill="#FF4500"/>
  <text x="504" y="481" font-family="'Inter', 'Helvetica Neue', Arial, sans-serif"
        font-size="22" font-weight="500" fill="#9ca3af">Hollywood, FL</text>

  <!-- Location badge bottom -->
  <rect x="110" y="530" width="220" height="40" rx="20" fill="#FF4500" opacity="0.12"
        stroke="#FF4500" stroke-width="1" stroke-opacity="0.4"/>
  <text x="220" y="556" font-family="'Inter', 'Helvetica Neue', Arial, sans-serif"
        font-size="17" font-weight="700" fill="#FF4500" text-anchor="middle"
        letter-spacing="1">ADMISSIONS OPEN 2026</text>

  <!-- Right panel — decorative circuit/stats card -->
  <rect x="760" y="60" width="360" height="510" rx="20"
        fill="#121212" stroke="#27272a" stroke-width="1"/>

  <!-- Card inner glow -->
  <rect x="760" y="60" width="360" height="510" rx="20"
        fill="url(#glow)" opacity="0.4"/>

  <!-- Card top accent -->
  <rect x="760" y="60" width="360" height="3" rx="0" fill="#FF4500" opacity="0.6"/>

  <!-- Stat 1 — Duration -->
  <rect x="795" y="110" width="290" height="100" rx="12" fill="#0d0d0d" stroke="#1f1f1f" stroke-width="1"/>
  <text x="940" y="158" font-family="'Inter', 'Helvetica Neue', Arial, sans-serif"
        font-size="36" font-weight="800" fill="#f3f4f6" text-anchor="middle">2–3</text>
  <text x="940" y="183" font-family="'Inter', 'Helvetica Neue', Arial, sans-serif"
        font-size="14" font-weight="600" fill="#9ca3af" text-anchor="middle"
        letter-spacing="1.5">MONTHS</text>

  <!-- Stat 2 — Hours -->
  <rect x="795" y="228" width="290" height="100" rx="12" fill="#0d0d0d" stroke="#1f1f1f" stroke-width="1"/>
  <text x="940" y="276" font-family="'Inter', 'Helvetica Neue', Arial, sans-serif"
        font-size="36" font-weight="800" fill="#FF4500" text-anchor="middle">40h</text>
  <text x="940" y="301" font-family="'Inter', 'Helvetica Neue', Arial, sans-serif"
        font-size="14" font-weight="600" fill="#9ca3af" text-anchor="middle"
        letter-spacing="1.5">HANDS-ON TRAINING</text>

  <!-- Stat 3 — Earning potential -->
  <rect x="795" y="346" width="290" height="100" rx="12" fill="#0d0d0d" stroke="#1f1f1f" stroke-width="1"/>
  <text x="940" y="394" font-family="'Inter', 'Helvetica Neue', Arial, sans-serif"
        font-size="36" font-weight="800" fill="#f3f4f6" text-anchor="middle">$65k+</text>
  <text x="940" y="419" font-family="'Inter', 'Helvetica Neue', Arial, sans-serif"
        font-size="14" font-weight="600" fill="#9ca3af" text-anchor="middle"
        letter-spacing="1.5">EARNING POTENTIAL*</text>

  <!-- Card URL label -->
  <text x="940" y="530" font-family="'Inter', 'Helvetica Neue', Arial, sans-serif"
        font-size="16" font-weight="500" fill="#4b5563" text-anchor="middle"
        letter-spacing="0.5">powertech.academy</text>
</svg>`;

// Write SVG for reference
writeFileSync(join(__dirname, '..', 'public', 'og-image.svg'), svg);

// Convert SVG → PNG
await sharp(Buffer.from(svg))
  .png({ quality: 95, compressionLevel: 8 })
  .toFile(OUT);

console.log(`✅  og-image.png generated → ${OUT}`);
