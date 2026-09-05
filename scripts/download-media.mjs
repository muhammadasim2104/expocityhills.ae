/**
 * Downloads Expo Hills imagery from expocitydubai.com (Contentful CDN).
 * Source page: https://www.expocitydubai.com/en/expo-living/expo-hills/
 */
import { mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const assetsDir = join(__dirname, "../public/assets");

const CTF = "https://images.ctfassets.net/r2cfrvo3y08m";

/** High-res variants from the official Expo Hills district page. */
const sources = {
  hills1: `${CTF}/2p0WEQIAyJVeCYPkanV8xi/158af94554257503449ab51a8cd5b2d0/Expo_Hills_1.png?w=1920`,
  hills2: `${CTF}/CkogtE0DhuPp1MwVHizVV/16796443578ff984d671d461daabf6bd/Expo_Hills_2.png?w=1920`,
  hills3: `${CTF}/4pWdLzoH0cGYO0gknQQveI/7be9bc346bce472b35cc5f3acf837245/Expo_Hills_3.png?w=1920`,
  hills4: `${CTF}/Ed05UxF4AHKyxmztyfwD9/f1789042f429472f2a571cec96a03208/Expo_Hills_4.png?w=1920`,
  unstudio: `${CTF}/ThTG25Et1xVcMRVp26klj/a674f106f9ec0e1f6033252cfacc3ac0/240821_ECD_01_DMP_Visual_Expo_Hills_UNStudio.jpg?w=1920`,
  districtsMap: `${CTF}/5uwFqX7TrsnxFZimlv1mBt/21ff447aa56b39d7869bd798eaab761e/Expo_City_Dubai_Districts___Real_Estate.jpg?w=2400`,
};

const assets = [
  { file: "hero-aerial.webp", url: sources.unstudio },
  { file: "building-1a.webp", url: sources.hills1 },
  { file: "building-1b.webp", url: sources.hills2 },
  { file: "lifestyle-pool.webp", url: sources.hills3 },
  { file: "lifestyle-green.webp", url: sources.hills4 },
  { file: "lifestyle-tracks.webp", url: sources.hills2 },
  { file: "lifestyle-eco.webp", url: sources.hills1 },
  { file: "gallery-1.webp", url: sources.hills1 },
  { file: "gallery-2.webp", url: sources.hills2 },
  { file: "gallery-3.webp", url: sources.hills3 },
  { file: "gallery-4.webp", url: sources.hills4 },
  { file: "interior-living.webp", url: sources.hills3 },
  { file: "interior-kitchen.webp", url: sources.hills4 },
  { file: "location-map.webp", url: sources.districtsMap },
  { file: "expo-hills-district.webp", url: sources.unstudio },
];

async function downloadWebp(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await sharp(buf).webp({ quality: 88 }).toFile(dest);
  console.log(`✓ ${dest.split("/").pop()}`);
}

async function createOgShare(heroPath) {
  const hero = await sharp(heroPath).resize(1200, 630, { fit: "cover" }).toBuffer();
  const overlay = Buffer.from(`
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="rgba(42,48,44,0.15)"/>
          <stop offset="100%" stop-color="rgba(42,48,44,0.72)"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#g)"/>
      <text x="60" y="480" font-family="Georgia, serif" font-size="52" fill="#f7f3ec" font-weight="300">Expo City Hills 1</text>
      <text x="60" y="540" font-family="Arial, sans-serif" font-size="22" fill="#f7f3ec" opacity="0.9">Expo Hills · Expo City Dubai</text>
    </svg>
  `);
  await sharp(hero)
    .composite([{ input: overlay, top: 0, left: 0 }])
    .webp({ quality: 88 })
    .toFile(join(assetsDir, "og-share.webp"));
  console.log("✓ og-share.webp");
}

async function main() {
  await mkdir(assetsDir, { recursive: true });
  for (const { file, url } of assets) {
    await downloadWebp(url, join(assetsDir, file));
  }
  const heroPath = join(assetsDir, "hero-aerial.webp");
  await createOgShare(heroPath);
  console.log("ℹ Favicons: run npm run brand-assets");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
