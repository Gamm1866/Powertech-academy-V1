import sharp from 'sharp';
import { readdirSync, mkdirSync, existsSync, statSync } from 'fs';
import { join, dirname, parse } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SRC_DIR = join(ROOT, 'public', 'images', 'hollywood');
const OUT_DIR = join(ROOT, 'public', 'images', 'hollywood', 'responsive');

// Targets chosen for Tailwind breakpoints: sm=640, md=768, lg=1024, xl=1280.
// Hero/feature images render at most ~50vw on lg+, so 1200 is our ceiling.
const WIDTHS = [480, 768, 1024, 1280];

// Priority list — LCP candidates get processed first.
const PRIORITY = ['lab-1.jpg', 'campus-hero.jpg', 'campus-1.jpg', 'campus-2.jpg'];

const FORMATS = [
  { ext: 'avif', opts: { quality: 50, effort: 4 } },
  { ext: 'webp', opts: { quality: 72, effort: 4 } },
  { ext: 'jpg', opts: { quality: 78, progressive: true, mozjpeg: true } },
];

function bytes(n) {
  return n < 1024 ? `${n}B` : n < 1024 * 1024 ? `${(n / 1024).toFixed(0)}KB` : `${(n / 1024 / 1024).toFixed(2)}MB`;
}

async function processImage(srcPath, baseName) {
  const src = sharp(srcPath, { failOn: 'none' });
  const meta = await src.metadata();
  const maxW = meta.width ?? 0;
  const originalSize = statSync(srcPath).size;

  let produced = 0;
  let totalOut = 0;

  for (const w of WIDTHS) {
    // Don't upscale
    if (w > maxW) continue;

    for (const { ext, opts } of FORMATS) {
      const outPath = join(OUT_DIR, `${baseName}-${w}.${ext}`);
      const pipeline = sharp(srcPath, { failOn: 'none' }).resize({ width: w, withoutEnlargement: true });
      let finalPipeline;
      if (ext === 'avif') finalPipeline = pipeline.avif(opts);
      else if (ext === 'webp') finalPipeline = pipeline.webp(opts);
      else finalPipeline = pipeline.jpeg(opts);

      const info = await finalPipeline.toFile(outPath);
      produced += 1;
      totalOut += info.size;
    }
  }

  console.log(`  ${baseName}: ${bytes(originalSize)} → ${produced} variants, avg ${bytes(totalOut / Math.max(produced, 1))}`);
}

async function main() {
  if (!existsSync(SRC_DIR)) {
    console.error(`Source dir missing: ${SRC_DIR}`);
    process.exit(1);
  }
  mkdirSync(OUT_DIR, { recursive: true });

  const all = readdirSync(SRC_DIR).filter(f => /\.(jpg|jpeg|png)$/i.test(f));
  const onlyArg = process.argv.slice(2).find(a => !a.startsWith('--'));
  const targets = onlyArg
    ? all.filter(f => f === onlyArg || parse(f).name === parse(onlyArg).name)
    : [...PRIORITY.filter(f => all.includes(f)), ...all.filter(f => !PRIORITY.includes(f))];

  console.log(`Processing ${targets.length} image(s) → ${OUT_DIR}`);
  for (const f of targets) {
    const srcPath = join(SRC_DIR, f);
    const baseName = parse(f).name;
    try {
      await processImage(srcPath, baseName);
    } catch (err) {
      console.error(`  FAIL ${f}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }
  console.log('Done.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
